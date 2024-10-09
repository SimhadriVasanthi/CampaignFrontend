import React, { useEffect, useState } from 'react'
import Section2 from './section2'
import SingleUser from '../singleUser'
import { Box, CircularProgress, Divider, Typography } from '@mui/material'
import { getParticipantDetails } from '../../../services'

const Section1 = (data: any) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "rgb(244, 244, 255)", padding: "10px", borderRadius: "10px" }}>
      <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>{data?.data?.name}</Typography>
      <Typography fontWeight="500">{data?.data?.about}</Typography>
      <Typography>{data?.data?.city}</Typography>
    </div>
  )
}

const Index = (props: any) => {
  const pId = props.data;
  const [participant, setParticipant] = useState<any>()
  const [vist, setVisit] = useState<any>()
const role = localStorage.getItem("role")
  const [loading, setLoading] = useState(false)

  const partcipantDetails = async (id: string) => {
    setLoading(true)
    try{
    const response = await getParticipantDetails(id);
    if (response) {
      setParticipant(response.data.data)
      setVisit(response.data?.AlreadyVisitedDetails)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }catch(err){
    setLoading(false)
  }
  }

  useEffect(() => {
    if (pId !== null) {
      partcipantDetails(pId)
    }
  }, [pId])

  return (
    <div>
      {loading ?
        <Box sx={{ height: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box> :
        <>
          <Section1 data={participant} />
          <Divider sx={{ my: 2 }} />
          <Section2 data={participant} />
          { role === "Admin"? "" :
          <Box>
          <Divider sx={{ my: 2 }} />
          <SingleUser data={vist} id={participant?._id} />
          </Box> }
          
        </>}

    </div>
  )
}

export default Index