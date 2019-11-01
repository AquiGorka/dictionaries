import React, { useEffect, useState, useContext } from 'react'
import uuid from 'uuid/v4'

const DICTIONARIES = 'dictionaries'
const STATUS = {
  EMPTY: 'empty',
  OK: 'ok',
  DUPLICATE: 'duplicate',
  FORK: 'fork',
  CYCLE: 'cycle',
  CHAIN: 'chain',
  NEW: 'new',
}

function compareLowerCase(str1, str2) {
  return str1.toLowerCase() === str2.toLowerCase()
}

function isThisACycle(item, arr) {
  const loop = arr.find(i => compareLowerCase(item.range, i.domain))
  if (!loop) {
    return false
  }
  if (compareLowerCase(loop.range, item.domain)) {
    return true
  }
  return isThisACycle(loop, arr)
}

function computeDictionaryStatus(rows) {
  // duplicates

  // forks

  // cycles

  // chains

  return STATUS.OK
}

function updateRowsStatus(arr) {
  return arr.map(item => ({
    ...item,
    rows: item.rows.map((row, _, rows) => ({
      ...row,
      rowStatus: computeRowStatus(row, rows),
    })),
  }))
}

function computeRowStatus(row, rows) {
  // this is the only item
  if (rows.length === 1) {
    return STATUS.OK
  }
  // duplicate
  if (
    rows.find(
      r =>
        r.rowId !== row.rowId &&
        compareLowerCase(r.domain, row.domain) &&
        compareLowerCase(r.range, row.range),
    )
  ) {
    return STATUS.DUPLICATE
  }
  // fork
  if (
    rows.find(
      r => r.rowId !== row.rowId && compareLowerCase(r.domain, row.domain),
    )
  ) {
    return STATUS.FORK
  }
  // cycle
  if (isThisACycle(row, rows)) {
    return STATUS.CYCLE
  }
  // chain
  if (rows.find(r => compareLowerCase(row.range, r.domain))) {
    return STATUS.CHAIN
  }
  // ok
  return STATUS.OK
}

const Context = React.createContext()

function Store({ children }) {
  const [dictionaries, setDictionaries] = useState([])
  const [dictionary, setDictionary] = useState(null)

  const dictionariesNew = name => {
    const newDictionary = {
      id: uuid(),
      name,
      status: STATUS.EMPTY,
      rows: [],
    }
    setDictionaries([...dictionaries, newDictionary])
  }

  const dictionariesDelete = id => {
    setDictionaries(dictionaries.filter(d => d.id !== id))
  }

  const dictionarySet = id => {
    const item = dictionaries.find(d => d.id === id)
    if (!item) {
      return
    }
    setDictionary(item)
  }

  const dictionaryUnset = () => {
    setDictionary(null)
  }

  const dictionaryRowsNew = (id, row) => {
    if (!dictionary) {
      throw new Error('A dictionary has not been selected')
    }

    const rowId = uuid()
    const rowStatus = STATUS.NEW
    const newRow = { ...row, rowId, rowStatus }
    const updatedDictionary = {
      ...dictionary,
      rows: [...dictionary.rows, newRow],
    }
    const updatedDictionaries = dictionaries.map(
      d => (d.id === id ? updatedDictionary : d),
    )
    const updatedDictionariesWithUpdatedRows = updateRowsStatus(
      updatedDictionaries,
    )
    setDictionaries(updatedDictionariesWithUpdatedRows)

    // side effect: update current
    setDictionary(updatedDictionary)
  }

  const dictionaryRowsDelete = (id, rowId) => {
    if (!dictionary) {
      throw new Error('A dictionary has not been selected')
    }

    const updatedDictionary = {
      ...dictionary,
      rows: [...dictionary.rows.filter(r => r.rowId !== rowId)],
    }
    const updatedDictionaries = dictionaries.map(
      d => (d.id === id ? updatedDictionary : d),
    )
    const updatedDictionariesWithUpdatedRows = updateRowsStatus(
      updatedDictionaries,
    )
    setDictionaries(updatedDictionariesWithUpdatedRows)

    // side effect: update current
    setDictionary(updatedDictionary)
  }

  const dictionaryRowsEdit = (id, rowId, row) => {
    if (!dictionary) {
      throw new Error('A dictionary has not been selected')
    }

    const updatedDictionary = {
      ...dictionary,
      rows: [
        ...dictionary.rows.map(r => (r.rowId !== rowId ? r : { ...r, ...row })),
      ],
    }
    const updatedDictionaries = dictionaries.map(
      d => (d.id === id ? updatedDictionary : d),
    )
    const updatedDictionariesWithUpdatedRows = updateRowsStatus(
      updatedDictionaries,
    )
    setDictionaries(updatedDictionariesWithUpdatedRows)

    // side effect: update current
    setDictionary(updatedDictionary)
  }

  const dictionaryUpdateStatus = () => {
    let newStatus = STATUS.EMPTY
    const { rows } = dictionary

    if (rows.length) {
      newStatus = computeDictionaryStatus()
    }

    if (dictionary.status === newStatus) {
      return
    }

    //setDictionary(updatedDictionary)
    //setDictionaries(
    //dictionaries.map(d => (d.id === id ? updatedDictionary : d)),
    //)
  }

  // when rows change update status
  useEffect(
    () => {
      //dictionaryUpdateStatus()
    },
    [dictionary],
  )

  // one time: load local storage data
  useEffect(() => {
    const data = localStorage.getItem(DICTIONARIES)
    try {
      if (data) {
        const parsedData = JSON.parse(data) || []
        if (!parsedData.length) {
          return
        }
        setDictionaries(parsedData)
      }
    } catch (e) {
      console.warn(
        'There was an error reading/parsing the data from local storage',
      )
    }
  }, [])

  // when dictionaries changes persist data to local storage
  useEffect(
    () => {
      localStorage.setItem(DICTIONARIES, JSON.stringify(dictionaries))
    },
    [dictionaries],
  )

  return (
    <Context.Provider
      value={{
        dictionary,
        dictionaries,
        dictionariesNew,
        dictionariesDelete,
        dictionarySet,
        dictionaryUnset,
        dictionaryRowsNew,
        dictionaryRowsDelete,
        dictionaryRowsEdit,
      }}
    >
      {children}
    </Context.Provider>
  )
}

function useStore() {
  return useContext(Context)
}

export { useStore, Store, STATUS }
