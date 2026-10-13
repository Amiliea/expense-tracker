import { Link, useParams } from 'react-router'
import { transactions } from '../data/transactions'

export function TransactionDetailsPage() {
  const { id } = useParams()
  const transaction = transactions.find((item) => item.id === id)

  if (!transaction) {
    return (
      <section>
        <h1>Операция не найдена</h1>
        <p>Проверьте адрес или вернитесь к списку.</p>
        <Link to="/transactions">К списку операций</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{transaction.title}</h1>
      <p>{transaction.description}</p>
      <p>Тип: {transaction.type === 'income' ? 'Доход' : 'Расход'}</p>
      <p>Сумма: {transaction.amount} ₽</p>
      <p>Дата: {transaction.date}</p>
      <p>Категория: {transaction.category}</p>
      <Link to="/transactions">К списку операций</Link>
    </section>
  )
}