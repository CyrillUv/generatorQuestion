import { IDataQuestion } from '../question';

export const dataOOP: IDataQuestion = {
  name: 'Обьектно-ориентированное программирование',
  questions: [
    {
      level: 'Junior',
      title: 'Что такое ООП?',
      response:
        ' Методология программирования, основанная на представлении программы ' +
        ' в виде совокупности взаимодействующих обьектов\n' +
        ' каждый из который является экземпляром определенного класса,  а классы образуют иерархию наследования',
      active: false,
    },
    {
      level: 'Junior',
      title: ' Принципы ООП?',
      response:
        '  Инкапсуляция (сокрытие ) - принцип ооп который гласит что мы можем изолировать доступ к внутренним членам объекта\n' +
        '\n' +
        '    у нас в классе есть приватный поля, которые мы не можем изменить извне\n' +
        '\n' +
        '    Наследование - принцип ооп, он предоставляет доступ к внутренним членам, методам путем наследования  (extends)\n' +
        '\n' +
        '  Полиморфизм - способность обьекта использовать методы производного класса который не существует на момент создания базового\n' +
        '  Условно мы наследовались от базового и переопределили его метод',
      active: false,
    },
    {
      level: 'Junior',
      title: ' Расшифруй аббревиатуру SOLID',
      response:
        ' S(single responsibility) - принцип единственной ответственности - для класса должно быть одно назначение.\n' +
        '  // O(open/close) - (принцип открытости/закрытости) - открыт для расширения, закрыт для модификации\n' +
        '  // L(liskov) - принцип подстановки Лисков - поведение наследующих классов не должно противоречить поведению, заданному базовым классом\n' +
        '  // I(separation interface) - разделение интерфейсов - много интерфейсов специально преджназначенных для клиентов лучше чем один интерфейс\n' +
        '  // общего назначения  - тогда некототорые поля нужно делать опциональными чтобы подходили для многих\n' +
        '  // D(dependency invercion) -\n' +
        '  //\n' +
        '  //   Модули верхних уровней не должны зависеть от модулей нижних, зависимость от абстракция. Абстракция не должна зависеть от деталей, детали должны зависеть от абстракций',
      active: false,
    },
    {
      level: 'Junior',
      title: 'Что такое абстрактный класс',
      response:
        ' Базовый класс, который нужен не для создания экземпляров,а как образец или шаблон.Может содержать абстрактные методы и свойства',
      active: false,
    },
    {
      level: 'Middle',
      title: ' Отличие абстрактного класса и интерфейса',
      response:
        ' Интерфейс описывает шаблон описание поведения, у него нет состояния\n' +
        '            абстрактный класс имеет какое то состояние, у него могут быть приватные методы и свойства',
      active: false,
    },
    {
      level: 'Junior',
        title: ' Статические методы и свойства',
      response:
        ' Кроме обычных полей и методов класс может иметь статические. Статические поля и методы относятся не к' +
        ' отдельным объектам, а в целом к классу. И для обащения к статическим полям и методам применяется имя класса.',
      active: false,
    },
    {
      level: 'Senior',
      title: ' Плюсы и минусы наследования',
      response:
        '  - ключевое слово (extends)\n' +
        '  - убираем дублирование\n' +
        '  - Расширяемость\n' +
        '  - Абстракция внесение общего в один класс\n' +
        '  - выстраиваемая иерархия наследования\n' +
        '  - полиморфизм\n' +
        '  -если что-то поменяется в родительском поменяется и в дочерних\n' +
        '  -ромбовидное наследование',
      active: false,
    },
    {
      level: 'Senior',
      title:
        ' Как понимается  композиция в объектно-ориентированном программировании?',
      response:
        ' Композиция — это процесс создания сложных функций или объектов путем комбинирования' +
        ' и объединения более простых функций или объектов. То есть, вместо того чтобы создавать' +
        ' новую функцию или объект с нуля, мы можем использовать уже существующие функции или объекты' +
        ' и комбинировать их в более сложные структуры.',
      active: false,
    },
    {
      level: 'Senior',
      title:
        ' Как понимается  делегирование в объектно-ориентированном программировании?',
      response:
        ' Делегирование - Агрегация(Делегирование) подразумевает связь, в которой потомок может' +
        ' существовать независимо от родителя мы прописываем какой нам нужен интерфейс от этого обьекта и забираем точечно',
      active: false,
    },
  ],
  active: false,
};
