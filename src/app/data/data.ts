import {IData} from "./type";

export const data:Array<IData> = [{name:'Структуры данных',questions:[
    {question:
        'Названия  типов данных',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        'Скалярные типы и строки',response:'Они же простые типы данных.' +
        ' Их ключевой особенностью является то, что при присвоении другим переменным,\n' +
        'значение копируется\n' +
        '\n' +
        'К скалярным типам данных относятся:string,number,boolean',
    },{question:
        'Массивы',response:'Массив — это структура, в которой можно хранить' +
        ' коллекции элементов — чисел, строк, других массивов и так далее.' +
        ' Элементы нумеруются и хранятся в том порядке, в котором их поместили в массив.'
    },{question:
        'Списки, словари (хэш-таблицы), множества',response:'1.В javascript в качестве списка выступает обычный массив.' +
        '2.Хэш-таблица это структура данных, которая позволяет' +
        ' хранить пары ключ-значение и выполнять три операции над ними: ' +
        'добавление новой пары, поиск значение по ключу и удаление пары по ключу.'+
        '3.Множества:Объект Set позволяет хранить уникальные значения любого типа, будь то примитивы или ссылки на объекты.'
    },{question:
        '  Кортежи',response:'Кортежи (tuples) в TypeScript представляют собой особый вид массивов,' +
        ' где порядок элементов фиксирован, и каждый элемент имеет заранее определенный тип.' +
        ' Это позволяет точно описывать структуры данных с известным количеством и типами элементов.'
    },{question:
        '  Изменяемость типов данных',response:'В JavaScript у нас есть примитивные типы и ссылочные типы.' +
        ' Примитивные типы включают числа, строки, boolean, null, undefined.' +
        ' И ссылочные типы включают объекты, массивы и функции. Разница между этими типами' +
        ' заключается в том, что примитивные типы неизменяемы (immutable), а ссылочные типы изменяемы (mutable)'
    },{question:
        '  Сложности операций вставки и поиска',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        'Внутреннее устройство стандартных контейнеров (список, словарь)',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        'Графы',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        '    Деревья',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        ' Самобалансирующиеся деревья(АВЛ, красно-черное)',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        'Понимание вычислительной сложности поиска и вставки данных',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    },{question:
        'Совместимость структур данных и многопоточная обработка',response:'Number,string,boolean,object,null,undefined,Symbol,BigInt'
    }]}]
