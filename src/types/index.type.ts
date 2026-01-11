// Generic API Response
export type TApiResponse<T = null> = {
  status: number;
  message: string;
  data: T;
};
