import instance from '@/service/axios';

interface IData {
  routine: string;
  option: {
    sequence: boolean;
    strength: boolean;
    exercise: boolean;
  };
}

const createFeedBack = async (data: IData) => {
  const response = await instance.post('/ai', { data });
  return response.data;
};

export { createFeedBack };
