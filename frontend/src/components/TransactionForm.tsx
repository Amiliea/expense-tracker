import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TransactionDraft } from '../types/transaction'
import { useCategories } from '../hooks/useCategories'

type TransactionFormProps = {
  initialValues: TransactionDraft
  onSave: (draft: Omit<TransactionDraft, 'amount'> & { amount: number }) => void
  onCancel: () => void
}

export function TransactionForm(props: TransactionFormProps) {
  const [draft, setDraft] = useState<TransactionDraft>(() => ({ ...props.initialValues }))
  const [error, setError] = useState('')
  const { load, retry } = useCategories()
  const categories = load.status === 'success' ? load.data : []
  const selectedCategoryExists = categories.some((c) => c.id === draft.category)
  const canSave = load.status === 'success' && selectedCategoryExists


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault() 
    if (!canSave) {
      setError('Дождитесь справочника и выберите доступную категорию.')
      return
    }

    const title = draft.title.trim()
    if (title.length < 3 || title.length > 100) {
      setError('Название должно содержать от 3 до 100 символов.')
      return
    }

    const amountStr = draft.amount.trim()
    if (amountStr === '') {
      setError('Укажите сумму.')
      return
    }

    const amount = Number(amountStr)
    if (!Number.isFinite(amount) || amount <= 0) {
      setError('Сумма должна быть числом больше нуля.')
      return
    }

    if (!draft.date) {
      setError('Укажите дату операции.')
      return
    }

    setError('')
    props.onSave({ ...draft, title, amount }) 
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <div>
        <label htmlFor="tx-title">Название</label>
        <input
          id="tx-title"
          value={draft.title}
          required
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="tx-desc">Описание</label>
        <textarea
          id="tx-desc"
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="tx-type">Тип операции</label>
        <select
          id="tx-type"
          value={draft.type}
          onChange={(e) => {
            const val = e.target.value
            if (val === 'income' || val === 'expense') {
              setDraft({ ...draft, type: val })
            }
          }}
        >
          <option value="expense">Расход</option>
          <option value="income">Доход</option>
        </select>
      </div>

      <div>
        <label htmlFor="tx-amount">Сумма (₽)</label>
        <input
          id="tx-amount"
          type="number"
          min="0.01"
          step="0.01"
          value={draft.amount}
          required
          onChange={(e) => setDraft({ ...draft, amount: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="tx-date">Дата</label>
        <input
          id="tx-date"
          type="date"
          value={draft.date}
          required
          onChange={(e) => setDraft({ ...draft, date: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="tx-category">Категория</label>
        <select
          id="tx-category"
          value={draft.category}
          required
          disabled={load.status !== 'success' || categories.length === 0}
          onChange={(e) => setDraft({ ...draft, category: e.target.value })}
        >
          <option value="">Выберите категорию</option>
          {draft.category !== '' && !selectedCategoryExists && (
            <option value={draft.category} disabled>
              Текущий код: {draft.category} — выберите доступную категорию
            </option>
          )}
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {load.status === 'loading' && (
          <p role="status">Загружаем категории...</p>
        )}
        {load.status === 'error' && (
          <div>
            <p role="alert">{load.message}</p>
            <button type="button" onClick={retry}>Повторить</button>
          </div>
        )}
        {load.status === 'success' && categories.length === 0 && (
          <div>
            <p role="status">Категорий пока нет. Сохранение недоступно</p>
            <button type="button" onClick={retry}>Повторить</button>
          </div>
        )}
      </div>

      {error && <p role="alert" style={{ color: 'red', margin: 0 }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={!canSave}>Сохранить</button>
        <button type="button" onClick={props.onCancel}>Отмена</button>
      </div>
    </form>
  )
}