import { Link } from 'react-router'
import { TransactionCard } from '../components/TransactionCard'
import { transactions } from '../data/transactions'

export function TransactionsPage() {
  return (
    <section>
      <h1>Мои операции</h1>
      <Link to="/transactions/new">Добавить операцию</Link>

      {transactions.length === 0 ? (
        <p>Операций пока нет.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      )}
    </section>
  )
}