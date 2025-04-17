import { useState, useEffect } from 'react';
import { Company } from '@/types/company';

const BASE_URL = 'https://localhost:7152';

export const useCompanyDetail = (id: string) => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/Company/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company detail');
        }
        const data = await response.json();
        if (data.result) {
          setCompany(data.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCompanyDetail();
    }
  }, [id]);

  return { company, loading, error };
}; 
 
 
 
 
 