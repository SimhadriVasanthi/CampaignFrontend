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

const Counsellor = () => {
  const studentsData = useAppSelector((state) => state.studentInfo);
  const auth = localStorage.getItem("_campaign_token")

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

  const studentDetails = async () => {
    try {
      const response = await getParticipantDetails("");
      if (response) {
        localStorage.setItem("memberId", response.data.data._id)
        dispatch(
          initStudentProfile({
            requestStatus: "initiated",
            responseStatus: "recieved",
            haveAnIssue: false,
            issue: "",
            data: response.data.data.visits,
          })
        );
      }
    } catch (err) {
      console.log(err)
    }

  };

  useEffect(() => {
    if (auth) {
      studentDetails()
    }
  }, [])

  // const students = [
  //   { firstName: "firstName", lastName: "firstName", email: "firstName", phone: "" },
  //   { firstName: "firstName", lastName: "firstName", email: "firstName", phone: "" },
  //   { firstName: "firstName", lastName: "firstName", email: "firstName", phone: "" },

  // ]

  const usersData = [
    { name: "name", booth: "name", institution: "name", role: "name" }
  ]
  //   const studentDetails = async () => {
  //     const response = await allstudentDetails("students", { filterData: [] });
  //     // console.log(response);
  //     if (response) {
  //       dispatch(
  //         initStudentProfile({
  //           requestStatus: "initiated",
  //           responseStatus: "recieved",
  //           haveAnIssue: false,
  //           issue: "",
  //           data: response.data.list,
  //         })
  //       );
  //     }
  //   };

  //   const applicationDetails = async () => {
  //     let response;

  //     if (role === "counsellor") {
  //       response = await allstudentDetails("users", {
  //         filterData: [],
  //       });
  //     } else {
  //       response = await allstudentDetails("users", {
  //         filterData: filterData,
  //       });
  //     }

  //     if (response.success) {
  //       dispatch(
  //         initusers({
  //           requestStatus: "initiated",
  //           responseStatus: "recieved",
  //           haveAnIssue: false,
  //           issue: "",
  //           data: response.data.list,
  //         })
  //       );
  //     } else {
  //       console.error("Failed to fetch application details", response);
  //     }

  //     return response;
  //   };

  //   const leadDetails = async () => {
  //      const response = await allstudentDetails("leads", {
  //         filterData: [],
  //       });
  //     if (response.success) {
  //      setLeadsData(response.data.list)
  //     } else {
  //       console.error("Failed to fetch application details", response);
  //     }
  //     return response;
  //   }; 
  //   const newStudents = async () => {
  //     const response = await newstudentDetails({
  //        filterData: [],
  //      });
  //    if (response.success) {
  //     setnewStudentsData(response.data?.list)
  //    } else {
  //      console.error("Failed to fetch application details", response);
  //    }
  //    return response;
  //  }; 

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
        users={usersData}
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
    const memberId = localStorage.getItem("memberId");

    return events?.data?.map((event: any) => {
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
              <Box sx={{marginLeft:"3.5rem"}}>

                {events?.data?.map((item: any) => (
                  item?.details?.map((visit: any) => (
                    <>
                      {setWordCase(visit?.label)} : {visit?.data} <br />
                    </>
                  ))

                ))}

              </Box>
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
    });
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
    { key: "booth", name: "Booth Number", minWidth: 200 },
    { key: "institutionName", name: "Institution Name", minWidth: 200 },
    { key: "role", name: "Role", minWidth: 200 },
  ];
  const mapLeadsData = (leadsData: any[]) => {
    return leadsData.map(student => ({
      name: student?.name,
      booth: student?.booth,
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
