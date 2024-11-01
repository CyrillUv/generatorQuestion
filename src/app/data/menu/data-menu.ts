export interface IDataMenu {
  options: IOptions[];
}

export interface IOptions {
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
  {
    options: [
      { option: 'Структуры данных' },
      { option: 'JavaScript' },
      { option: 'Обьектно-ориентированное программирование' },
      { option: 'Тестирование' },
      { option: 'Angular' },
      { option: 'TypeScript' },
      { option: 'Паттерны проектирования' },
      { option: 'Сетевые протоколы' },
      { option: 'Алгоритмы' },
      { option: 'Linux' },
      { option: 'rxjs' },
      { option: 'Git' },
      { option: 'HTML' },
      { option: 'CSS' },
    ],
  },
];
