export type Log = {
  datetime: Date;
  number: number;
} & DbValue;

type DbValue = {
  value: number;
  occurrences: number;
  last_datetime: Date;
}

export type Db = {
  [key: number]: DbValue;
}