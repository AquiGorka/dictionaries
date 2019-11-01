import React, { useCallback, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../Store'

function useDictionary() {
  const { id } = useParams()
  const {
    dictionaries,
    dictionary,
    dictionarySet,
    dictionaryUnset,
    dictionaryRowsNew,
    dictionaryRowsDelete,
    dictionaryRowsEdit,
  } = useStore()
  const handleNewRow = useCallback(row => dictionaryRowsNew(id, row), [
    dictionaryRowsNew,
    id,
  ])
  const handleDeleteRow = useCallback(
    rowId => dictionaryRowsDelete(id, rowId),
    [dictionaryRowsDelete, id],
  )
  const handleEditRow = useCallback(
    (rowId, row) => dictionaryRowsEdit(id, rowId, row),
    [dictionaryRowsEdit, id],
  )

  useEffect(
    () => {
      dictionarySet(id)
    },
    [id, dictionarySet, dictionaries],
  )

  // unmount
  useEffect(() => () => dictionaryUnset(), [dictionaryUnset])

  return {
    dictionary,
    onNewRow: handleNewRow,
    onDeleteRow: handleDeleteRow,
    onEditRow: handleEditRow,
  }
}

function Dictionary() {
  const { dictionary, onNewRow, onDeleteRow, onEditRow } = useDictionary()

  if (!dictionary) {
    return (
      <section>
        <p>Dictionary does not exist</p>
        <Link to="/">Go back to dictionaries</Link>
      </section>
    )
  }
  const { id, name, consistent, rows } = dictionary

  return (
    <section>
      <Link to="/">Dictionaries</Link>
      <div>
        <div>{id}</div>
        <div>{name}</div>
        <div>Consistent: {consistent ? 'yes' : 'no'}</div>
      </div>
      <NewRow onNew={onNewRow} />
      <ul>
        {rows.map((item, index) => (
          <Item
            key={index}
            {...item}
            onEdit={onEditRow}
            onDelete={onDeleteRow}
          />
        ))}
      </ul>
    </section>
  )
}

function Item({ onEdit, onDelete, domain, range, rowId, rowStatus }) {
  const handleDomainChange = useCallback(
    ({ currentTarget: { value } }) => {
      onEdit(rowId, { domain: value, range })
    },
    [range, onEdit, rowId],
  )
  const handleRangeChange = useCallback(
    ({ currentTarget: { value } }) => {
      onEdit(rowId, { domain, range: value })
    },
    [domain, onEdit, rowId],
  )
  const handleDelete = useCallback(
    () => {
      onDelete(rowId)
    },
    [onDelete, rowId],
  )

  return (
    <li>
      <div>{rowId}</div>
      <div>{rowStatus}</div>
      <div>
        Domain: <input value={domain} onChange={handleDomainChange} />
      </div>
      <div>
        Range: <input value={range} onChange={handleRangeChange} />
      </div>
      <div>
        <button onClick={handleDelete}>delete</button>
      </div>
    </li>
  )
}

function NewRow({ onNew }) {
  const [domain, setDomain] = useState('')
  const [range, setRange] = useState('')
  const handleDomainChange = useCallback(({ currentTarget: { value } }) => {
    setDomain(value)
  }, [])
  const handleRangeChange = useCallback(({ currentTarget: { value } }) => {
    setRange(value)
  }, [])
  const handleSubmit = useCallback(
    ev => {
      ev.preventDefault()
      if (!domain.trim() && !range.trim()) {
        return
      }
      onNew({ domain, range })
      setDomain('')
      setRange('')
    },
    [domain, range, onNew],
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New domain"
        required
        value={domain}
        onChange={handleDomainChange}
      />
      <input
        placeholder="New range"
        required
        value={range}
        onChange={handleRangeChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}
export default Dictionary
