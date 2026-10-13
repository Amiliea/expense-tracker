export type TransactionType = 'income' | 'expense'

export type Transaction = {
  id: string
  title: string
  description: string
  type: TransactionType
  amount: number
  date: string        
  category: string
}