import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './app/AppLayout'
import { TransactionsPage } from './pages/TransactionsPage'
import { TransactionDetailsPage } from './pages/TransactionDetailsPage'
import { NewTransactionPage } from './pages/NewTransactionPage'
import { EditTransactionPage } from './pages/EditTransactionPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { AuthPage } from './pages/AuthPage'
import { supabase } from './lib/supabase'
import type { Transaction, TransactionInput } from './types/transaction'
import './App.css'
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from './services/transactions'

export default function App() {
  const [claims, setClaims] = useState<{sub: string; email?: string} | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingData, setLoadingData] = useState(true)


  useEffect(() => {
    supabase.auth.getClaims().then(({data})=> {
      setClaims((data?.claims as {sub: string; email?: string}) ?? null)
      setLoadingAuth(false)
    })

    const {data: {subscription}} = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({data}) => {
        setClaims((data?.claims as {sub: string; email?: string}) ?? null)
      })
    })
    return () => subscription.unsubscribe()
  }, [])

   useEffect(() => {
    if(!claims) return
     getTransactions()
     .then(setTransactions)
     .catch(console.error)
     .finally(() => setLoadingData(false))
  }, [claims])

  if(loadingAuth){
    return <p style={{padding: 32}}>Загрузка...</p>
  }

  if(!claims){
    return <AuthPage/>
  }

  async function handleCreate(input: TransactionInput): Promise<string> {
    const id = await createTransaction(input)
    const updated = await getTransactions()
    setTransactions(updated)
    return id
  }

  async function handleUpdate(id: string, input: TransactionInput): Promise<void> {
    await updateTransaction(id, input)
    const updated = await getTransactions()
    setTransactions(updated)
  }

  async function handleDelete(id: string): Promise<void> {
    await deleteTransaction(id)
    const updated = await getTransactions()
    setTransactions(updated)
  }

  return (
    <Routes>
      <Route element={<AppLayout userEmail={claims?.email} />}>
        <Route index element={<Navigate to="/transactions" replace />} />
        
        <Route path="transactions" element={
          <TransactionsPage transactions={transactions} />
        } />
        
        <Route path="transactions/new" element={
          <NewTransactionPage onCreate={handleCreate} />
        } />
        
        <Route path="transactions/:id" element={
          <TransactionDetailsPage transactions={transactions} onDelete={handleDelete} />
        } />
        
        <Route path="transactions/:id/edit" element={
          <EditTransactionPage transactions={transactions} onUpdate={handleUpdate} />
        } />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}