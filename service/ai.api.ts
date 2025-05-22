import instance from '@/service/axios';

interface IData {
  routine: string;
  option: {
    routineComposition: boolean;
    exerciseArrangement: boolean;
    exerciseStrength: boolean;
  };
}

const createFeedBack = async (data: IData) => {
  const response = await instance.post('/ai', { data });
  return response.data;
};

export { createFeedBack };
