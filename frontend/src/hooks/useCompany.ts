import { useState, useEffect } from 'react';
import { Company } from '@/types/company';

const BASE_URL = 'https://localhost:7152';

export const useCompany = () => {
  const [topCompanies, setTopCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopCompanies = async () => {
      try {
        console.log('Fetching companies...');
        const response = await fetch(`${BASE_URL}/api/Company/top-6-latest`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch top companies');
        }
        const data = await response.json();
        console.log('API Response:', data);
        if (data.result) {
          console.log('Setting companies:', data.data);
          setTopCompanies(data.data);
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopCompanies();
  }, []);

  return { topCompanies, loading, error };
}; 
 
 
 
 
 