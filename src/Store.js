import React, { useState, useContext } from 'react'
import uuid from 'uuid/v4'

const STATUS = {
  EMPTY: 'empty',
}

const Context = React.createContext()

function Store({ children }) {
  const [state, setState] = useState({
    dictionaries: [],
    dictionary: null,
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

  return (
    <Context.Provider value={{ state, dictionariesNew }}>
      {children}
    </Context.Provider>
  )
}

function useStore() {
  return useContext(Context)
}

export { useStore, Store, STATUS }
