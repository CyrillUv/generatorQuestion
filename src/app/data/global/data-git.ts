import { IDataQuestion } from '../question/type';

export const dataGit: IDataQuestion = {
  name: 'Git',
  questions: [
    {
      question: 'Что такое Git?',
      response:
        'Git — это система контроля версий, которая широко используется для' +
        ' управления изменениями в коде и совместной работы над проектами.' +
        'Советы по работе с Git\n' +
        '1. Частые коммиты: Делайте коммиты чаще с чёткими и осмысленными сообщениями, чтобы отследить изменения в проекте.\n' +
        '2. Группировка изменений: Старайтесь группировать связанные изменения в одном коммите.\n' +
        '3. Работа с ветками: Используйте ветки для разработки новых функций или исправлений. ' +
        'Это помогает предотвратить порядок конфликтов и поддерживать чистоту основной ветки.\n' +
        '4. Решение конфликтов: Учитесь разрешать конфликты при слиянии. Это важный навык для работы в команде.\n' +
        '5. Использование remote: Знайте, как работать с удалёнными репозиториями. Это включает в себя команды git push, git pull, и git fetch.\n' +
        '6. .gitignore: Используйте файл .gitignore, чтобы исключить из индексации временные файлы, настройки IDE и другие не нужные файлы.',
      active: false,
    },
    {
      question: 'Основные понятия Git',
      response:
        '1. Репозиторий (repository): Это основное хранилище для вашего проекта, где хранится вся история изменений.\n' +
        '2. Коммит (commit): Это сохранение изменений в репозитории. Каждый коммит содержит сообщение о том, что было изменено.\n' +
        '3. Ветка (branch): Это параллельная линия разработки, позволяющая работать над новыми функциями или исправлениями' +
        ' без влияния на основную ветку.\n' +
        '4. Слияние (merge): Это процесс объединения изменений из одной ветки в другую.\n' +
        '5. Конфликты (conflicts): Возникают, когда изменения в двух ветках конфликтуют, и Git не может автоматически объединить их.',
      active: false,
    },
    {
      question: 'Основные команды Git',
      response:
        '1. git init: Инициализация нового репозитория.\n' +
        '2. git clone [url]: Клонирование существующего репозитория.\n' +
        '3. git add [file]: Добавление файлов к индексации (подготовка к коммиту).\n' +
        '4. git commit -m "message": Сохранение изменений с сообщением.\n' +
        '5. git status: Проверка статуса файлов в репозитории.\n' +
        '6. git log: Просмотр истории коммитов.\n' +
        '7. git branch: Просмотр существующих веток.\n' +
        '8. git checkout [branch]: Переключение на другую ветку.\n' +
        '9. git merge [branch]: Слияние указанной ветки с текущей.\n' +
        '10. git pull: Получение последних изменений из удалённого репозитория и автоматическое слияние.\n' +
        '11. git push: Отправка коммитов на удалённый репозиторий.\n',
      active: false,
    },
    {
      question: 'Git hooks',
      response:
        'Git hooks — это специальные скрипты, которые выполняются автоматически при выполнении' +
        ' определённых действий с репозиторием Git. Они позволяют настраивать процессы автоматизации ' +
        'и улучшать рабочий процесс разработки. Git поддерживает хуки для различных событий, таких как' +
        ' коммиты, слияния, и отправка данных в удалённый репозиторий. Эти хуки написаны в языке сценариев,' +
        ' таком как Bash, и могут быть настроены в зависимости от ваших нужд.\n' +
        '\n' +
        '### Основные виды хуков\n' +
        '\n' +
        '1. pre-commit: Выполняется перед созданием коммита. Используется для проверки кода на ошибки,' +
        ' форматирования, запуска тестов и т.д. Если скрипт завершится с ненулевым кодом, коммит не будет выполнен.\n' +
        '\n' +
        '2. prepare-commit-msg: Запускается перед открытием редактора для ввода сообщения коммита.' +
        ' Используется для изменения или дополнения стандартного сообщения о коммите.\n' +
        '\n' +
        '3. commit-msg: Выполняется после того, как сообщение коммита было введено, но перед его ' +
        'сохранением. Полезно для проверки формата сообщения коммита.\n' +
        '\n' +
        '4. post-commit: Выполняется после завершения коммита. Может использоваться для уведомлений,' +
        ' запуска сборки или других задач, которые должны выполняться после коммита.\n' +
        '\n' +
        '5. pre-push: Выполняется перед отправкой данных в удалённый репозиторий. Этот хук может ' +
        'использоваться для проверки, что все тесты проходят, прежде чем выполнить git push.\n' +
        '\n' +
        '6. post-merge: Выполняется после успешного слияния веток. Может использоваться для выполнения' +
        ' дополнительных действий, таких как установка зависимостей или очистка.\n' +
        '\n' +
        '7. pre-receive, update, post-receive: Эти хуки выполняются на стороне сервера при получении' +
        ' изменений от клиента. Используются для проверки входящих изменений, обеспечения соблюдения политик разработки и т.д.\n' +
        '\n' +
        '### Как настроить хуки\n' +
        '\n' +
        '1. Путь к хукам: Хуки располагаются в директории вашего Git-репозитория по пути .git/hooks/.' +
        ' По умолчанию в этой директории находятся примеры хуков с расширением .sample, которые можно использовать как шаблоны.\n' +
        '\n' +
        '2. Создание хука: Чтобы создать хук, просто переименуйте файл, удалив расширение .sample' +
        ' и добавьте ваш код. Например, для создания хуку pre-commit создайте файл с именем pre-commit в директории .git/hooks/.' +
        '3.После создания хуков не забудьте сделать файл исполняемым, выполнив команду +x .git/hooks/pre-commit' +
        ' Примеры применения хуков\n' +
        '\n' +
        '- Автоматическое форматирование кода с использованием линтеров.\n' +
        '- Запуск тестов перед коммитом или отправкой изменений.\n' +
        '- Обработка и проверка сообщений коммита на соответствие стандартам.\n' +
        '- Уведомление разработчиков через электронную почту о завершении коммитов или слияний.',
      active: false,
    },
    {
      question: ' Рабочие пространства (Worktrees)',
      response:
        'Рабочие пространства (Worktrees) в Git' +
        ' позволяют вам создавать несколько рабочих каталогов для одного' +
        ' репозитория, что позволяет одновременно работать над несколькими ветками ' +
        'без необходимости переключения между ними. Это особенно полезно для разработчиков,' +
        ' которые хотят разрабатывать или тестировать разные изменения в отдельных ветках одновременно.\n' +
        '\n' +
        '### Основные преимущества Worktrees\n' +
        '\n' +
        '1. Одновременная работа с несколькими ветками: Вы можете иметь активные копии различных' +
        ' веток в разных каталогах, что позволяет вам работать над несколькими задачами одновременно.\n' +
        '\n' +
        '2. Изолированное окружение: Каждое рабочее пространство является количеством независимым,' +
        ' что помогает избежать конфликтов и путаницы между изменениями и состояниями веток.\n' +
        '\n' +
        '3. Упрощение тестирования и деплоя: Рабочие пространства позволяют легко протестировать ' +
        'изменения в одной ветке, не затрагивая другие ветки и не переключаясь между ними.\n' +
        'Основные команды для работы с Worktrees\n' +
        '\n' +
        '1. Создание нового рабочего пространства:\n' +
        '\n' +
        'Чтобы создать новое рабочее пространство на основе существующей ветки, используйте команду:\n' +
        '   git worktree add (путь_к_новому_рабочему_каталогу) (ветка) \n' +
        'Эта команда создаст новое рабочее пространство в каталоге ../new-feature-branch на основе ветки feature-branch.' +
        '2. Просмотр существующих рабочих пространств:\n' +
        '\n' +
        'Для просмотра всех рабочих пространств в вашем репозитории выполните команду:git worktree list' +
        '3. Удаление рабочего пространства:\n' +
        '\n' +
        'Если вам больше не нужно рабочее пространство, вы можете удалить его с помощью команды:' +
        ' git worktree remove (путь_к_рабочему_каталогу)' +
        'Обратите внимание, что для успешного удаления рабочего пространства необходимо, чтобы оно было пустым ' +
        '(т.е. в нём не должно быть несохранённых изменений).\n' +
        '\n' +
        '4. Переключение между рабочими пространствами:\n' +
        '\n' +
        'После создания рабочего пространства вы можете просто перейти в его каталог и работать, как если бы вы ' +
        'находились в обычном репозитории.' +
        'Примеры применения Worktrees\n' +
        '\n' +
        '- Работа над несколькими функциональностями: Если у вас есть несколько функциональностей, которые вы хотите разработать' +
        ' одновременно, вы можете создать отдельные рабочие пространства для каждой из них.\n' +
        '\n' +
        '- Проверка состояния ветки: Вы можете тестировать изменения в одной ветке, не боясь привести в замешательство ' +
        'незафиксированные изменения в текущей ветке.\n' +
        '\n' +
        '- Облегчение командной работы: Когда несколько разработчиков работают над проектом, каждый из них может создать' +
        ' своё рабочее пространство для своей задачи, что облегчает совместную работу.',
      active: false,
    },
    {
      question: 'Отмена изменений',
      response:
        'Git предоставляет несколько способов отмены изменений:' +
        ' git checkout, git revert и git reset. Это позволяет разработчикам гибко обрабатывать различные ошибки или откатывать изменения.',
      active: false,
    },
    {
      question: 'Работа с удалёнными репозиториями',
      response:
        'Git поддерживает работу с несколькими удалёнными репозиториями, что позволяет легко клонировать, передавать и получать ' +
        'данные из них. Команды git push и git pull делают это быстро и эффективно.\n',
      active: false,
    },
  ],
  active: false,
};