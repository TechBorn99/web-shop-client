export interface BaseDTO {
  uuid: string;
}

export interface BaseDTOWithTimestamps extends BaseDTO {
  createdAt: string;
  updatedAt?: string;
}

export interface PageableDTO {
  pageNumber: number;
  pageSize: number;
  offset: number;
}

export interface Paged<T> {
  content: T[];
  size: number;
  totalElements: number;
  totalPages: number;
  pageable: PageableDTO;
  numberOfElements: number;
}
