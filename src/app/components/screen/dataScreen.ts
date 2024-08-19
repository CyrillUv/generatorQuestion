
export interface IScreen {
  title: string;
  url: string;
  url2?: string;
  description: string;
  description2?: string;
}


export const dataScreen:Array<IScreen> = [
  {title:'Новая отписка через takeUntilDestroy',url:'takeUntilDestroy.png',url2:'takeUntilDestroy2.png',
    description:'Базовый класс от которого нужно наследоваться,внутри есть отписка на destroy',
    description2:'Так мы наследуемся и весь Observable прокидываем в метод до subscribe'},
  {title:'Новая отписка через takeUntilDestroy111111',url:'takeUntilDestroy.png',url2:'takeUntilDestroy2.png',
    description:'Базовый класс от которого нужно наследоваться,внутри есть отписка на destroy',
    description2:'Так мы наследуемся и весь Observable прокидываем в метод до subscribe'},
  {title:'Новая отписка через takeUntilDestroy22222',url:'takeUntilDestroy.png',url2:'takeUntilDestroy2.png',
    description:'Базовый класс от которого нужно наследоваться,внутри есть отписка на destroy',
    description2:'Так мы наследуемся и весь Observable прокидываем в метод до subscribe'}
]
