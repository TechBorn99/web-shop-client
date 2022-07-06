export interface ProductFiltersFormModel {
  queryString: string;
  priceTo: number;
  priceFrom: number;
  createdAtFrom: string;
  createdAtTo: string;
}

export interface ProductSortersFormModel {
  ascending: boolean;
  descending: boolean;
  attribute: 'name' | 'price' | 'dateOfCreation';
}

export interface ProductFormModel {
  name: string;
  price: number;
  isAvailable: boolean;
  description: string;
}
