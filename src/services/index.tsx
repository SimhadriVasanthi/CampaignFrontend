import { AxiosError } from "axios";
import { logOut } from "../assets/library";
import { setPopup } from "../store/slices/popupSlice";
import { store } from "../store/store";
import api from "./baseUrl";
import { loginEndPoint, registerUserEndPoint, singleParticipantEndPoint, visitEndPoint} from "./endpoints";


let token = localStorage.getItem("_campaign_token");
const dispatch = store.dispatch;
const getHeaders = () => {
  token = localStorage.getItem("_campaign_token");
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return headers;
};

let headers = getHeaders();

const handleApiError = (error: any) => {
  let errorMessage = "Something went wrong";

  if (error && error instanceof AxiosError) {
    const errorResponse = error.response?.data;
    if (
      errorResponse?.message === "Token Verification Failed" ||
      errorResponse?.message === "jwt malformed" ||
      errorResponse?.message === "Unauthorised entry"
    ) {
      // If it's a specific error, clear local storage and reload the page
      errorMessage = errorResponse.message;
      localStorage.clear();
      logOut();
    } else {
      errorMessage = errorResponse?.message || errorMessage; // Use specific error message from API response if available
    }
  } else if (error && error instanceof Error) {
    errorMessage = error.message || errorMessage; // Use error message from JavaScript error object
  }
  dispatch(
    setPopup({
      show: true,
      data: {
        container: {
          name: "error",
          data: errorMessage,
          dimensions: {
            width: "350px",
          },
        },
        type: "custom",
      },
    })
  );

  return errorMessage;
};
const authenticateLogin = async (values: object) => {
  try {
    const response = await api.post(loginEndPoint(), values);
    return response;
  } catch (err: any) {
    const errorResponse = handleApiError(err);
    throw errorResponse;
  }
};

const registerUser = async (values: object) => {
  headers=getHeaders()
  try {
    const response = await api.post(registerUserEndPoint(), values,headers);
    return response;
  } catch (err: any) {
    const errorResponse = handleApiError(err);
    throw errorResponse;
  }
};

const visitAdd = async (values: object) => {
  headers=getHeaders()
  try {
    const response = await api.post(visitEndPoint(), values,headers);
    return response;
  } catch (err: any) {
    const errorResponse = handleApiError(err);
    throw errorResponse;
  }
};

const getParticipantDetails = async (studentId: string,page:number,perPage:number,values:object) => {
  try {
    const response = await api
      .post(singleParticipantEndPoint(studentId,page,perPage),values, headers)
    return response;
  } catch (err: any) {
    const errorResponse = handleApiError(err);
    throw errorResponse;
  }
};



export {
  authenticateLogin,  
  registerUser,
  getParticipantDetails,
  visitAdd,
  
};
