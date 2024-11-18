import React from 'react'
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { saveEmployeeAPI } from '../services/allAPI';

const Add = () => {
  const [show, setShow] = useState(false);
  const [empDet,setEmpDet]=useState({id:"",
    username:"",
    email:"",
    status:""})
    console.log(empDet);
    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addEmployeeDetails=async()=>{
    const {id,name,email,status}=empDet
    if(id,name,email,status){
      try{
        const result=await saveEmployeeAPI(empDet)
        console.log(result);
        handleClose()
        alert("Employee added succesfully")
      }
      catch(err){
          console.log(err);
      }
      
    }
    else{
      alert("Fill the form completely!!")
    }
      
  }

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* id */}
        <Form.Label htmlFor="id">ID</Form.Label>
      <Form.Control
        type="text"
        id="id"
        aria-describedby="passwordHelpBlock"
        onChange={e=>setEmpDet({...empDet,id:e.target.value})}
      />
      {/* username */}
       <Form.Label htmlFor="name">User Name</Form.Label>
      <Form.Control
        type="text"
        id="name"
        aria-describedby="passwordHelpBlock"
        onChange={e=>setEmpDet({...empDet,username:e.target.value})}
      />
      {/* email */}
       <Form.Label htmlFor="id">Email</Form.Label>
      <Form.Control
        type="email"
        id="id"
        aria-describedby="passwordHelpBlock"
        onChange={e=>setEmpDet({...empDet,email:e.target.value})}
      />
      {/* status */}
      <Form.Label htmlFor="id">Status</Form.Label>
      <Form.Select onChange={e=>setEmpDet({...empDet,status:e.target.value})} id='status' aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="warning" onClick={addEmployeeDetails}>Add</Button>
        </Modal.Footer>
      </Modal>

    <h1 className='text-danger text-center m-5 fw-bolder'>Employee Details</h1>
    <div className='d-flex justify-content-center p-2 m-3'>
        <button  onClick={handleShow} className='btn btn-warning fw-bolder'>Add New Employee</button>
    </div>
    </>
  )
}

export default Add