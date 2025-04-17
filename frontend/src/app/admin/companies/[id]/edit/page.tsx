import { axiosClient } from '@/lib/axios-client';

// ... existing code ...

const fetchCompany = async () => {
  try {
    setLoading(true);
    const response = await axiosClient.get(`/api/Company/${id}`);
    setCompany(response.data);
  } catch (error) {
    console.error('Error fetching company:', error);
    toast.error('Failed to fetch company data');
  } finally {
    setLoading(false);
  }
};

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);
    await axiosClient.put(`/api/Company/${id}`, company);
    toast.success('Company updated successfully');
    router.push('/admin/companies');
  } catch (error) {
    console.error('Error updating company:', error);
    toast.error('Failed to update company');
  } finally {
    setLoading(false);
  }
};

// ... existing code ... 