import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUsers: string[];
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  selectedUsers: [],
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi tải danh sách người dùng");
    }
    return data.data;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: Omit<User, 'id'>) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi thêm người dùng");
    }
    return data.data;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData: User) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi cập nhật người dùng");
    }
    return data.data;
  }
);

export const deleteUsers = createAsyncThunk(
  'users/deleteUsers',
  async (userIds: string[]) => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://localhost:7152/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userIds }),
    });
    const data = await response.json();
    if (!data.result) {
      throw new Error(data.message || "Có lỗi xảy ra khi xóa người dùng");
    }
    return { userIds, result: data.data };
  }
);

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async ({ id, newPassword }: { id: string; newPassword: string }) => {
    const response = await fetch(`https://localhost:7152/api/users/${id}/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    }

    return await response.json();
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUsers: (state, action: PayloadAction<string[]>) => {
      state.selectedUsers = action.payload;
    },
    clearSelectedUsers: (state) => {
      state.selectedUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Có lỗi xảy ra";
      })
      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Delete users
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.users = state.users.filter(user => !action.payload.userIds.includes(user.id));
        state.selectedUsers = state.selectedUsers.filter(id => !action.payload.userIds.includes(id));
      });
  },
});

export const { setSelectedUsers, clearSelectedUsers } = userSlice.actions;
export default userSlice.reducer; 