import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useStore } from '../Store'

function useDictionary() {
  const { id } = useParams()
  const { dictionariesGet } = useStore()
  const [dictionary, setDictionary] = useState(null)
  const [error, setError] = useState(false)

  useEffect(
    () => {
      try {
        const dictionary = dictionariesGet(id)
        setDictionary(dictionary)
      } catch (err) {
        setError(true)
      }
    },
    [id, dictionariesGet],
  )

  return { dictionary, error }
}

function Dictionary() {
  const { error, dictionary } = useDictionary()

  if (error) {
    return (
      <section>
        <p>Dictionary does not exist</p>
        <Link to="/">Go back to dictionaries</Link>
      </section>
    )
  }

  return (
    <section>
      <Link to="/">Dictionaries</Link>
    </section>
  )
}

export default Dictionary
