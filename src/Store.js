import React, { useEffect, useState, useContext } from 'react'
import uuid from 'uuid/v4'

const DICTIONARIES = 'dictionaries'
const STATUS = {
  EMPTY: 'empty',
}

const Context = React.createContext()

function Store({ children }) {
  const [state, setState] = useState({
    dictionaries: [],
  })

  const dictionariesNew = name => {
    const newDictionary = {
      id: uuid(),
      name,
      status: STATUS.EMPTY,
    }
    setState(state => ({
      ...state,
      dictionaries: [...state.dictionaries, newDictionary],
    }))
  }

  const dictionariesDelete = id => {
    setState(state => ({
      ...state,
      dictionaries: state.dictionaries.filter(d => d.id !== id),
    }))
  }

  const dictionariesGet = id => {
    const dictionary = state.dictionaries.find(d => d.id === id)
    if (!dictionary) {
      throw new Error('Dictionaries does not include item with provided id')
    }
    return dictionary
  }

  useEffect(() => {
    const data = localStorage.getItem(DICTIONARIES)
    try {
      if (data) {
        const parsedData = JSON.parse(data) || []
        if (!parsedData.length) {
          return
        }
        setState(state => ({ ...state, dictionaries: parsedData }))
      }
    } catch (e) {
      console.warn(
        'There was an error reading/parsing the data from local storage',
      )
    }
  }, [])

  useEffect(
    () => {
      localStorage.setItem(DICTIONARIES, JSON.stringify(state.dictionaries))
    },
    [state.dictionaries],
  )

  return (
    <Context.Provider
      value={{ state, dictionariesNew, dictionariesDelete, dictionariesGet }}
    >
      {children}
    </Context.Provider>
  )
}

function useStore() {
  return useContext(Context)
}

export { useStore, Store, STATUS }
