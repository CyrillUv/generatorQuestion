interface IAnswer{
  answer: string;
  correct: boolean;
}
export interface IDataTest {
  id:number
  question: string;
  answers: Array<IAnswer>;
  active:boolean|null
}
