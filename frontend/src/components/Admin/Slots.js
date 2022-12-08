import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




function Slot(){
    const [modalopen , setModalopen] = useState(false)
    const [slots , setSlots]         = useState([])
    const [approvedco, setApprovedco]= useState([])
    const [openslot, setOpenslot]    = useState("")
    const [selectedco, setSelectedco]= useState("")
    const [reloader, setReloader]    = useState(true)


    useEffect(() => {
        getSlots();
        getApprovedCompany();
    }, [reloader])

    async function getSlots() {
        await axios.post("http://127.0.0.1:8000/allSlots").then((response) => {
            setSlots(response.data)
        }).catch((error) => {})
    }
    async function getApprovedCompany(){
        await axios.get('http://127.0.0.1:8000/viewApproved').then((response) => {
            setApprovedco(response.data)
        }).catch((error) => {})
    }
    let slotAssign = async (e) => {
        e.preventDefault()
        await axios.get(`http://127.0.0.1:8000/allocateSlot/${openslot}/${selectedco}`).then((response) =>  {
            setReloader(!reloader)
            setModalopen(false)
        }).catch((error) => {})
    }



    return(
        <div className='container fixed-top d-flex-justify-content-between'>
            {modalopen ? <Modal/> : ""}
            <h2 className='text-center '>Slot Allocation</h2>

            {/* { slot.map((data,index) => {
                return(
                    <>
                    
                    
                    </>
                )
            })} */}
            <Container>
                <Row md={4}>
                    <Col className='bg-success mt-5 py-5 mx-5 text-center'><button className='btn btn-dark '>Allocate</button></Col>
                </Row>
            </Container>
            {/* <Container>
                <Row md={4}>
                    <Col className='bg-success mt-5 py-5 mx-5 text-center'><button className='btn btn-dark '>Allocate</button></Col>
                </Row>
            </Container>
            <Container>
                <Row md={4}>
                    <Col className='bg-success mt-5 py-5 mx-5 text-center'><button className='btn btn-dark '>Allocate</button></Col>
                </Row>
            </Container> */}
            </div>
    )

    function Modal() {
        return (
            <div> <p>HI</p></div>
        )
    }
}

export default Slot