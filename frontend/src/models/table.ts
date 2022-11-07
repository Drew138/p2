export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  isFile: boolean;
  disabled: boolean;
};
