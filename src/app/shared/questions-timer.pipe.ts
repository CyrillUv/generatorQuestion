import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Timer',
  standalone: true,
})
//Пайп для конвертирования времени в строку стиля часов
export class QuestionsTimerPipe implements PipeTransform {
  transform(count: number): string {
    //Минуты
    let min = '00';
    //Секунды
    let sec = '00';
    //чтобы не было лишнего 0
    if (count < 10) {
      sec = '0' + count;
    }
    //чтобы был второй 0
    if (count <= 60 && count >= 10) {
      sec = count + '';
    }
    //конвертирование секунд в минуты и продолжение работы секунд
    if (count >= 60) {
      min = '0' + Math.floor(count / 60);
      sec = +count - +min * 60 + '';
    }
    //добавление нуля к минутам
    if (+sec < 10) {
      sec = '0' + (+count - +min * 60);
    }
    //округление минут
    if (+min >= 10) {
      min = '' + Math.floor(count / 60);
    }
    //получение таймера
    return `${min}:${sec} `;
  }
}
