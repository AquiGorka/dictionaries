import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, Link } from 'react-router-dom'
import { useStore, STATUS } from '../Store'
import {
  Button,
  DeleteButton,
  Input,
  Section,
  Ul,
} from '../components/BaseElements'

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
  const { name, consistent, rows } = dictionary

  return (
    <Section>
      <Link to="/">/Dictionaries</Link>
      <div>
        <div>{name}</div>
      </div>
      <NewRow onNew={onNewRow} />
      {!!rows.length && (
        <Ul>
          {rows.map((item, index) => (
            <Item
              key={index}
              {...item}
              onEdit={onEditRow}
              onDelete={onDeleteRow}
            />
          ))}
        </Ul>
      )}
    </Section>
  )
}

const Info = styled.div`
  color: rgb(167, 40, 40);
  font-size: 12px;
`

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
    <Li error={rowStatus !== STATUS.OK}>
      <Label>
        <Type>Domain</Type>
        <Field value={domain} onChange={handleDomainChange} />
      </Label>
      <Label>
        <Type>Range</Type>
        <Field value={range} onChange={handleRangeChange} />
      </Label>
      <div>
        <Error>{rowStatus}</Error>
      </div>
      <div>
        <DeleteButton onClick={handleDelete}>-</DeleteButton>
      </div>
    </Li>
  )
}

const Li = styled.li`
  display: grid;
  grid-template-columns: ${({ error }) =>
    error ? '1fr 1fr auto auto' : '1fr 1fr auto auto'};
  grid-gap: 8px;
  align-items: center;
  padding: 0 8px;
`

const Label = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
`

const Field = styled.input`
  border: none;
  background: none;
  border-bottom: 1px solid #ccc;
  padding: 4px;
`

const Type = styled.div`
  font-size: 12px;
  color: #ccc;
`

const Error = styled.div`
  border-radius: 4px;
  user-select: none;
  display: flex;
  flex-direction: column;
  height: 40px;
  width: 40px;
  border: 1px solid #eee;
  align-items: center;
  justify-content: center;
  border: #aaa;
  color: #bbb;
`

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
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Domain"
        required
        value={domain}
        onChange={handleDomainChange}
      />
      <Input
        placeholder="Range"
        required
        value={range}
        onChange={handleRangeChange}
      />
      <Button type="submit">Add new row</Button>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  grid-gap: 16px;
  padding: 4px;

  @media (min-width: 640px) {
    padding: 0;
  }
`

export default Dictionary
