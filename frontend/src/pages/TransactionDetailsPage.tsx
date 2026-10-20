import { Link, useParams, useNavigate } from 'react-router'
import type { Transaction } from '../types/transaction'

type TransactionDetailsPageProps = {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export function TransactionDetailsPage({ transactions, onDelete }: TransactionDetailsPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const transaction = transactions.find((item) => item.id === id)

  if (!transaction) {
    return (
      <section>
        <h1>Операция не найдена</h1>
        <Link to="/transactions">К списку операций</Link>
      </section>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Удалить операцию «${transaction.title}»?`)) {
      onDelete(transaction.id)
      navigate('/transactions', { replace: true })
    }
  }

  return (
    <section>
      <h1>{transaction.title}</h1>
      <p>{transaction.description}</p>
      <p>Тип: {transaction.type === 'income' ? 'Доход' : 'Расход'}</p>
      <p>Сумма: {transaction.amount} ₽</p>
      <p>Дата: {transaction.date}</p>
      <p>Категория: {transaction.category}</p>
      
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/transactions">К списку операций</Link>
        <Link to={`/transactions/${transaction.id}/edit`}>Редактировать</Link>
        <button type="button" onClick={handleDelete} style={{ color: 'red' }}>
          Удалить
        </button>
      </div>
    </section>
  )
}