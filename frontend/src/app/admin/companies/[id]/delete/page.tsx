import { axiosClient } from '@/lib/axios-client';

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

const handleDelete = async () => {
  try {
    setLoading(true);
    await axiosClient.delete(`/api/Company/${id}`);
    toast.success('Company deleted successfully');
    router.push('/admin/companies');
  } catch (error) {
    console.error('Error deleting company:', error);
    toast.error('Failed to delete company');
  } finally {
    setLoading(false);
  }
}; 