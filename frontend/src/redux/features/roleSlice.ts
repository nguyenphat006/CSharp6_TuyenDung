import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Role } from '@/types/role';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
  selectedRoles: string[];
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
  selectedRoles: [],
};

// Async thunks
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi tải danh sách vai trò");
    }
    return data.data;
  }
);

export const addRole = createAsyncThunk(
  'roles/addRole',
  async (roleData: Omit<Role, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy' | 'deletedBy' | 'isDeleted'>) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roleData),
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi thêm vai trò");
    }
    return data.data;
  }
);

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (data: { id: string; name: string; isActive: boolean }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No access token found');
      }

      console.log('Sending update request with data:', data);

      const response = await fetch(`https://localhost:7152/api/Roles/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          isActive: data.isActive
        }),
      });

      console.log('Response status:', response.status);
      
      const result = await response.json();
      console.log('Response data:', result);

      if (!result.result) {
        return rejectWithValue(result.message || 'Có lỗi xảy ra khi cập nhật vai trò');
      }

      return result.data;
    } catch (error: any) {
      console.error('Update role error:', error);
      return rejectWithValue(error.message || 'Có lỗi xảy ra khi cập nhật vai trò');
    }
  }
);

export const deleteRoles = createAsyncThunk(
  'roles/deleteRoles',
  async (roleIds: string[]) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/roles", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ roleIds }),
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi xóa vai trò");
    }
    return { roleIds, result: data.data };
  }
);

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setSelectedRoles: (state, action: PayloadAction<string[]>) => {
      state.selectedRoles = action.payload;
    },
    clearSelectedRoles: (state) => {
      state.selectedRoles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action: PayloadAction<Role[]>) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Có lỗi xảy ra";
      })
      // Add role
      .addCase(addRole.fulfilled, (state, action: PayloadAction<Role>) => {
        state.roles.push(action.payload);
      })
      // Update role
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, action: PayloadAction<Role>) => {
        state.loading = false;
        const index = state.roles.findIndex(role => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
        console.log('Updated state:', {
          roles: state.roles,
          updatedRole: action.payload,
          index
        });
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Có lỗi xảy ra khi cập nhật vai trò";
      })
      // Delete roles
      .addCase(deleteRoles.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role: Role) => !action.payload.roleIds.includes(role.id));
        state.selectedRoles = state.selectedRoles.filter(id => !action.payload.roleIds.includes(id));
      });
  },
});

export const { setSelectedRoles, clearSelectedRoles } = roleSlice.actions;
export default roleSlice.reducer; 