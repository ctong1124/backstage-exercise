export type Response = {
  datetime: Date;
  number: number;
  value: number;
  occurrences: number;
  last_datetime: Date;
};

export type LogId = string;

export type Logs = {
  [key: LogId]: Date;
};

export type Db = {
  [key: number]: {
    value: number;
    logsForN: LogId[];
  };
};
