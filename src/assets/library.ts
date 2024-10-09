/* eslint-disable */
import { initProfile, resetProfile } from "../store/slices/profileInfo";
import { resetStudentProfile } from "../store/slices/studentsInfo";
import { resetAuth, setUserAuthStatus } from "../store/slices/userAuthSlice";
import { store } from "../store/store";
import { COMPONENTS } from "./enums";

const dispatch = store.dispatch;
let token = localStorage.getItem("_campaign_token");
let role = localStorage.getItem("role");


export const checkUser = async () => {
    token = localStorage.getItem("_campaign_token");
    role = localStorage.getItem("role");
    dispatch(
      setUserAuthStatus({
        isAuthorized: token ? true : false,
        isRegistered: token ? true : false,
        role:role,
      })
    );
   
};

  
export const logOut = () =>{
    resetAuth();
    // resetProfile();
    // resetStudentProfile();
  window.location.href = "/login";
}  

export const  formatDate = (dateString: string, day: boolean): string =>{
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


