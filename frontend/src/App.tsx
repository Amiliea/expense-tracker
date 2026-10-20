import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { TransactionsPage } from './pages/TransactionsPage'
import { TransactionDetailsPage } from './pages/TransactionDetailsPage'
import { NewTransactionPage } from './pages/NewTransactionPage'
import { EditTransactionPage } from './pages/EditTransactionPage'
import { NotFoundPage } from './pages/NotFoundPage'
import type { Transaction, TransactionInput } from './types/transaction'
import { transactions as initialTransactions } from './data/transactions'
import './App.css'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    initialTransactions.map((t) => ({ ...t }))
  )

  function createTransaction(input: TransactionInput): string {
  const id = crypto.randomUUID()
  setTransactions((current) => [...current, { ...input, id }])
  return id
}

function updateTransaction(id: string, input: TransactionInput): void {
  setTransactions((current) =>
    current.map((t) => (t.id === id ? { ...input, id: t.id } : t))
  )
}

  function deleteTransaction(id: string): void {
    setTransactions((current) => current.filter((t) => t.id !== id))
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/transactions" replace />} />
        
        <Route path="transactions" element={
          <TransactionsPage transactions={transactions} />
        } />
        
        <Route path="transactions/new" element={
          <NewTransactionPage onCreate={createTransaction} />
        } />
        
        <Route path="transactions/:id" element={
          <TransactionDetailsPage transactions={transactions} onDelete={deleteTransaction} />
        } />
        
        <Route path="transactions/:id/edit" element={
          <EditTransactionPage transactions={transactions} onUpdate={updateTransaction} />
        } />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}