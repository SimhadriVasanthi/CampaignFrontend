/* eslint-disable */
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Email,
  ParticipantCard,
  Phone,
  StudentName,
  UserCard,
} from "./applicationData";
import { initStudentProfile } from "../../store/slices/studentsInfo";
import ReusableTable1 from "../../components/table";
import { setPopup } from "../../store/slices/popupSlice";
import { useLocation } from "react-router-dom";
import { getParticipantDetails } from "../../services";
import { setWordCase } from "../../assets/library";
import SearchIcon from '@mui/icons-material/Search';
import { initProfile } from "../../store/slices/profileInfo";

const Counsellor = () => {

  const auth = localStorage.getItem("_campaign_token")
  // const role = localStorage.getItem("role");
  const [filterData,setFilterData] = useState([])
  const [participants, setParticipants] = useState([])
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "students"
  >("students");

  const getMember = async () => {
    try {
      const response = await getParticipantDetails("", 1, 20, {
        filterData: filterData 
      });
      if (!response || !response.data || !response.data.data) {
        console.error("No valid data in response");
        return;
      }
      localStorage.setItem("memberId", response.data.data._id);
      setParticipants(response.data.data.visits)
      dispatch(
        initProfile({
          requestStatus: "initiated",
          responseStatus: "recieved",
          haveAnIssue: false,
          issue: "",
          data: response.data.data,
        })
      );
    } catch (err) {
      console.error("Error fetching participant details:", err);
    }
  };

  useEffect(() => {
    if (auth) {
      getMember()
    }
  }, [filterData])


  return (
    <Box>
      <Box
        sx={{
          background: "#3B3F76",
          padding: "8px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", gap: "15px" }}
        >
          <Button
            onClick={() => setActiveTab("students")}
            sx={{
              color: "#fff",
              borderBottom: activeTab === "students" ? "2px solid #fff" : 0,
              borderRadius: 0,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Participants
          </Button>
        </Box>
      </Box>
      <Filters filterData={filterData} setFilterData={setFilterData}/>
      <MainComponent
        activeTab={activeTab}
        students={participants}
      // users={usersData?.data}
      />
    </Box>
  );
};

export default Counsellor;

interface MainComponentProps {
  activeTab: string;
  students: any;
}
const MainComponent: React.FC<MainComponentProps> = ({
  activeTab,
  students,
}) => {

  const dispatch = useAppDispatch()
  const role = localStorage.getItem("role")
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let stdId = queryParams.get("s") || "";
  let popup = queryParams.get("p") || "";

  React.useEffect(() => {
    if (popup && stdId !== null) {
      dispatch(
        setPopup({
          show: true,
          data: {
            container: {
              name: "singleUser",
              data: stdId,
              dimensions: {
                width: "500px",
              },
            },
            type: "custom",
          },
        }))
    }
    // eslint-disable-next-line
  }, [])
  const mapStudentData = (events: any) => {
    const memberId = localStorage.getItem("memberId");
    return events?.map((event: any) => {
      const filteredParticipants = event.participants.filter(
        (participant: any) => participant._id !== memberId
      );
      const participant = filteredParticipants[0];
      return (
        {
          name: (
            <>
              <StudentName
                name={participant?.name}
                displayPicSrc={participant?.displayPicSrc}
                id={participant?._id}
                type={participant?.userType}
              />
              {role === "Admin" ? "" :
                <Box sx={{}}>
                  {
                    event?.details && Object.entries(event?.details).map(([key, value]: [string, any]) => (
                      <div key={key}>
                        {setWordCase(key)}: {value}
                        <br />
                      </div>
                    ))
                  }
                </Box>}
            </>
          ),
          city: participant?.city,
          degree: (<Box sx={{ display: "flex", flexDirection: "column" }}>
            {participant?.degree}<br />
            {participant?.college}<br />
            {participant?.gradepercentage}<br />
            {participant?.graduation}
          </Box>),
          country: (
            <ul style={{ padding: 0, paddingLeft: "20px" }}>
              {participant?.country?.length > 0
                ? participant?.country?.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
                : "N/A"}
            </ul>
          ),
          course:
            (<Box sx={{ display: "flex", flexDirection: "column" }}>
              {participant?.course}<br />
              {participant?.educationBudget}<br />
              {participant?.year}<br />
            </Box>),
          delegate:
            (<Box sx={{ display: "flex", flexDirection: "column" }}>
              {participant?.institutionName}<br />
              {participant?.role}<br />
              {participant?.boothNumber}<br />
            </Box>),
          aptitude: (<>
            {participant?.aptitude}<br />
            {participant.gre ? <Typography sx={{ fontSize: "0.85rem", }}>Gre: <b style={{ fontWeight: "500" }}>{participant.gre}</b></Typography> : ""}
            {participant.gmat ? <Typography sx={{ fontSize: "0.85rem", }}>Gmat: <b style={{ fontWeight: "500" }}>{participant.gmat}</b></Typography> : ""}
            {participant.act ? <Typography sx={{ fontSize: "0.85rem", }}>ACT: <b style={{ fontWeight: "500" }}>{participant.act}</b></Typography> : ""}
            {participant.sat ? <Typography sx={{ fontSize: "0.85rem", }}>SAT: <b style={{ fontWeight: "500" }}>{participant.sat}</b></Typography> : ""}
          </>),
          language: (<>
            {participant?.language}<br />
          </>),
        }
      )
    });
  };
  const studentcolumns = [
    { key: "name", name: "Name", minWidth: 120 },
    { key: "delegate", name: "Delegate", minWidth: 120 },
    { key: "city", name: "City", minWidth: 120 },
    { key: "degree", name: "Recent Degree", minWidth: 120 },
    { key: "country", name: "Preferred Country", minWidth: 120 },
    { key: "course", name: "Preferences ", minWidth: 120 },
    { key: "aptitude", name: "Aptitude", minWidth: 120 },
    { key: "language", name: "Language", minWidth: 120 },

  ];

  return (
    <div className="main-content" style={{ marginTop: "1rem" }}>
      {role === "Admin" ?
        <Button sx={{
          color: "#fff",
          background: "#3B3F76",
          borderRadius: "5px",
          textTransform: "none",
          fontSize: "0.8rem",
          margin: '10px',
          "&:hover": {
            background: "#3B3F76",
          },
        }} onClick={() => dispatch(
          setPopup({
            show: true,
            data: {
              container: {
                name: "createUser",
                dimensions: {
                  width: "500px",
                },
              },
              type: "custom",
            },
          }))}>Create user</Button> : ""}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <ReusableTable1 columns={studentcolumns} data={mapStudentData(students)} />
      </Box>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <Grid container>
          {students?.map((item: any, i: number) => (
            <Grid item xs={12} md={6} key={i}>
              <ParticipantCard data={item} key={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

type FilterData = {
  type: string;
  label?: string;
  data: string[];
};

interface FiltersProps {
  filterData: any;
  setFilterData: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = (props) => {
  const [search, setSearch] = useState<string>("");
  const userType = localStorage.getItem("userType");
  const details = userType !== "Organizer" ? ["eligible", "interested"] : ["interested", "prospective"];

  const handleSelectChange = (label: string, value: string): void => {
    const existingFilters = [...props.filterData];
    const existingFilterIndex = existingFilters.findIndex(
      (filter) => filter.type === "label" && filter.label === label
    );

    if (existingFilterIndex > -1) {
      if (existingFilters[existingFilterIndex].data[0] === value) {
        const updatedFilters = existingFilters.filter(
          (_, index) => index !== existingFilterIndex
        );
        props.setFilterData(updatedFilters);
      } else {
        const updatedFilters = existingFilters.map((filter, index) => {
          if (index === existingFilterIndex) {
            return { ...filter, data: [value] }; 
          }
          return filter;
        });
        props.setFilterData(updatedFilters); 
      }
    } else {
      const formattedData: FilterData = {
        type: "label",
        label: label,
        data: [value],
      };
      props.setFilterData([...existingFilters, formattedData]);
    }
  };

  const handleSearchClick = (): void => {
    const searchFormattedData: FilterData = {
      type: "name",
      data: [search],
    };
    props.setFilterData([...props.filterData, searchFormattedData]);
  };

  return (
    <div style={{ marginLeft: "1rem" }}>
      <Typography sx={{ mt: 1 }}>Filters</Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <TextField
            variant="outlined"
            size="small"
            value={search}
            placeholder="Search name"
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input": {
                padding: "6px",
              },
            }}
          />
          <Button
            sx={{ textTransform: "none", background: "#3b3f76", width: "35px", minWidth: "0" }}
            onClick={handleSearchClick} // Handle search button click
          >
            <SearchIcon sx={{ color: "#fff" }} />
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          {details.map((detailKey) => (
            <Box key={detailKey} sx={{ ml: 2 }}>
              <FormControl fullWidth variant="outlined" size="small" sx={{ width: "130px" }}>
                <InputLabel id={`${detailKey}-label`}>{setWordCase(detailKey)}</InputLabel>
                <Select
                  label={setWordCase(detailKey)}
                  name={`details.${detailKey}`}
                  onChange={(e:any) => handleSelectChange(detailKey, e.target.value)} // Handle onChange with the formatted data
                >
                  {["yes", "no"].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};


