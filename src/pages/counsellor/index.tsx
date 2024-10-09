/* eslint-disable */
import { Box, Button, Grid, } from "@mui/material";
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
import { AnyAaaaRecord } from "dns";

const Counsellor = () => {
  const studentsData = useAppSelector((state) => state.studentInfo);
  const usersData = useAppSelector((state) => state.userInfo);
  const auth = localStorage.getItem("_campaign_token")
  // console.log(usersData)
  const role = localStorage.getItem("role")
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<
    "students" | "users"
  >("users");

  useEffect(() => {
    if (role === "Admin") {
      setActiveTab("users");
    } else {
      setActiveTab("students");
    }
  }, [role]);


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
          {role === "Admin" ?
            <>
              <Button
                onClick={() => setActiveTab("users")}
                sx={{
                  color: "#fff",
                  borderBottom: activeTab === "users" ? "2px solid #fff" : 0,
                  borderRadius: 0,
                  textTransform: "none",
                  fontSize: "1rem",
                }}
              >
                Users
              </Button>
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
            </>
            :
            <>

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
            </>
          }

        </Box>
      </Box>
      <MainComponent
        activeTab={activeTab}
        students={studentsData}
        users={usersData?.data}
      />
    </Box>
  );
};

export default Counsellor;

interface MainComponentProps {
  activeTab: string;
  students: any;
  users: any;
}
function formatDate(dateString: string, day: boolean): string {
  const options: Intl.DateTimeFormatOptions = day
    ? { year: "numeric", month: "long" }
    : { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
const MainComponent: React.FC<MainComponentProps> = ({
  activeTab,
  students,
  users,
}) => {
  const [columns, setColumns] = useState<any[]>([]);
console.log(students)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (activeTab === "students") {
      setColumns(studentcolumns);
    } else {
      setColumns(usercolumns);

    }
    // eslint-disable-next-line
  }, [activeTab]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let stdId = queryParams.get("s");
  let popup = queryParams.get("p");

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
    // const memberId = localStorage.getItem("memberId");
    const role = localStorage.getItem("role")
    console.log(events)
    return events?.data?.map((participant: any) =>  (
        {
          name: (
            <>
              <StudentName
                name={participant?.name}
                displayPicSrc={participant?.displayPicSrc}
                id={participant?._id}
                type={participant?.userType}
              />
              {
                role === "Admin" ? "" :
                  <Box sx={{ marginLeft: "3.5rem" }}>

                    {
                      participant?.details?.map((visit: any) => (
                        <>
                          {setWordCase(visit?.label)} : {visit?.data} <br />
                        </>
                      ))
                    }

                  </Box>
              }

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
          course: participant?.course,
          budget: participant?.educationBudget,
          intake: participant?.year,

          aptitude: (<>
            {participant?.aptitude}<br />
          </>),
          language: (<>
            {participant?.language}<br />
          </>),

        }
    )
    );
  };

  const studentcolumns = [
    { key: "name", name: "Name", minWidth: 120 },
    { key: "city", name: "City", minWidth: 120 },
    { key: "degree", name: "Recent Degree", minWidth: 120 },
    { key: "intake", name: "Plan to start", minWidth: 120 },
    { key: "country", name: "Preferred Country", minWidth: 120 },
    { key: "course", name: "Preferred Course", minWidth: 120 },
    { key: "budget", name: "Budget range", minWidth: 120 },
    { key: "aptitude", name: "Aptitude", minWidth: 120 },
    { key: "language", name: "Language", minWidth: 120 },

  ];

  const usercolumns = [
    { key: "name", name: "Name", minWidth: 200 },
    { key: "boothNumber", name: "Booth Number", minWidth: 200 },
    { key: "institutionName", name: "Institution Name", minWidth: 200 },
    { key: "role", name: "Role", minWidth: 200 },
  ];
  const mapLeadsData = (leadsData: any) => {
    return leadsData.map((student:any) => ({
      name: student?.name,
      boothNumber: student?.boothNumber,
      institutionName: student?.institutionName,
      role: student?.role || "N/A",
    }));
  };

  return (
    <div className="main-content" style={{ marginTop: "1rem" }}>
      {activeTab === "students" ? (
        <>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <ReusableTable1 columns={studentcolumns} data={mapStudentData(students)} />
          </Box>
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <Grid container>
              {students?.data?.map((item: any, i: number) => (
                <Grid item xs={12} md={6} key={i}>
                  <ParticipantCard data={item} key={i} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      ) :
        <>
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
            }))}>Create user</Button>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <ReusableTable1 columns={usercolumns} data={mapLeadsData(users)} />
          </Box>
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            <Grid container>
              {users?.map((item: any, i: number) => (
                <Grid item xs={12} sm={6} key={i}>
                  <UserCard data={item} key={i} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      }

    </div>
  );
};
