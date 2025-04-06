import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Company } from "@/types/company";

interface CompanyState {
  companies: Company[];
  loading: boolean;
  error: string | null;
  selectedCompanies: string[];
}

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
  selectedCompanies: [],
};

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const response = await fetch("https://localhost:7152/api/companies");
    if (!response.ok) {
      throw new Error("Không thể tải danh sách công ty");
    }
    const data = await response.json();
    return data.data;
  }
);

export const addCompany = createAsyncThunk(
  "companies/addCompany",
  async (company: Partial<Company>) => {
    const response = await fetch("https://localhost:7152/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Không thể thêm công ty");
    }

    const data = await response.json();
    return data.data;
  }
);

export const updateCompany = createAsyncThunk(
  "companies/updateCompany",
  async (company: Partial<Company> & { id: string }) => {
    const response = await fetch(
      `https://localhost:7152/api/companies/${company.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Không thể cập nhật công ty");
    }

    const data = await response.json();
    return data.data;
  }
);

export const deleteCompanies = createAsyncThunk(
  "companies/deleteCompanies",
  async (companyIds: string[]) => {
    const response = await fetch("https://localhost:7152/api/companies/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyIds),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Không thể xóa công ty");
    }

    const data = await response.json();
    return data;
  }
);

const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setSelectedCompanies: (state, action) => {
      state.selectedCompanies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch companies
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Có lỗi xảy ra";
      })
      // Add company
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      // Update company
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.companies.findIndex(
          (company) => company.id === action.payload.id
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      })
      // Delete companies
      .addCase(deleteCompanies.fulfilled, (state, action) => {
        const deletedIds = action.payload.result.deletedIds;
        state.companies = state.companies.filter(
          (company) => !deletedIds.includes(company.id)
        );
        state.selectedCompanies = state.selectedCompanies.filter(
          (id) => !deletedIds.includes(id)
        );
      });
  },
});

export const { setSelectedCompanies } = companySlice.actions;
export default companySlice.reducer; 