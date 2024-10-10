import {
  Box,
  Typography,
} from "@mui/material";
import { setWordCase } from "../../assets/library";
// import { switchStudentActivity } from "../../services";
import { useAppDispatch, } from "../../assets/hooks";
import { setPopup } from "../../store/slices/popupSlice";
import CustomCard from "../../components/customCard";
import { useNavigate } from "react-router-dom";

export const StudentName = (props: any) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  // console.log(props)
  const handleClick = () => {
    navigate(`/?s=${props?.id}&p=true`)
    dispatch(
      setPopup({
        show: true,
        data: {
          container: {
            name: "singleUser",
            data: props?.id,
            dimensions: {
              width: "500px",
            },
          },
          type: "custom",
        },
      }))

  };
  return (
    <div>
      <Box
        sx={{ display: "flex", gap: "20px", alignItems: "center", cursor: "pointer" }}
        onClick={handleClick}
      >
        {props?.name}
      </Box>
    </div>
  );
};

export const Email = (props: any) => {
  return (
    <div>
      <Typography
        fontSize="14px"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {props?.email}

      </Typography>
    </div>
  );
};
export const Phone = (props: any) => {

  return (
    <div>
      <Typography
        fontSize="14px"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {`${props.phone?.countryCode ? props.phone?.countryCode : ""} ${props.phone?.number ? props.phone?.number : "N/A"
          } `}

      </Typography>
    </div>
  );
};

export const UserCard = (props: any) => {
  return (
    <div>
      <CustomCard>
        <div>
          <Typography>Name:User</Typography>
        </div>
      </CustomCard>
    </div>
  )
}

export const ParticipantCard = (props: any) => {
  // const memberId = localStorage.getItem("memberId");
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  const memberId = localStorage.getItem("memberId")
  const filteredParticipants = props.data?.participants.filter(
    (participant: any) => participant._id !== memberId
  );
  const participant = filteredParticipants[0]

  const handleClick = () => {
    navigate(`/?s=${participant._id}&p=true`)
    dispatch(
      setPopup({
        show: true,
        data: {
          container: {
            name: "singleUser",
            data: participant._id,
            dimensions: {
              width: "500px",
            },
          },
          type: "custom",
        },
      }))

  }
  return (
    <div >
      <CustomCard >
        <div onClick={handleClick}>
          <Typography sx={{ fontSize: "0.8rem" }}>
            {participant?.name}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column",
          "& .MuiTypography-root":{
            fontSize:"0.8rem !important" 
          }
            }}>
              <Typography>{participant?.institutionName}</Typography> 
              <Typography>{participant?.role}</Typography>
              <Typography>{participant?.boothNumber}</Typography>
            </Box>
          <Typography variant="body2" color="textSecondary">

            {role === "Admin" ? "" :
              <Box sx={{}}>
                {
                  props.data?.details && Object.entries(props.data?.details).map(([key, value]: [string, any]) => (
                    <div key={key}>
                      {setWordCase(key)}: {value}
                      <br />
                    </div>
                  ))
                }
              </Box>}

          </Typography>
          <Typography>{participant?.city}</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", fontSize: "0.8rem", alignItems: "center", gap: "0.5rem" }}>
            <Typography sx={{ fontSize: "0.9rem" }}>Degree : </Typography>
            <Box sx={{}}>
              {participant?.degree},
              {participant?.college},
              {participant?.gradepercentage},
              {participant?.graduation}
            </Box>
          </Box>
        </div>
      </CustomCard>
    </div>
  );
};
