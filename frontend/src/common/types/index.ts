export type PageData<TData> = {
  data: TData;
  page: number;
  pageSize: number;
  total: number;
};

export type SortOrder = 'asc' | 'desc';
