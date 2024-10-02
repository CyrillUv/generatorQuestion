export interface IScreen {
  title: string;
  url: string;
  url2?: string;
  description: string;
  description2?: string;
}

export const dataScreen: IScreen[] = [
  {
    title: 'Новая отписка через takeUntilDestroy',
    url: 'takeUntilDestroy.png',
    url2: 'takeUntilDestroy2.png',
    description:
      'Базовый класс от которого нужно наследоваться,внутри есть отписка на destroy',
    description2:
      'Так мы наследуемся и весь Observable прокидываем в метод до subscribe',
  },
  {
    title: 'Отписка через takeUntil',
    url: 'takeUntil.png',
    url2: 'takeUntil2.png',
    description:
      'Базовый класс от которого нужно наследоваться,внутри есть отписка на destroy',
    description2:
      'Так мы наследуемся и весь Observable прокидываем в метод до subscribe',
  },
  {
    title: 'Отписка через отдельный класс',
    url: 'subscribers.png',
    url2: 'subscribers2.png',
    description:
      'Базовый класс от которого нужно наследоваться,внутри есть отписка на destroy',
    description2:
      'Так мы наследуемся и весь Observable прокидываем в метод до subscribe',
  },
  {
    title: 'Демонстрация Pipe',
    url: 'pipe.png',
    description:
      'Он используется как функция в шаблонах и пишется через символ |',
    description2:
      'Например:' +
      'переменная | pipe : аргументы . Также к одному значению допустимо одновременное применение нескольких фильтров.\n' +
      '\n' +
      '\n' +
      '{{someString | pipe1 | pipe2 | pipe3 | ... }}',
  },
  {
    title: 'Демонстрация метода combineLatest',
    url: 'combineLatest.png',
    description:
      'Происходит подписка сразу на несколько контролов,при подписке вытягивает значение всех поочередно',
  },
  {
    title: 'Популярные типы утилит в TS',
    url: 'utilitsTypeTS.png',
    description: 'Omit,Pick,Required,Particle',
  },
  {
    title: 'Манипуляции с путем в роутинге',
    url: 'routeManipulation.png',
    description:
      'Любой маршрут может лениво загружать свой маршрутизированный автономный компонент, используя loadComponent:',
    description2:
      'С помощью обьекта data,можно вытаскивать какие-то данные.Метод resolve,извлекает данные, необходимые для активации запрошенного маршрута.',
  },
  {
    title: `Работа с Guard'ами`,
    url: 'canActivate.png',
    description:
      'Если все охранники возвращаются true, навигация продолжается. ' +
      'Если любой охранник возвращается false, навигация отменяется. Если любой охранник возвращается UrlTree,' +
      ' текущая навигация отменяется и начинается новая навигация к UrlTree возвращенному от охранника.',
  },
  {
    title: 'Жизненный цикл компонента',
    url: 'lifeCycle.png',
    description: 'Изображения порядка работы жизненного цикла компонента',
    url2: 'lifeCycle2.png',
  },
];