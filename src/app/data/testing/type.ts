export interface IAnswer {
  title: string;
  correct: boolean;
}

export interface IDataTest {
  id: number;
  name: string;
  answers: IAnswer[];
}
