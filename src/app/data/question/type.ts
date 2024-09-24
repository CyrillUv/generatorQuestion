export type NameDataType =
  'Структуры данных'|'JavaScript'

export interface IQuestion{
  question: string;
  response:string;
  active:boolean;

}

export interface IDataQuest{
  name: NameDataType;
  questions:Array<IQuestion>
  active:boolean;
}
