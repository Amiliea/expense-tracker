import { Link, useParams, useNavigate } from 'react-router'
import type { Transaction } from '../types/transaction'

type TransactionDetailsPageProps = {
  transactions: Transaction[]
  onDelete: (id: string) => void | Promise<void>
}

export function TransactionDetailsPage({ transactions, onDelete }: TransactionDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  const transaction = transactions.find((t) => t.id === id)

  if (!transaction) {
    return (
      <section>
        <h1>Операция не найдена</h1>
        <Link to="/transactions">← К списку операций</Link>
      </section>
    )
  }

  const handleDelete = async () => {
    if (window.confirm(`Удалить операцию «${transaction.title}»?`)) {
      await onDelete(transaction.id)
      navigate('/transactions', { replace: true })
    }
  }

  return (
    <section>
      <h1>{transaction.title}</h1>
      <dl className="details-card">
        <div className="details-row">
          <dt>Описание</dt>
          <dd>{transaction.description || '—'}</dd>
        </div>
        <div className="details-row">
          <dt>Тип</dt>
          <dd>
            <span className={`transaction-type ${transaction.type}`}>
              {transaction.type === 'income' ? 'Доход' : 'Расход'}
            </span>
          </dd>
        </div>
        <div className="details-row">
          <dt>Сумма</dt>
          <dd className={`transaction-amount ${transaction.type}`}>{transaction.amount} ₽</dd>
        </div>
        <div className="details-row">
          <dt>Дата</dt>
          <dd>{transaction.date}</dd>
        </div>
        <div className="details-row">
          <dt>Категория</dt>
          <dd>{transaction.category}</dd>
        </div>
      </dl>

      <div className="details-actions">
        <Link to="/transactions">← К списку</Link>
        <Link to={`/transactions/${transaction.id}/edit`} className="button-link">
          Редактировать
        </Link>
        <button type="button" className="danger" onClick={handleDelete}>
          Удалить
        </button>
      </div>
    </section>
  )
}