import React from 'react'

export default function Select({ label, id, name, value, onChange, error, defaultOption, options }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defaultOption && <option hidden value="">{defaultOption}</option>}
        {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
      </select>
      <p className="errors">{error}</p>
    </div>
  )
}
