import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import expenseData from './expenseData'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [expenses, setExpenses] = useLocalStorage('expenses', expenseData)
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId', '')
  const [expense, setExpense] = useLocalStorage('expense', {
    title: '',
    category: '',
    amount: '',
  })

  const [localData, setLocalData] = useLocalStorage('myNum', [1, 2, 3])
  return (
    <>
      <main>
        <h1>Track Your Expense</h1>
        <div className="expense-tracker">
          <ExpenseForm setExpenses={setExpenses} expense={expense} setExpense={setExpense} editingRowId={editingRowId} setEditingRowId={setEditingRowId} />
          <ExpenseTable expenses={expenses} setExpense={setExpense} setExpenses={setExpenses} setEditingRowId={setEditingRowId} />
        </div>
      </main>
    </>
  )
}

export default App
