import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialData) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem(key))) setData(JSON.parse(localStorage.getItem(key)))
    else localStorage.setItem(key, JSON.stringify(initialData))
  }, [])

  const updateLocalStorage = (newData) => {
    if (typeof newData === 'function')
      localStorage.setItem(key, JSON.stringify(newData(data)))
    else localStorage.setItem(key, JSON.stringify(newData))

    setData(newData)
  }
  return [data, updateLocalStorage]
}
