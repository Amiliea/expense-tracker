import { Link } from 'react-router'
import type { Transaction } from '../types/transaction'

type TransactionCardProps = {
  transaction: Transaction
}

const typeLabels: Record<Transaction['type'], string> = {
  income: 'Доход',
  expense: 'Расход',
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  return (
    <article className="transaction-card">
      <h2>
        <Link to={`/transactions/${transaction.id}`}>
          {transaction.title}
        </Link>
      </h2>
      <p>{transaction.description}</p>
      <p>
        <span className={`transaction-type ${transaction.type}`}>
          {typeLabels[transaction.type]}
        </span>
        {' · '}
        <span className={`transaction-amount ${transaction.type}`}>
          {transaction.amount} ₽
        </span>
      </p>
      <p>Дата: {transaction.date}</p>
      <p>Категория: {transaction.category}</p>
    </article>
  )
}