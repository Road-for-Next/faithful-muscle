import instance from '@/service/axios';

const createFeedBack = async (data: string) => {
  const response = await instance.post('/ai', { data });
  return response.data;
};

export { createFeedBack };
