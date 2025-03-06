import React, { useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function ExpenseForm({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) {
  const [error, setError] = useState({})

  const validationConfig = {
    title: [
      { required: true, message: 'Please enter title' },
      { minLength: 2, message: 'Title should be at least 2 character' },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'This is a valid email id',
      },
    ],
    category: [{ required: true, message: 'Please select category' }],
    amount: [{ required: true, message: 'Please enter amount' }],
  }

  const validate = (formData) => {
    const errorData = {}
    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].forEach((rule) => {
        if (rule.required && !value) errorData[key] = rule.message

        if (
          rule.minLength &&
          value.length < rule.minLength &&
          value.length !== 0
        )
          errorData[key] = rule.message

        if (rule.pattern && rule.pattern.test(value))
          errorData[key] = rule.message
      })
    })
    setError(errorData)
    return errorData
  }

  const handleExpenseChange = (e) => {
    if (e.target.name === 'amount')
      setExpense({
        ...expense,
        [e.target.name]: Number(e.target.value),
      })
    else
      setExpense({
        ...expense,
        [e.target.name]: e.target.value,
      })
    setError((prevState) => {
      return { ...prevState, [e.target.name]: '' }
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const validateResult = validate(expense)
    if (Object.keys(validateResult).length) return

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { id: editingRowId, ...expense }
          }
          return prevExpense
        })
      )
      setEditingRowId('')
      setExpense({
        title: '',
        category: '',
        amount: '',
      })
      return
    }

    setExpenses((prevState) => [
      ...prevState,
      { id: crypto.randomUUID(), ...expense },
    ])
    setExpense({
      title: '',
      category: '',
      amount: '',
    })
  }

  return (
    <form className="expense-form" onSubmit={(e) => submitHandler(e)}>
      <Input
        id="title"
        className={'input-container'}
        label="Title"
        type="text"
        name="title"
        value={expense.title}
        onChange={handleExpenseChange}
        error={error.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleExpenseChange}
        error={error.category}
        defaultOption="Select Category"
        options={[
          'Grocery',
          'Clothes',
          'Bills',
          'Education',
          'Medicine',
          'Others',
        ]}
      />
      <Input
        id="amount"
        className={'input-container'}
        label="Amount"
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleExpenseChange}
        error={error.amount}
      />
      <button className="add-btn">{editingRowId ? 'Save' : 'Add'}</button>
    </form>
  )
}
