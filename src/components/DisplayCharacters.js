// import React from 'react'
// import { useQuery } from '@apollo/client'
// import Card from 'react-bootstrap/Card'
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import { Container } from 'react-bootstrap'

// function DisplayCharacters() {
//   const { loading, error, data } = useQuery(GET_CHARACTERS)
//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error :(</p>
//   console.log(data)

//   return (
//     <Container>
//       <Row>
//         {data.characters.results.map((character) => {
//           return (
//             <Col xs={12} sm={12} md={4} lg={4} xl={4} key={character.id}>
//               <Card
//                 className='my-3 p-3 rounded text-center align-items-centershadow p-3 mb-5 bg-white rounded'
//                 style={{ border: 'none' }}
//               >
//                 <Card.Img variant='top' src={character.image} />
//                 <Card.Body>
//                   <Card.Title>
//                     <b> Name: </b>
//                     {character.name}
//                   </Card.Title>
//                   <Card.Text>
//                     <b> Location: </b>
//                     {character.location.name}
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           )
//         })}
//       </Row>
//     </Container>
//   )
// }

// export default DisplayCharacters
