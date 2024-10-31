export interface IDataMenu {
  options: IOptions[];
}

interface IOptions {
  option: string;
}

export const dataMenu: IDataMenu[] = [
  {
    options: [
      { option: '10 вопросов' },
      { option: '20 вопросов' },
      { option: '30 вопросов' },
    ],
  },
  {
    options: [{ option: '1 блок' }, { option: '2 блок' }, { option: '3 блок' }],
  },
  {
    options: [{ option: 'Junior' }, { option: 'Middle' }, { option: 'Senior' }],
  },
];
