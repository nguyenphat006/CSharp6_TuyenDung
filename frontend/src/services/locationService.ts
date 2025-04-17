import axios from 'axios';

export interface Province {
  name: string;
  code: number;
}

const cleanProvinceName = (name: string): string => {
  return name
    .replace(/Tỉnh /g, '')
    .replace(/Thành phố /g, '')
    .replace(/Thành Phố /g, '');
};

export const getProvinces = async (): Promise<Province[]> => {
  try {
    const response = await axios.get('https://provinces.open-api.vn/api/');
    return response.data.map((province: any) => ({
      name: cleanProvinceName(province.name),
      code: province.code
    }));
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
}; 