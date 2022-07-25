import React from 'react'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
`

export default function Home() {
  return (
    <Container>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
    </Container>
  )
}
