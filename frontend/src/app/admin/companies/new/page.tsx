import { axiosClient } from '@/lib/axios-client';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setLoading(true);
    await axiosClient.post('/api/Company', company);
    toast.success('Company created successfully');
    router.push('/admin/companies');
  } catch (error) {
    console.error('Error creating company:', error);
    toast.error('Failed to create company');
  } finally {
    setLoading(false);
  }
}; 