import { NavLink, Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="app">
      <header>
       <p className="app-title">Expense Tracker</p>
       <nav aria-label="Основная навигация">
        <NavLink to="/transactions" end>Операции</NavLink>
        <NavLink to="/transactions/new">Создать</NavLink>
        </nav>
        <div style={{ fontSize: '0.85rem', color: '#b35900', marginTop: '10px' }}>
          ⚠️ Данные хранятся в памяти. После обновления страницы изменения сбросятся.
          </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}