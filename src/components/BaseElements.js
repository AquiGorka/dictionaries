import styled from 'styled-components'

const Input = styled.input`
  padding: 8px;
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
  border: 1px solid #719fce;
  background: rgba(113, 159, 206, 0.3);
  cursor: pointer;
`

const DeleteButton = styled(Button)`
  height: 40px;
  width: 40px;
  color: white;
  border: 1px solid rgba(167, 40, 40, 0.4);
  color: rgba(167, 40, 40, 0.6);
  background: transparent;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  line-height: 0px;
`

const Section = styled.section`
  display: grid;
  grid-gap: 16px;
`

export { Ul, Input, Button, DeleteButton, Section }
