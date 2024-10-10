/* eslint-disable */
import { Box, Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, } from "@mui/material";
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
import Index from "../qr";

const Counsellor = () => {

  const auth = localStorage.getItem("_campaign_token")
  // const role = localStorage.getItem("role");
  const [filterData, setFilterData] = useState([])
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
      <Index/>
      <Filters filterData={filterData} setFilterData={setFilterData} />
      <MainComponent
        activeTab={activeTab}
        students={participants}
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
    { key: "city", name: "City", minWidth: 120 },
    { key: "degree", name: "Recent Degree", minWidth: 120 },
    { key: "country", name: "Preferred Country", minWidth: 120 },
    { key: "course", name: "Preferences ", minWidth: 120 },
    { key: "aptitude", name: "Aptitude", minWidth: 120 },
    { key: "language", name: "Language", minWidth: 120 },
    { key: "delegate", name: "Delegate/Team", minWidth: 120 },


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
      <Box sx={{ display: { xs: "block", lg: "none" },padding:"1rem" }}>
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


const Filters = (props: any) => {
  const [search, setSearch] = useState("");
  const userType = localStorage.getItem("userType");
  const details = userType !== "Organizer" ? ["eligible", "interested"] : ["interested", "prospective"];

  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string | null }>({});

  const handleSelectChange = (label: string, value: string) => {
    const currentFilterData = props.filterData.find(
      (filter: any) => filter.type === "label" && filter.label === label
    );
    if (!currentFilterData) {
      const newFilter = {
        type: "label",
        label: label,
        data: [value],
      };
      props.setFilterData([...props.filterData, newFilter]);
      setSelectedValues({ ...selectedValues, [label]: value });
    } else {
      if (currentFilterData.data[0] === value) {
        const updatedFilters = props.filterData.filter(
          (filter: any) => filter !== currentFilterData
        );
        props.setFilterData(updatedFilters);
        setSelectedValues({ ...selectedValues, [label]: null });
      } else {
        const updatedFilters = props.filterData.map((filter: any) => {
          if (filter === currentFilterData) {
            return { ...filter, data: [value] };
          }
          return filter;
        });
        props.setFilterData(updatedFilters);
        setSelectedValues({ ...selectedValues, [label]: value });
      }
    }
  };

  const handleSearchClick = () => {
    const searchFormattedData = {
      type: "name",
      data: [search],
    };
    const existingNameFilterIndex = props.filterData.findIndex(
      (filter: any) => filter.type === "name"
    );

    if (existingNameFilterIndex > -1) {
      const updatedFilterData = props.filterData.map((filter: any, index: any) => {
        if (index === existingNameFilterIndex) {
          return searchFormattedData;
        }
        return filter;
      });
      props.setFilterData(updatedFilterData);
    } else {
      props.setFilterData([...props.filterData, searchFormattedData]);
    }
  };


  return (
    <div style={{ marginLeft: "1rem" }}>
      <Typography sx={{ mt: 1 }}>Filters</Typography>
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={3}>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                value={search}
                placeholder="Search name"
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    // padding: "6px",
                  },
                  "& .MuiOutlinedInput-root ": {
                    paddingRight: 0
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        sx={{ textTransform: "none", background: "#3b3f76", minWidth: "0",p:1 }}
                        onClick={handleSearchClick}
                      >
                        <SearchIcon sx={{ color: "#fff" }} />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>
          {details.map((detailKey) => (
            <Grid item xs={4} sm={3} md={2} lg={1.5}>
              <Box key={detailKey} >
                <FormControl fullWidth variant="outlined" size="small" sx={{}}>
                  <InputLabel id={`${detailKey}-label`}>{setWordCase(detailKey)}*</InputLabel>
                  <Select
                    label={setWordCase(detailKey)}
                    value={selectedValues[detailKey] || ""}
                  >
                    {["yes", "no"].map((value) => (
                      <MenuItem
                        key={value}
                        value={value}
                        onClick={() => handleSelectChange(detailKey, value)}
                      >
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

          ))}

        </Grid>


      </Box>
    </div>
  );
};




