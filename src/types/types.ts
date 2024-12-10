export type Log = {
  datetime: Date;
  number: number;
} & DbValue;

type DbValue = {
  value: number;
  occurrences: number;
  last_datetime: Date | 'N/A';
}

export type Db = {
  [key: number]: DbValue;
}