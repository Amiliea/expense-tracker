# Прогресс проекта

## ЛР-1 — React + TypeScript + Vite

### Что изменилось

- Создан React-проект с TypeScript и Vite.
- Главная страница адаптирована под тему Expense Tracker.
- Добавлены README, .gitignore и .node-version.

### Как проверить

```bash
cd frontend
npm ci
npm run dev
```
Для production-проверки:

```bash
npm run build
npm run preview
```

### Коммит / тег

Коммит: `Lab 1: create React TypeScript app`

Тег: `lab-1`


## ЛР2
- Добавлены типы Transactions и демонстрационные данные.
- Созданы компоненты: AppLayout, TransactionCard.
- Созданы страницы: TransactionsPage, TransactionDetilsPage, NewTransactionPage, NotFoundPage.
- Подключён React Router (BrowserRouter в main.tsx, Routes в App.tsx).
- Проверки: список, карточки, прямое открытие, /unknown, /transactions/missing, пустой список, build, preview.
- Коммит: "Lab2: added pages and naigation"

## ЛР3

Добавлены формы и локальное состояние: создание, редактирование,
удаление и фильтрация операций. Список и карточка читают общий
массив из состояния `App`.

- Добавлены типы `TransactionDraft` (черновик формы, сумма — строка)
  и `TransactionInput` (проверенные данные, сумма — число)
  в `src/types/transaction.ts`.
- Состояние `transactions` поднято в `App.tsx` через `useState`.
  Демонстрационные данные из `src/data/transactions.ts` используются
  только при инициализации.
- Добавлены функции `createTransaction`, `updateTransaction`,
  `deleteTransaction` с неизменяемыми обновлениями
  (`spread`, `map`, `filter`). `id` генерируется через
  `crypto.randomUUID()` при создании.
- Создан переиспользуемый компонент
  `src/components/TransactionForm.tsx`:
  - хранит локальный черновик `useState<TransactionDraft>`;
  - управляемые поля (value + onChange);
  - `preventDefault()` при submit;
  - валидация: название 3–100 символов, сумма > 0, обязательная дата;
  - `onSave` вызывается только после успешной проверки;
  - кнопки `submit` и `type="button"` (отмена).
- Созданы страницы:
  - `NewTransactionPage` — форма создания,
    после сохранения переход на карточку новой записи;
  - `EditTransactionPage` — форма редактирования с `key={transaction.id}`
    (сброс черновика при смене записи), id сохраняется;
  - `TransactionDetailsPage` дополнена кнопкой «Удалить»
    с `window.confirm` и ссылкой «Редактировать».
- `TransactionsPage` дополнена локальным фильтром по типу операции
  (`all | income | expense`) со сбросом. Фильтр не изменяет общий массив.
- В `AppLayout` добавлено видимое пояснение о временном хранении данных.
- Обновлён `README.md`: новые адреса, возможности ЛР 3, ограничение хранения.

## Проверки:
- создание записи с корректными данными и переход на её карточку;
- редактирование записи: изменение полей, сохранение, проверка в списке и карточке;
- отмена редактирования не меняет исходную запись;
- валидация: пустое и короткое название, отрицательная и нулевая сумма,
  пустая дата — ошибка видна, введённые поля сохраняются;
- фильтр по типу операции и сброс, сообщение при отсутствии совпадений;
- удаление: отмена в окне подтверждения и подтверждение;
  после удаления — переход к списку, адрес удалённой записи
  показывает «Операция не найдена»;
- пустой список после удаления всех записей и создание новой из него;
- прямое открытие карточки и редактирования по адресу;
- обновление страницы возвращает демонстрационные записи;
- сборка `npm run build` и `npm run preview` проходят без ошибок;
- консоль без ошибок и предупреждений о controlled/uncontrolled.

- Коммит: `Lab 3: add local forms and CRUD`

## ЛР 4

Добавлена загрузка справочника категорий по HTTP. Категория операции
теперь выбирается из сетевого справочника. Список операций по-прежнему
хранится в состоянии `App` и сбрасывается при обновлении страницы.

