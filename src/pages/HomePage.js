import { useQuery } from '@apollo/client'
import { GET_CHARACTERS_QUERY } from '../graphql/Queries'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Filters from '../components/Filters'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Container } from 'react-bootstrap'

const HomePage = () => {
  const [show, setShow] = useState(false)
  const [page, setPage] = useState(1)

  const [filteredName, setFilteredName] = useState('')
  console.log(filteredName)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { loading, error, data } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page: page, name: filteredName },
  })

  const handleScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setPage((oldPage) => oldPage + 1)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading</h1>
  return (
    <>
      <Container>
        <Row>
          <Button variant='primary' onClick={handleShow}>
            Rick Or Morty
          </Button>
          <Filters
            show={show}
            handleClose={handleClose}
            filteredName={filteredName}
            setFilteredName={setFilteredName}
          />
          {data.characters.results.map((character) => {
            return (
              <Col xs={12} sm={12} md={4} lg={4} xl={4} key={character.id}>
                <Card
                  className='my-3 p-3 rounded d-flex text-center align-items-center shadow p-3 mb-5 bg-white rounded'
                  style={{ border: 'none' }}
                >
                  <Card.Img variant='top' src={character.image} />
                  <Card.Body>
                    <Card.Title>
                      <b> Name: </b>
                      {character.name}
                    </Card.Title>
                    <Card.Text>
                      <b> Location: </b>
                      {character.location.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
          <button
            onClick={() => {
              setPage((oldPage) => {
                return oldPage + 1
              })
            }}
          >
            load more
          </button>
        </Row>
      </Container>
    </>
  )
}

export default HomePage
