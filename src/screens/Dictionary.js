import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../Store'

function useDictionary() {
  const { id } = useParams()
  const {
    state: { dictionaries },
    dictionariesGet,
  } = useStore()
  const [dictionary, setDictionary] = useState(null)

  useEffect(
    () => {
      setDictionary(dictionariesGet(id))
    },
    [id, dictionariesGet, dictionaries],
  )

  return { dictionary }
}

function Dictionary() {
  const { dictionary } = useDictionary()

  if (!dictionary) {
    return (
      <section>
        <p>Dictionary does not exist</p>
        <Link to="/">Go back to dictionaries</Link>
      </section>
    )
  }
  const { id, name, status } = dictionary

  return (
    <section>
      <Link to="/">Dictionaries</Link>
      <div>
        <div>{id}</div>
        <div>{name}</div>
        <div>{status}</div>
      </div>
    </section>
  )
}

export default Dictionary
