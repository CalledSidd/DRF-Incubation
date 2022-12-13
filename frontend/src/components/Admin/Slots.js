import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function Slot() {
  const [modalopen, setModalopen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [approvedco, setApprovedco] = useState([]);
  const [openslot, setOpenslot] = useState("");
  const [selectedco, setSelectedco] = useState("");
  const [reloader, setReloader] = useState(true);

  useEffect(() => {
    getSlots()
    getApprovedCompany()
  }, [reloader])

  async function getSlots() {
    await axios
      .get("http://127.0.0.1:8000/allSlots")
      .then((response) => {
        console.log(response)
        setSlots(response.data)
      })
      .catch((error) => {})
  }
  async function getApprovedCompany() {
    await axios
      .get("http://127.0.0.1:8000/approvedCompanies")
      .then((response) => {
        setApprovedco(response.data)
      })
      .catch((error) => {})
  }
  let slotAssign = async (e) => {
    e.preventDefault()
    await axios
      .get(`http://127.0.0.1:8000/allocateSlot/${openslot}/${selectedco}`)
      .then((response) => {
        setReloader(!reloader)
        setModalopen(false)
      })
      .catch((error) => { })
  };

  return (
    <div className="container fixed-top ">
      {modalopen ? <ViewApp></ViewApp> : ""}
      <h2 className="text-center ">Slot Allocation</h2>
      <div className="row px-5">
        
          {slots.map((data, index) => {
            return (
              <>
                <Container className="col-md-4 ">
                  <Row md={8}>
                    <Col className="bg-dark mt-5 py-5 mx-5 text-center">
                      {data.company_name ? (
                        <button key={index} className="btn btn-success">
                          {data.company_name}
                        </button>
                      ) : (
                        <button
                          key={index}
                          onClick={() => {
                            console.log("Clicked")
                            setOpenslot(data.id)
                            setModalopen(true)
                          }}
                          className="btn btn-primary"
                        >
                          Allocate
                        </button>
                      )}
                    </Col>
                    <ViewApp
                      show={modalopen}
                      onHide={() => setModalopen(false)}
                    />
                  </Row>
                </Container>
              </>
            )
          })}
        </div>
      </div>
    
  )

  function ViewApp(props) {
    return (
      <div>
        <Modal
          {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={slotAssign}>
              <select onChange={(e) => {
                setSelectedco(e.target.value)
              }}>
                <option value="">Select a company</option>
                {approvedco.map((data, index) => {
                  return (
                    <option key={openslot} value={data.company_name}>
                      {data.company_name}
                    </option>
                  )
                })}
              </select>
              <hr />
              <Button type='submit' className='btn btn-dark'>Allocate</Button>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default Slot
