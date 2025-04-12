import { useState, useEffect } from 'react';
import { Job } from '@/types/job';

const BASE_URL = 'https://localhost:7152';

export const useTopJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopJobs = async () => {
      try {
        console.log('Fetching jobs...');
        const response = await fetch(`${BASE_URL}/api/Job/top-6-latest`);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch top jobs');
        }
        const data = await response.json();
        console.log('API Response:', data);
        if (data.result) {
          console.log('Setting jobs:', data.data);
          setJobs(data.data);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopJobs();
  }, []);

  return { jobs, loading, error };
}; 