import { Link } from 'react-router'

export function NewTransactionPage() {
  return (
    <section>
      <h1>Создание операции</h1>
      <p>Форма появится в следующей лабораторной работе.</p>
      <Link to="/transactions">К списку операций</Link>
    </section>
  )
}