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

//     return(
//         <div className='container fixed-top d-flex-justify-content-between'>
//             {modalopen ? <Modal/> : ""}
//             <h2 className='text-center '>Slot Allocation</h2>

//             { slots.map((data,index) => {
//                 return(
//                     <> { 
//                     data.company_name ? <div key={index} className='bg-dark'>
//                         <Container>
//                             <Row md={5}>
//                                 <span>{data.company_name}</span>
//                                 </div> : 
//                                 <Col className='bg-success mt-5 py-5 mx-5 text-center'><button className='btn btn-dark '>Allocate</button></Col>
//                             </Row>
//                         </Container> 
//                     </>
//                     }
//             )
//             })}
            
//             </div>
//     )

//     function Modal() {
//         return (
//             <div> <p>HI</p></div>
//         )
//     }
// }


return (
    <div className='w-full'>
     
      {modalopen ? <Modal ></Modal>:"" }
        <div className='w-full flex justify-center p-8'>
            <span className='text-5xl font-bold'>Assign Slots</span>
        </div>
        <div className='w-full border-2 p-8'>
        <div className=' border-2 p-4  grid grid-cols-5  auto-cols-max gap-2 place-items-center'>
 
            
{
    slots.map((data,index)=>{
        return(
<>
{
    data.company_name ? <div key={index} className="w-40 h-40  flex flex-col justify-center items-center bg-green-300 border-2 border-skyblue-800">
        <span className='text-lg'>Booked for:</span>
        <span> {data.company_name}</span>
       
    </div> : <div key={index} onClick={()=>{
                console.log("clicked")
                console.log(data.id)
                setOpenslot(data.id)
                setModalopen(true)
            }} className='w-40 h-40  grid place-items-center bg-skyblue-400 border-2 border-skyblue-800'>

 <span>Available
    <br></br>

   
 
</span>


            </div>
}



</>



        )
    })
}
            </div>

        </div>
    </div>
  )

  function Modal(){
    return(
        <div className='w-full flex justify-center  absolute'>
        <div className='h-screen w-full bg-[#000000cf] grid place-items-center'>
        <div className='w-96 h-96 bg-white p-4'>
        <div className=' text-4xl flex justify-end'>
        <i className="fa-solid fa-xmark" onClick={()=>{
            setModalopen(false)
        }}></i>
        </div>
        <div className=' text-4xl mb-4'>
            Assign this slot to:
            </div>
            <form onSubmit={slotAssign}>

         
        <div className='  w-full h-16'>
            <select onChange={(e)=>{
                console.log(e.target.value)
                setSelectedco(e.target.value)
            }} className='w-full h-full border-2'>
                <option value="">Select a compnay</option>
                {approvedco.map((data,index)=>{
                    return(<option key={index} value={data.company_name}>{data.company_name}</option>)
                })}
               
            </select>
        </div>
        <div className=' text-4xl flex justify-end'>
       <button className='bg-skyblue-800 hover:bg-sky-900 py-2 my-3 rounded-full shadow-xl md:mr-2'>
        <span className='mx-8 text-white'>Submit</span></button>
        </div>
        </form>
        </div>
        </div>
    </div>
    )
  }
}
export default Slot