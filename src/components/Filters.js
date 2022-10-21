import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

const Filters = ({ handleClose, show, filteredName, setFilteredName }) => {
  const handleChange = (e) => {
    e.preventDefault()
    setFilteredName(e.target.value)
  }
  return (
    <Modal show={show} onHide={handleClose} className='fs-3'>
      <Modal.Header closeButton>Filter</Modal.Header>
      <button onClick={() => setFilteredName('')}>Clean Filter</button>
      <Modal.Body>
        <Form onChange={(e) => setFilteredName(e.target.value)}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Check type='radio' name='group' value='rick' label='Rick' />
            <Form.Check type='radio' name='group' value='morty' label='Morty' />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Filters
