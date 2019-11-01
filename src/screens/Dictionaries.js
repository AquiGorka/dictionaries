import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useStore } from '../Store'
import { Ul, Input, Button } from '../components/BaseElements'

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
      <List>
        {dictionaries.map(item => (
          <Item key={item.id} {...item} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </List>
    </Section>
  )
}

const Section = styled.section`
  display: grid;
  grid-gap: 16px;
`

const List = styled(Ul)`
  & li:nth-child(2n + 1) {
    background: #fafafa;
  }

  @media (min-width: 640px) {
    border: 1px solid #eee;
  }
`

function Item({ id, name, consistent, onDelete }) {
  const handleDelete = useCallback(() => onDelete(id), [id, onDelete])

  return (
    <Li consistent={consistent}>
      <Name as={Link} to={`/${id}`}>
        {name}
      </Name>
      {!consistent && <NotConsistent />}
      <Remove onClick={handleDelete}>-</Remove>
    </Li>
  )
}

const Name = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 24px 0;
`

const Li = styled.li`
  display: grid;
  grid-template-columns: ${({ consistent }) =>
    consistent ? '1fr auto' : '1fr auto auto'};
  grid-gap: 8px;
  align-items: center;
  padding: 0 8px;
`

const Remove = styled(Button)`
  height: 40px;
  width: 40px;
  color: white;
  border: 1px solid rgba(167, 40, 40, 0.4);
  color: rgba(167, 40, 40, 0.4);
  background: transparent;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  line-height: 0px;
`

function NotConsistent() {
  return (
    <Error>
      <Cross>x</Cross>
      <Info>Errors</Info>
    </Error>
  )
}

const Error = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 40px;
  border: 1px solid #eee;
  align-items: center;
  justify-content: center;
  color: #AAA;
`

const Cross = styled.div`
  font-size: 20px;
`

const Info = styled.div`
  font-size: 10px;
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
      <Button>Add new dictionary</Button>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 16px;
  padding: 4px;

  @media (min-width: 640px) {
    padding: 0;
  }
`

export default Dictionaries
