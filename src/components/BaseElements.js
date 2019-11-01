import styled from 'styled-components'

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  min-width: 50px;
`

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  & li:nth-child(2n + 1) {
    background: #fafafa;
  }

  @media (min-width: 640px) {
    border: 1px solid #eee;
  }
`

const Button = styled.button`
  border-radius: 4px;
  padding: 8px
  border: 1px solid #45b748;
  color: #45b748;
  background: white;
  cursor: pointer;
  font-size: 14px;
`

const DeleteButton = styled(Button)`
  font-size: 12px;
  height: 40px;
  color: white;
  border: 1px solid rgba(167, 40, 40, 0.4);
  color: rgba(167, 40, 40, 0.6);
  background: white;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Section = styled.section`
  display: grid;
  grid-gap: 16px;
`

const Breadcrumbs = styled.div`
  padding-left: 8px;
  font-weight: bold;
  word-break: break-all;

  @media (min-width: 640px) {
    padding-left: 0;
  }
`

export { Ul, Input, Button, DeleteButton, Section, Breadcrumbs }
