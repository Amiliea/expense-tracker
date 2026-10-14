# Expense Tracker

Личный учёт доходов и расходов в одной валюте.

## ЛР-1

Создано стартовое приложение на React, TypeScript и Vite.
На первом этапе отображается главная страница Expense Tracker.

## Требования

- Node.js
- npm

## Запуск

```bash
cd frontend
npm ci
npm run dev
```

## Проверка production-сборки

```bash
cd frontend
npm run build
npm run preview
```

## ЛР-2

Добавлены страницы и навигация на React Router: список операций, карточка по id, страница создания и страница «не найдено», объединённые общим layout.

## Страницы
- `/` -> редирект на `transactions`
- `/transactions` - список операций
- `/transactions/new` - создание (заглушка)
- `/transactions/:id` - подробности операции
- `*` - страница "не найдено"

Записи сейчас демонстрацинные (массив в `src/data/transactions.tsx`)