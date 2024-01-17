export interface PageRequestDTO {
  offset: number;
  pageNumber: number;
  pageSize: number;
}

export interface PriceRangeRequestDTO {
  priceFrom: number;
  priceTo: number;
}

export interface DateRangeRequestDTO {
  createdAtFrom: string;
  createdAtTo: string;
}

export interface FilterRequestDTO {
  containsChars: string;
  priceRange: PriceRangeRequestDTO;
  dateRange: DateRangeRequestDTO;
}

export interface SortersRequestDTO {
  attribute: 'dateOfCreation' | 'price' | 'name';
  ascending: boolean;
}

export interface GetProductPageWithFiltersRequestDTO {
  pageable: PageRequestDTO;
  filters?: FilterRequestDTO;
  sorters?: SortersRequestDTO;
}

export interface CreateProductRequestDTO {
  name: string;
  description: string;
  isAvailable: boolean;
  price: number;
}

export interface UpdateProductRequestDTO {
  uuid?: string;
  name: string;
  description: string;
  isAvailable: boolean;
  price: number;
}
