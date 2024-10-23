export type NameDataType =
  | 'Структуры данных'
  | 'JavaScript'
  | 'Обьектно-оринетированное программирование'
  | 'Тестирование'
  | 'Angular'
  | 'TypeScript'
  | 'Паттерны проектирования'
  | 'Сетевые протоколы'
  | 'Алгоритмы'
  | 'Linux'
  | 'rxjs'
  | 'all';

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
