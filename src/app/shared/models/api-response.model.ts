export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: any;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: { [key: string]: string[] };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
} 