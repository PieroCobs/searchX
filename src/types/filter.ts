type FilterCriteria = 'name' | 'email' | 'address' | 'age';

export default FilterCriteria;

export interface FilterItem {
  label: string;
  value: FilterCriteria;
}

export const filters: FilterItem[] = [
  {label: 'name', value: 'name'},
  {label: 'age', value: 'age'},
  {label: 'email', value: 'email'},
  {label: 'address', value: 'address'},
];
