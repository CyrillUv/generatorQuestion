export interface IDataMenu {
  options: IOptions[];
}

export interface IOptions {
  title: string;
  value?: number;
}

export const dataMenu: IDataMenu[] = [
  {
    options: [
      { title: '10 вопросов', value: 10 },
      { title: '20 вопросов', value: 20 },
      { title: '30 вопросов', value: 30 },
    ],
  },
  {
    options: [
      { title: '1 блок', value: 1 },
      { title: '2 блок', value: 2 },
      { title: '3 блок', value: 3 },
    ],
  },
  {
    options: [{ title: 'Junior' }, { title: 'Middle' }, { title: 'Senior' }],
  },
  {
    options: [
      { title: 'Структуры данных' },
      { title: 'JavaScript' },
      { title: 'Обьектно-ориентированное программирование' },
      { title: 'Тестирование' },
      { title: 'Angular' },
      { title: 'TypeScript' },
      { title: 'Паттерны проектирования' },
      { title: 'Сетевые протоколы' },
      { title: 'Алгоритмы' },
      { title: 'Linux' },
      { title: 'rxjs' },
      { title: 'Git' },
      { title: 'HTML' },
      { title: 'CSS' },
    ],
  },
];
const dataMap = new Map();

dataMenu.forEach((item, index) => {
  dataMap.set(index, item.options);
});
