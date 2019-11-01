import React, { useState, useCallback } from 'react'
import { useStore } from '../Store'

function useDictionaries() {
  const {
    state: { dictionaries },
    dictionariesNew,
    dictionariesDelete,
  } = useStore()
  const onEdit = () => null
  return {
    dictionaries,
    onNew: dictionariesNew,
    onDelete: dictionariesDelete,
    onEdit,
  }
}

function Dictionaries() {
  const { dictionaries, onNew, onDelete, onEdit } = useDictionaries()

  return (
    <section>
      <NewDictionary onNew={onNew} />
      <ul>
        {dictionaries.map(item => (
          <Item key={item.id} {...item} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </ul>
    </section>
  )
}

function Item({ id, name, status, onDelete }) {
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete])

  return (
    <li>
      <div>{id}</div>
      <div>{name}</div>
      <div>{status}</div>
      <div>edit</div>
      <div>
        <button onClick={handleDelete}>X</button>
      </div>
    </li>
  )
}

function NewDictionary({ onNew }) {
  const [name, setName] = useState('')
  const handleNameChange = useCallback(
    ({ currentTarget: { value } }) => {
      setName(value)
    },
    [setName],
  )
  const handleSubmit = useCallback(
    ev => {
      ev.preventDefault()
      if (!name.trim()) {
        return
      }
      onNew(name)
      setName('')
    },
    [name, onNew],
  )

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New name"
        required
        value={name}
        onChange={handleNameChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default Dictionaries
