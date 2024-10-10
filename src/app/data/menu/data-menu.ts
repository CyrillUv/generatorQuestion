export interface IDataMenu {
  options: IOptions[];
}

interface IOptions {
  number: number;
}

export const dataMenu: IDataMenu[] = [
  {
    options: [{ number: 10 }, { number: 20 }, { number: 30 }],
  },
  {
    options: [{ number: 1 }, { number: 2 }, { number: 3 }],
  },
];
