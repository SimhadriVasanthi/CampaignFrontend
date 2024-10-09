import Error from "../components/layout/error";
import CreateUser from "../pages/counsellor/createUser";
import Index from "../pages/counsellor/participant";
// import SingleUser from "../pages/counsellor/singleUser";

export const COMPONENTS = [
    {name:"error",component:Error},
    {name:"createUser",component:CreateUser},
    {name:"singleUser",component:Index},

];


export const DestinationTypeEnum = {
  USA: "United States of America",
  UK: "United Kingdom",
  CN: "Canada",
  AUS: "Australia",
  IRL: "Ireland",
  NZ: "New Zealand",
  IN:"India"
}

export const countryList = [
  "Australia",
  "Canada",
  "United States of America",
  "United Kingdom",
  "New Zealand",
  "Ireland",
];