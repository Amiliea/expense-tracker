import { useNavigate } from 'react-router'
import { TransactionForm } from '../components/TransactionForm'
import type { TransactionDraft, TransactionInput } from '../types/transaction'

type NewTransactionPageProps = {
  onCreate: (input: TransactionInput)=> string
}

export function NewTransactionPage({ onCreate }: NewTransactionPageProps) {
  const navigate = useNavigate()

  const initialValues: TransactionDraft = {
    title: '',
    description: '',
    type: 'expense', 
    amount: '',
    date: new Date().toISOString().split('T')[0], 
    category: '',
  }

  return (
    <section>
      <h1>Создание операции</h1>
      <TransactionForm
        initialValues={initialValues}
        onSave={(input) => {
          const newId = onCreate(input)
          navigate(`/transactions/${newId}`) 
        }}
        onCancel={() => navigate('/transactions')}
      />
    </section>
  )
}