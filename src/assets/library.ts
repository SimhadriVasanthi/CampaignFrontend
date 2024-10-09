/* eslint-disable */
import { getParticipantDetails } from "../services";
import { initProfile, resetProfile } from "../store/slices/profileInfo";
import { initStudentProfile, resetStudentProfile } from "../store/slices/studentsInfo";
import { resetAuth, setUserAuthStatus } from "../store/slices/userAuthSlice";
import { initUserProfile } from "../store/slices/userInfo";
import { store } from "../store/store";
import { COMPONENTS } from "./enums";

const dispatch = store.dispatch;
let token = localStorage.getItem("_campaign_token");
let role = localStorage.getItem("role");

const getMember = async () => {
  try {
    const response = await getParticipantDetails("");
    if (!response || !response.data || !response.data.data) {
      console.error("No valid data in response");
      return;
    }
    localStorage.setItem("memberId", response.data.data._id);

    const attendees: any[] = [];
    const nonAttendees: any[] = [];
    response.data.data?.visits?.forEach((event: any) => {
      const { details, notes, participants } = event; // Extracting details and notes

      participants.forEach((participant: any) => {
        const combinedData = {
          ...participant, // Participant data
          details,        // Details array
          notes,          // Notes value
        };

        // Separate participants based on userType and push combined data
        if (participant.userType === "Attendee") {
          attendees.push(combinedData);
        } else {
          nonAttendees.push(combinedData);
        }
      });
    })
    // if (attendees.length > 0) {
    dispatch(
      initStudentProfile({
        requestStatus: "initiated",
        responseStatus: "recieved",
        haveAnIssue: false,
        issue: "",
        data: attendees,
      })
    );
    // }

    // if (nonAttendees.length > 0) {
    dispatch(
      initUserProfile({
        requestStatus: "initiated",
        responseStatus: "recieved",
        haveAnIssue: false,
        issue: "",
        data: nonAttendees,
      })
    );
    // }

    dispatch(
      initProfile({
        requestStatus: "initiated",
        responseStatus: "recieved",
        haveAnIssue: false,
        issue: "",
        data: response.data.data,
      })
    );

    return {
      _id: response.data._id,
      name: response.data.name,
      institutionName: response.data.institutionName,
      displayPicSrc: response.data.displayPicSrc
        ? response.data.displayPicSrc
        : "https://res.cloudinary.com/dffdp7skh/image/upload/v1706879929/nvitahnrlhvmtcizpthx.png", // Default image if not provided
      email: response.data.email,
      userType: response.data.userType,
      role: response.data.role,
    };
  } catch (err) {
    console.error("Error fetching participant details:", err);
  }
};


export const checkUser = async () => {
  token = localStorage.getItem("_campaign_token");
  role = localStorage.getItem("role");
  dispatch(
    setUserAuthStatus({
      isAuthorized: token ? true : false,
      isRegistered: token ? true : false,
      role: role,
    })
  );
  if (token) {
    getMember();
  }

};

export const logOut = () => {
  window.location.href = "/login";
}

export const formatDate = (dateString: string, day: boolean): string => {
  const options: Intl.DateTimeFormatOptions = day
    ? { year: "numeric", month: "long" }
    : { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export const setWordCase = (word: string | undefined) => {
  if (word && word.length !== 0) {
    let lowercase = word.toLowerCase();
    return lowercase[0].toUpperCase() + lowercase.substring(1);
  } else {
    return "";
  }
};

export const getComponent = (id: string) => {
  let index = COMPONENTS.findIndex((item) => item.name === id);
  // console.log(id,"component")
  return COMPONENTS[index].component;
};

export const maskInput = (input: string | undefined, type: "email" | "phone"): string => {
  if (!input) return "";

  if (type === "email") {
    const [username, domain] = input.split("@");
    if (username.length <= 2) return `${username}@${domain}`;

    const maskedUsername = username[0] + username[1] + "*".repeat(5);
    return `${maskedUsername}@${domain}`;
  }

  if (type === "phone") {
    const lastFourDigits = input.slice(-4);
    const maskedSection = "*".repeat(input.length - 4);
    return `${maskedSection}${lastFourDigits}`;
  }

  return input;
};

export const normalizeType = (type: string): string => {
  const words = type.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


