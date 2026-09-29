import './App.css'

const appTitle: string = 'Expense Tracker'

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>{appTitle}</h1>
        <p>Личный учёт доходов и расходов в одной валюте.</p>
      </header>

      <section aria-labelledby="transactions-title">
        <h2 id="transactions-title">Операции</h2>
        <p>На следующих этапах здесь появятся доходы, расходы и категории.</p>
      </section>
    </main>
  )
}