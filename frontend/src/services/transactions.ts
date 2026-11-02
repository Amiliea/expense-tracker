import { supabase } from '../lib/supabase'
import type { Transaction, TransactionInput } from '../types/transaction'

export async function getTransactions(): Promise<Transaction[]> {
  const { data, error } = await supabase
    .from('transactions')
    .select('id, title, description, type, amount, date, category_id')
    .order('date', { ascending: false })

  if (error) throw new Error(`Не удалось загрузить операции: ${error.message}`)

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type as 'income' | 'expense',
    amount: Number(row.amount),
    date: row.date,
    category: row.category_id,
  }))
}

export async function createTransaction(input: TransactionInput): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Пользователь не авторизован')

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      owner_id: user.id,
      title: input.title,
      description: input.description,
      type: input.type,
      amount: input.amount,
      date: input.date,
      category_id: input.category,
    })
    .select('id')
    .single()

  if (error) throw new Error(`Не удалось создать операцию: ${error.message}`)
  return data.id
}

export async function updateTransaction(id: string, input: TransactionInput): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .update({
      title: input.title,
      description: input.description,
      type: input.type,
      amount: input.amount,
      date: input.date,
      category_id: input.category,
    })
    .eq('id', id)

  if (error) throw new Error(`Не удалось обновить операцию: ${error.message}`)
}

export async function deleteTransaction(id: string): Promise<void> {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)

  if (error) throw new Error(`Не удалось удалить операцию: ${error.message}`)
}