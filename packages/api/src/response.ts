export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
}