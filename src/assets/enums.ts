import Error from "../components/layout/error";
import CreateUser from "../pages/counsellor/createUser";
import Index from "../pages/counsellor/participant";
// import SingleUser from "../pages/counsellor/singleUser";

export const COMPONENTS = [
    {name:"error",component:Error},
    {name:"createUser",component:CreateUser},
    {name:"singleUser",component:Index},

];

export const counsellorstages = ["Counsellor Approved", "Counsellor Disapproved"];
export const processingStages = [
  "Request Received",
  "Document checklist",
  "Documents verification",
  "Application form draft",
  "Submission",
  "Pending Checklists",
  "Waiting for Decision",
  "Conditional Acceptance",
  "Result Received",
  "Financial Documents",
  "I20 Request",
  "I20 Received",
];
export const filterOptions = {
  coordinator: [
    {
      type: "stage",
      options: processingStages?.map((item) => ({
        name: item,
        value: item,
      })),
      selectedType: "multi",
      searchbox: false,
    },
    {
      type: "status",
      options: [
        { name: "Processing", value: "processing" },
        { name: "Accepted", value: "accepted" },
        { name: "Rejected", value: "rejected" },
        { name: "Cancelled", value: "cancelled" },
        { name: "Completed", value: "completed" },

      ],
      selectedType: "multi",
      searchbox: false,
    },
 
  ],

};
export const DestinationTypeEnum = {
  USA: "United States of America",
  UK: "United Kingdom",
  CN: "Canada",
  AUS: "Australia",
  IRL: "Ireland",
  NZ: "New Zealand",
  IN:"India"
}
export const CurrencySymbolEnum = {
    USD: "$",
    GBP: "£",
    CAD: "$",
    AUD: "AU$",
    EUR: "€",
    NZD: "$",
    INR: "₹",
}
export const countryList = [
  "Australia",
  "Canada",
  "United States of America",
  "United Kingdom",
  "New Zealand",
  "Ireland",
];

export const category = ["premium application", "elite application", "statement of purpose and letter of recommendation", "VISA process", "education loan process"]