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
        {typeLabels[transaction.type]}: {transaction.amount} ₽
      </p>
      <p>Дата: {transaction.date}</p>
      <p>Категория: {transaction.category}</p>
    </article>
  )
}