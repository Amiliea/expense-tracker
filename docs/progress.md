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
- Коммит: "Lab2: added pages and navigation
