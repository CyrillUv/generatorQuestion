export type NameDataType = 'Структуры данных' | 'JavaScript' | 'all';

export interface IQuestion {
  question: string;
  response: string;
  active: boolean;
}

export interface IDataQuest {
  name: NameDataType;
  questions: IQuestion[];
  active: boolean;
}
