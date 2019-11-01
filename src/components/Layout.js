import React from 'react'
import styled from 'styled-components'

function Layout({ children }) {
  return (
    <>
      <Header>
        <H1>Dictionary CRUD</H1>
      </Header>
      <Main>{children}</Main>
    </>
  )
}

const Header = styled.header`
  position: sticky;
  top: 0;
  background: #719fce;
  box-shadow: 0 -2px 5px 0px #efe6e6;
  padding: 12px;
`

const H1 = styled.h1`
  margin: 0;
  color: white;
`

const Main = styled.main`
  padding: 16px 0;

  @media (min-width: 640px){
    padding: 32px;
  }
`

export default Layout
