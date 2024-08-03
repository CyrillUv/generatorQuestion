export type NameDataType =
  'Структуры данных'|'21312'

export interface IQuestion{
  question: string;
  response:string
}

export interface IData{
  name: NameDataType;
  questions:Array<IQuestion>
}
