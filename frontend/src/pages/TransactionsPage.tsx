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
      <h1>Мои операции</h1>
      
      {}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="filter-type">Показать: </label>
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
        <button type="button" onClick={() => setFilterType('all')}>Сбросить</button>
      </div>

      <Link to="/transactions/new">Добавить операцию</Link>

      {transactions.length === 0 ? (
        <p>Операций пока нет.</p>
      ) : visibleTransactions.length === 0 ? (
        <p>По вашему фильтру ничего не найдено.</p>
      ) : (
        <div className="transaction-list" style={{ marginTop: '20px' }}>
          {visibleTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </section>
  )
}