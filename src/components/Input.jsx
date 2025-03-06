import React from 'react'

export default function Input({id, className, label, type, name, value, onChange, error}) {
  return (
    <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
        <p className="errors">{error}</p>
      </div>
  )
}
