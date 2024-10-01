export interface Template {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  content: string;
}
