export interface IDataMenu {
  dropdownActive: boolean;
  options: IOptions[];
}

interface IOptions {
  number: number;
}

export const dataMenu: IDataMenu[] = [
  {
    dropdownActive: false,
    options: [{ number: 10 }, { number: 20 }, { number: 30 }],
  },
  {
    dropdownActive: false,
    options: [{ number: 1 }, { number: 2 }, { number: 3 }],
  },
];