- Создан JSON-справочник категорий `frontend/public/demo/categories.json`
  с уникальными `id` и понятными `name`.
- Добавлен тип `Category` в `src/types/category.ts`.
- В демонстрационных данных `src/data/transactions.ts` поле `category`
  теперь содержит `id` справочника (например, `'food'`), а не отображаемое
  название.
- Создан сервис `src/services/categories.ts`:
  - `isCategory(value: unknown): value is Category` — проверка одного объекта;
  - `parseCategories(value: unknown): Category[]` — проверка массива
    и уникальности `id`;
  - `getCategories(signal: AbortSignal): Promise<Category[]>` — `fetch`
    с проверкой `response.ok` и разбором JSON;
  - используется `cache: 'no-store'` для актуальных данных при повторных запросах.
- Создан хук `src/hooks/useCategories.ts`:
  - три состояния: `loading`, `error`, `success`;
  - `AbortController` отменяет запрос при размонтировании;
  - флаг `active` игнорирует результат устаревшей загрузки;
  - функция `retry` запускает повторную загрузку (через `attempt` в `useEffect`).
- Обновлён `src/components/TransactionForm.tsx`:
  - используется `useCategories`;
  - вместо поля ввода категории — `select` с загруженными вариантами;
  - кнопка «Сохранить» заблокирована, пока справочник не загружен
    или выбранная категория отсутствует в справочнике;
  - показаны состояния: «Загружаем категории», ошибка с кнопкой «Повторить»,
    «Категорий нет» с кнопкой «Повторить»;
  - при `submit` дополнительная проверка `canSave` перед валидацией ЛР 3;
  - сохранён прежний черновик, `onSave`, `onCancel`, все поля ЛР 3.

## Проверки:
- в Network видно `GET /demo/categories.json` при открытии формы;
- выбор категории из загруженных данных при создании и редактировании;
- сохранение блокируется, пока справочник не загружен;
- Offline-режим показывает ошибку, «Повторить» после восстановления сети
  не сбрасывает введённые поля;
- `categories.json = []` показывает отдельное пустое состояние;
- неправильная структура (объект вместо массива, числовой `id`,
  повторяющиеся `id`) даёт ошибку структуры;
- уход со страницы во время загрузки не вызывает ошибок в консоли
  (используется `AbortController`);
- создание, редактирование, отмена, удаление и фильтр ЛР 3 продолжают работать;
- `npm run build` и `npm run preview` проходят, справочник доступен в preview.

- Коммит: `Lab 4: load categories via HTTP`


## ЛР 5

Справочник категорий перенесён в Supabase. Форма загружает категории из
PostgreSQL через @supabase/supabase-js. Основные операции остаются в памяти
App (перенос — в ЛР 6 вместе с авторизацией).

Схема данных:
- public.categories — публичный справочник:
  - id text primary key (стабильный код: food, transport, …);
  - name text not null unique;
  - check: id и name без пробелов по краям и непустые.
- public.transactions — личные операции (пока пустая):
  - id uuid primary key default gen_random_uuid();
  - owner_id uuid not null references auth.users(id) on delete cascade;
  - category_id text not null references categories(id)
    on update cascade on delete restrict;
  - title, description, type, amount numeric, date date, created_at timestamptz;
  - check: title 3–100 символов; type in ('income','expense'); amount > 0.

Доступ:
- RLS включён на обеих таблицах.
- revoke all для anon и authenticated на обеих таблицах.
- grant select и policy "categories are publicly readable" (using true)
  только на categories.
- На transactions клиентских прав и политик нет: клиент не может ни читать,
  ни писать.

Файлы в репозитории:
- supabase/migrations/001_initial_schema.sql — схема, ключи, ограничения,
  RLS, права и политика.
- supabase/seed.sql — 7 категорий (food, transport, housing, entertainment,
  salary, freelance, health), вставка через upsert по id.
- frontend/src/lib/supabase.ts — единый клиент из env-переменных,
  проверка конфигурации при импорте.
