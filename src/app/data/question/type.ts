export type NameDataType =
  | 'Структуры данных'
  | 'JavaScript'
  | 'Обьектно-ориентированное программирование'
  | 'Тестирование'
  | 'Angular'
  | 'TypeScript'
  | 'Паттерны проектирования'
  | 'Сетевые протоколы'
  | 'Алгоритмы'
  | 'Linux'
  | 'rxjs'
  | 'Git'
  | 'HTML'
  | 'CSS'
  | 'all';

export interface IQuestion {
  title: string;
  response: string;
  active: boolean;
  level: 'Junior' | 'Middle' | 'Senior';
}
export interface IQuestionDB extends IQuestion {
  id?: string;
}
export interface IDataQuestion {
  name: NameDataType;
  questions: IQuestion[];
  active: boolean;
}
