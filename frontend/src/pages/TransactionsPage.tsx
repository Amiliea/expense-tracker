import { useState } from 'react'
import { Link } from 'react-router'
import { TransactionCard } from '../components/TransactionCard'
import type { Transaction } from '../types/transaction'

type TransactionsPageProps = {
  transactions: Transaction[]
}

export function TransactionsPage({ transactions }: TransactionsPageProps) {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all')

  const visibleTransactions = transactions.filter(
    (t) => filterType === 'all' || t.type === filterType
  )

  return (
    <section>
      <div className="page-header">
        <h1>Мои операции</h1>
        <Link to="/transactions/new" className="button-link">
          + Новая операция
        </Link>
      </div>

      <div className="filter-bar">
        <label htmlFor="filter-type">Показать:</label>
        <select
          id="filter-type"
          value={filterType}
          onChange={(e) => {
            const val = e.target.value
            if (val === 'all' || val === 'income' || val === 'expense') {
              setFilterType(val)
            }
          }}
        >
          <option value="all">Все</option>
          <option value="income">Доходы</option>
          <option value="expense">Расходы</option>
        </select>
        <button type="button" className="secondary" onClick={() => setFilterType('all')}>
          Сбросить
        </button>
      </div>

      {transactions.length === 0 ? (
        <p>Операций пока нет. Создайте первую!</p>
      ) : visibleTransactions.length === 0 ? (
        <p>По вашему фильтру ничего не найдено.</p>
      ) : (
        <div className="transaction-list">
          {visibleTransactions.map((t) => (
            <TransactionCard key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </section>
  )
}