- frontend/src/services/categories.ts — getCategories заменён на запрос
  через supabase.from('categories').select('id, name').order('name')
  с передачей AbortSignal. Проверка parseCategories сохранена.
- frontend/.env.example — образец без значений; .env.local в .gitignore.
- frontend/public/demo/categories.json — удалён.

Интерфейс:
- useCategories и TransactionForm не переписаны: контракт сервиса сохранён
  (getCategories(signal): Promise<Category[]>).
- Добавлена кнопка «Обновить справочник» (type="button", disabled во время
  загрузки), вызывает retry без потери черновика.
- Состояния loading / error / empty / success по-прежнему различимы.

Порядок применения (фактический):
1. SQL Editor → выполнить 001_initial_schema.sql.
2. SQL Editor → выполнить seed.sql (повторное применение безопасно).
3. Создать frontend/.env.local с VITE_SUPABASE_URL и
   VITE_SUPABASE_PUBLISHABLE_KEY.
4. Перезапустить Vite (npm run dev).

## Проверки:
- Network показывает запрос к supabase.co/rest/v1/categories (не /demo/…);
- /demo/categories.json отдаёт 404;
- выбор категории при создании и редактировании;
- UPDATE categories SET name в SQL Editor → после «Обновить справочник»
  видно новое name при том же id; черновик формы сохранён;
- DELETE FROM categories → пустое состояние; повторный seed + «Обновить» →
  всё вернулось;
- временная опечатка в имени таблицы в сервисе → ошибка, «Повторить»;
- попытка INSERT в categories из клиента → ошибка доступа (42501 /
  permission denied), строка не создаётся;
- SELECT из transactions из клиента → permission denied;
- без .env.local приложение выдаёт понятную ошибку конфигурации;
- создание, редактирование, отмена, удаление и фильтр ЛР 3 работают;
- npm run build и npm run preview проходят, форма в preview тоже
  читает Supabase.

Временный проверочный код (tryInsert, trySelectTransactions) удалён
перед коммитом.

- Коммит: `Lab 5: add Supabase schema and reference data`


## ЛР 6

Подключены Supabase Auth и постоянное хранение операций. Каждый пользователь
видит только свои записи. Данные сохраняются после перезагрузки страницы.

Схема и RLS:
- На таблицу `public.transactions` выданы права `select, insert, update, delete`
  роли `authenticated` (анонимный доступ по-прежнему запрещён).
- Созданы четыре RLS-политики для `transactions`:
  - select — `using ((select auth.uid()) = owner_id)`;
  - insert — `with check ((select auth.uid()) = owner_id)`;
  - update — `using` и `with check` по owner_id;
  - delete — `using ((select auth.uid()) = owner_id)`.
- Таблица `categories` остаётся публичной на чтение.

Клиент:
- Добавлены `src/pages/AuthPage.tsx` (регистрация и вход) и `src/services/transactions.ts`
  (getTransactions, createTransaction, updateTransaction, deleteTransaction).
- В `App.tsx`:
  - `claims` через `supabase.auth.getClaims()` и `supabase.auth.onAuthStateChange`;
  - пока нет пользователя — показывается `AuthPage`;
  - при входе операции загружаются из Supabase;
  - CRUD-обработчики стали асинхронными и работают через сервис.
- В `AppLayout` добавлены email пользователя и кнопка «Выйти».
- Удалён демонстрационный массив `src/data/transactions.ts` (или оставлен
  только как историческая справка, но не используется в `App`).
- Текст про «данные в памяти» заменён на пояснение, что данные сохраняются в Supabase.

Проверки:
- регистрация нового пользователя и вход;
- создание, редактирование, удаление операции с сохранением в БД;
- обновление страницы (F5): данные не пропадают;
- второй пользователь видит только свои операции;
- выход из аккаунта возвращает к `AuthPage`;
- без входа запрос к `transactions` возвращает пустой результат / ошибку;
- `npm run build` и `npm run preview` проходят;
- `.env.local` не попал в Git, `.env.example` — в Git.

- Коммит: `Lab 6: add Supabase Auth and persistent transactions`