import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useStore } from '../Store'
import {
  Button,
  DeleteButton,
  Input,
  Section,
  Ul,
} from '../components/BaseElements'

function useDictionaries() {
  const { dictionaries, dictionariesNew, dictionariesDelete } = useStore()
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
    <Section>
      <NewDictionary onNew={onNew} />
      {!!dictionaries.length && (
        <Ul>
          {dictionaries.map(item => (
            <Item key={item.id} {...item} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </Ul>
      )}
    </Section>
  )
}

function Item({ id, name, consistent, onDelete }) {
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete])

  return (
    <Li consistent={consistent}>
      <Name as={Link} to={`/${id}`}>
        {name}
      </Name>
      {!consistent && (
        <Warning>
          <span role="img" aria-label="warning">
            ⚠️
          </span>
        </Warning>
      )}
      <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
    </Li>
  )
}

const Li = styled.li`
  display: grid;
  grid-template-columns: ${({ consistent }) =>
    consistent ? '1fr auto' : '1fr auto auto'};
  grid-gap: 8px;
  align-items: center;
  padding: 0 8px;
`

const Name = styled.div`
  padding: 24px 0;
  padding-left: 8px;

  @media (min-width: 640px) {
    padding-left: 0;
  }
`

const Warning = styled.span`
  height: 40px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`

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
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="New dictionary name"
        required
        value={name}
        onChange={handleNameChange}
      />
      <Button>Add</Button>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 16px;
  padding: 8px;

  @media (min-width: 640px) {
    padding: 0;
  }
`

export default Dictionaries
