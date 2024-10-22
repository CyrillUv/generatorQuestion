export type NameDataType = 'Структуры данных' | 'JavaScript' | 'all';

export interface IQuestion {
  question: string;
  response: string;
  active: boolean;
}

export interface IDataQuestion {
  name: NameDataType;
  questions: IQuestion[];
  active: boolean;
}
