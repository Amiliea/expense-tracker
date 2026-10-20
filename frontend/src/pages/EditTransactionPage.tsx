import { Link, useParams, useNavigate } from 'react-router'
import { TransactionForm } from '../components/TransactionForm'
import type { Transaction, TransactionDraft, TransactionInput } from '../types/transaction'

type EditTransactionPageProps = {
  transactions: Transaction[]
  onUpdate: (id: string, input: TransactionInput) => void
}

export function EditTransactionPage({ transactions, onUpdate }: EditTransactionPageProps) {
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

  const initialValues: TransactionDraft = {
    title: transaction.title,
    description: transaction.description,
    type: transaction.type,
    amount: String(transaction.amount),
    date: transaction.date,
    category: transaction.category,
  }

  return (
    <section>
      <h1>Редактирование операции</h1>
      {}
      <TransactionForm
        key={transaction.id}
        initialValues={initialValues}
        onSave={(input) => {
          onUpdate(transaction.id, input)
          navigate(`/transactions/${transaction.id}`) 
        }}
        onCancel={() => navigate(`/transactions/${transaction.id}`)}
      />
    </section>
  )
}