import { NavLink, Outlet } from 'react-router'
import { supabase } from '../lib/supabase'

type AppLayoutProps = {
  userEmail?: string
}

export function AppLayout({ userEmail }: AppLayoutProps) {
  return (
    <div className="app">
      <header>
        <p className="app-title">Expense Tracker</p>
        <nav aria-label="Основная навигация">
          <NavLink to="/transactions" end>Операции</NavLink>
          <NavLink to="/transactions/new">Создать</NavLink>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem' }}>{userEmail}</span>
            <button
              type="button"
              onClick={() => supabase.auth.signOut()}
            >
              Выйти
            </button>
          </div>
        </nav>
        <div style={{ fontSize: '0.85rem', color: '#1f6feb', marginTop: '10px' }}>
          ✅ Данные сохраняются в базе Supabase. Изменения не пропадут после обновления страницы.
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}