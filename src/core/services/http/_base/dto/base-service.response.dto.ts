export interface BaseDTO {
  uuid: string;
}

export interface BaseDTOWithTimestamps extends BaseDTO {
  createdAt: string;
  updatedAt?: string;
}

export interface PageableDTO {
  page?: number;
  pageSize?: number;
  sort?: string;
}

export interface Paged<T> {
  content: T[];
  size: number;
  totalElements: number;
  totalPages: number;
}
