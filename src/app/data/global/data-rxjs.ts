import { IDataQuestion } from '../question/type';

export const dataRxjs: IDataQuestion = {
  name: 'rxjs',
  questions: [
    {
      question: 'Observable и его отличие от промиса ',
      response:
        'Объекты RxJS Observable создаются либо с использованием операторов создания (of, from, fromEvent), либо через new Observable.' +
        'Каждый Observable может отправлять своим "потребителям" уведомления вызовом одного из трех методов:\n' +
        '\n' +
        'next() — отправка данных, количество вызовов не ограничено;\n' +
        'error() — генерация ошибки, параметром указываются данные любого формата (строка, объект, исключение) о причине ее возникновения;\n' +
        'complete() — завершение исполнения Observable, не принимает никаких параметров и не передает никакого значения.\n' +
        'Но исполнение RxJS Observable начнется только после вызова у него метода subscribe(), который принимает функцию с передаваемыми данными в качестве аргумента.' +
        'Отличие от промиса можно несколько раз подписаться к стриму, отписаться,\n' +
        ' а промис отработает один раз и все',
      active: false,
    },
    {
      question: 'Subject и его разновидности',
      response:
        'Разновидность обьектов Observable - стрим где не нужно начальное значение и возвращает последнее\n' +
        '        BehaviorSubject - есть начальное и возвращает последнее\n' +
        '         ReplaceSubject - покажет все значения которые мы ему записывали',
      active: false,
    },
    {
      question: 'Операторы forkJoin,combineLatest,take',
      response:
        'Оператор forkJoin принимает любой количество Observables, ожидает их завершения, а затем возвращает массив значений ' +
        'завешенных Observables. Оператор combineLatest() - это еще один полезный оператор RxJS, который позволяет ' +
        'объединить последние значения, отправленные несколькими потоками observable ' +
        ', в один поток.Take возвращает Observable, который выдает только первые count значения, выданные исходным Observable. ' +
        'Если источник выдает меньше count значений, то' +
        ' выдаются все его значения. После этого он завершается, независимо от того, завершается ли источник.',
      active: false,
    },
    {
      question: 'Операторы skip, tap, map, filter,',
      response:
        'Skip Пропускает значения до тех пор, пока отправленные уведомления не будут равны или меньше указанного количества пропусков. ' +
        'Вызывает ошибку, если количество пропусков равно или больше фактического количества эмиттов, и источник выдает ошибку.' +
        'Tap Используется, когда вы хотите повлиять на внешнее состояние с помощью уведомления, не изменяя само уведомление.' +
        'Map Как и Array.prototype.map() , он пропускает каждое исходное значение через функцию преобразования для получения соответствующих выходных значений.' +
        'Filter Как и Array.prototype.filter() , он выдает значение из источника только в том случае, если оно проходит функцию критерия.',
      active: false,
    },
    {
      question: 'Операторы takeuntil, switchmap, mergemap, cancatmap',
      response:
        ' TakeUntil Позволяет значениям передаваться до тех пор, пока второй Observable, не выдаст значение. Затем он завершается.' +
        'Switchmap Сопоставляет каждое значение с наблюдаемым, затем выравнивает все эти внутренние наблюдаемые с помощью switchAll(Сглаживает наблюдаемое из наблюдаемых.). ' +
        'MergeMap Сопоставляет каждое значение с наблюдаемым, затем выравнивает все эти внутренние наблюдаемые с помощью mergeAll(Сглаживает наблюдаемое из наблюдаемых.). ' +
        'concatMap Сопоставляет каждое значение с наблюдаемым, затем выравнивает все эти внутренние наблюдаемые с помощью concatAll(Выравнивает наблюдаемый из наблюдаемых, помещая один внутренний наблюдаемый за другим.).',
      active: false,
    },
    {
      question: 'Операторы exhaustMap,zip,pluck,iif',
      response:
        'exhaustMap Сопоставляет каждое значение с наблюдаемым, затем выравнивает все эти внутренние наблюдаемые с помощью exhaustAll' +
        '(Выравнивает Observable-of-Observables, отбрасывая следующий внутренний Observables, пока текущий внутренний Observable все еще выполняется).' +
        'zip Объединяет несколько наблюдаемых объектов для создания наблюдаемого объекта,' +
        ' значения которого вычисляются на основе значений (по порядку) каждого из его входных наблюдаемых объектов.' +
        'pluck Похож на map, но предназначен только для выбора одного из вложенных свойств каждого отправленного значения.' +
        'iif Проверяет логическое значение во время подписки и выбирает один из двух наблюдаемых источников',
      active: false,
    },
    {
      question: 'Операторы timer,interval,of,from,fromEvent',
      response:
        'timer Используется для отправки уведомления после задержки. ' +
        'interval Используется для отправки уведомления через отрезки времени.' +
        'of Преобразует аргументы в Observable последовательность.' +
        'from Преобразует практически все в Observable объект.' +
        'fromEvent Создает Observable, который генерирует события определенного типа, исходящие из заданной цели события.',
      active: false,
    },
    {
      question: 'Операторы startWith,catch,catchError,retry',
      response:
        'startWith Сначала по порядку выдает свои аргументы, а затем все выбросы из источника. ' +
        'debounce Выдает уведомление из исходного наблюдаемого только по истечении определенного промежутка времени,' +
        ' определенного другим наблюдаемым, без выброса другого источника.' +
        'catchError Он только слушает канал ошибок и игнорирует уведомления. Обрабатывает ошибки из исходного наблюдаемого' +
        ' и сопоставляет их с новым наблюдаемым. Ошибка также может быть повторно выдана,' +
        ' или может быть выдана новая ошибка для выдачи ошибки из результата.' +
        'retry Возвращает Observable, который является зеркальным отражением исходного Observable, за исключением error.' +
        'delay Задерживает выброс элементов из источника Observable на заданное время или до заданной даты.',
      active: false,
    },
    {
      question:
        'Операторы distinctUntilChanged,distinctUntilKeyChanged,toPromise',
      response:
        ' distinctUntilChanged Возвращает результат Observable, который выдает все значения, отправленные исходным ' +
        'наблюдаемым объектом, если они отличаются от последнего значения, отправленного результирующим наблюдаемым объектом.' +
        'distinctUntilKeyChanged Возвращает Observable, который выдает все элементы, выданные исходным Observable, которые отличаются' +
        ' от предыдущего элемента, используя свойство, ' +
        'доступ к которому осуществляется с помощью предоставленного ключа, для проверки того, являются ли два элемента различными.' +
        'toPromise',
      active: false,
    },
  ],
  active: false,
};
