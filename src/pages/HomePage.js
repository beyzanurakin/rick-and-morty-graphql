import { useQuery } from '@apollo/client'
import { GET_CHARACTERS_QUERY } from '../graphql/Queries'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Filters from '../components/Filters'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'

const HomePage = () => {
  const [show, setShow] = useState(false)
  const [filteredName, setFilteredName] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page: 1, name: filteredName },
  })

  const fetchMoreData = () => {
    console.log(data.characters.info.next)
    fetchMore({
      variables: {
        page: data.characters.info.next,
      },
      updateQuery: (prevPage, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevPage
        }
        return {
          characters: {
            __typename: 'Characters',
            info: {
              __typename: 'Info',
              ...prevPage.characters.info,
              ...fetchMoreResult.characters.info,
            },
            results: [
              ...prevPage.characters.results,
              ...fetchMoreResult.characters.results,
            ],
          },
        }
      },
    })
  }
  if (loading) return <h1>loading</h1>
  if (error) return <h1>loading</h1>
  console.log()
  return (
    <>
      <Container>
        <InfiniteScroll
          dataLength={data.characters.results.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row>
            <div>
              {filteredName && <h1>{filteredName}</h1>}
              <Button variant='primary' onClick={handleShow}>
                Rick Or Morty
              </Button>
            </div>

            <Filters
              show={show}
              handleClose={handleClose}
              filteredName={filteredName}
              setFilteredName={setFilteredName}
            />
            {data.characters.results.map((character) => {
              return (
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Card
                    className='my-3 rounded d-flex text-center align-items-center shadow p-3 mb-5 bg-white rounded'
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
          </Row>
        </InfiniteScroll>
      </Container>
    </>
  )
}

export default HomePage
