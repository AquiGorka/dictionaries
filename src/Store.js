import React, { useState, useContext } from 'react'

const Context = React.createContext()

function Store({ children }) {
  const [state, setState] = useState({
    dictionaries: [],
    dictionary: null
  })

  return <Context.Provider value={{ state }}>{children}</Context.Provider>
}

function useStore() {
  return useContext(Context)
}

export { useStore, Store }
