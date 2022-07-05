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
