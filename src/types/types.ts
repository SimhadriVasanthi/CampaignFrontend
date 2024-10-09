import { FC } from "react";
// import { IndustryTypeEnum, WorkStyleEnum } from "../assets/enums";

export type RoutingProps = {
  link: string;
};
export type ModalDialogprops<additionalDataType> = {
  open: boolean;
  handleClose?: Function;
  children?: React.ReactNode;
  additionalData?: additionalDataType;
};
export type loginProps = {
  email: string;
  password: string;
};

export type buttonProps = {
  children: any;
  handleSubmit: Function;
  width: string;
};
export type sideMenu = {
  title?: string;
  link?: string;
};

export interface Event {
  name: string;
  data?: any;
  triggerBy?: {
    componentName?: string;
    id?: string | number;
  };
}

interface Component<miscType, stateType> {
  state?: stateType;
  nonState?: {
    id?: string | number;
    structuralKey?: string | number;
    eventHandler?: (event: Event) => void;
    exposedEvents?: string[];
    initialValue?: any;
    misc?: miscType;
  };
}

export interface Form {
  fields: FormField[];
  title?: string;
  submitText?: string;
  asynchronousSubmit: boolean;
}

export interface FormField {
  title: string;
  container: Container;
  initialValue?: string;
}

export interface FormContainer {
  id: string;
  state: "focus" | "blur";
  data: any;
}

export interface checklist {
  name: string;
  isChecked: boolean;
  doc: any;
  desc: string;
  applicationId: string;
  checklistId: string;
}

export interface Dropdown {
  options: string[];
}



export interface Container {
  id?: string;
  component: FC<Component<any, any>>;
  data?: any;
}
export interface Verification {
    token: {
      data: string;
      expiry: Date;
    };
    _id: string;
    type: string;
    status: boolean;
  }
  export interface Phone {
    countryCode: string;
    number: number;
  }
  export interface Recommendation { 
    course: {
      tuitionFee: {
        tuitionFee: number;
        tuitionFeeType: string;
      };
      currency: {
        symbol: string;
        code: string;
      };
      university: {
        location: {
          country: string;
          state: string;
          city: string;
        };
        _id: string;
        name: string;
        logoSrc: string;
        type: string;
        establishedYear: number;
      };
      _id: string;
      name: string;
      subDiscipline: string;
      schoolName: string;
      discipline: string;
      studyLevel: string;
      duration: string;
      studyMode: string[];
      startDate: {
        _id: string;
        courseStarting: string;
        Deadline: string;
        courseStartingMonth: number;
        deadlineMonth: number;
      }[];
    };
    possibilityOfAdmit: "Ambitious"| "Moderate"|"Safe",
    notInterested: boolean,
    _id: string;
  }
  export interface Popup {
    _id?: string;
    show: boolean;
    data?: {
      container?: {
        name?: string;
        data?: any;
        // link?:any;
        dimensions?: {
          width?: string;
          height?: string;
          // show?:string;
          // close?:any
        };
      };
      eventHandler?: (event: Event) => void;
      title?: string;
      type?: "error" | "warning" | "notification" | "custom";
      headerIcon?: string;
    };
  }
  export interface Recommendations {
    criteria:{
      ug_gpa?: string,
      gre?: string,
      sub_discipline?: string
  };
  data:Recommendation[]
  }

export interface ProfileInfo{
        phone:Phone;
        recommendations: {
            criteria: {
                sub_discipline: []
            },
            data:Recommendation[];
        },
        _id: string;
        displayPicSrc:string;
        email: string;
        userType: string;
        firstName: string;
        lastName:string;
        verification: Verification[];
}

export interface StudentProfile {
        profile:ProfileInfo
        stage: string;
        _id: string;
    }
export interface Course {
    _id: string;
    name: string;
    studyLevel?:string;
    subDiscipline?:string;
    startDate: {
        _id: string;
        courseStarting: string;
        Deadline: string;
        courseStartingMonth: number;
        deadlineMonth: number;
      }[];
    unisName: string;
    };



   export interface Application {
      approval: Approval;
      _id: string;
      university: University;
      course: Courses;
      intake: string; // ISO 8601 date string
      user: UserProfile;
      processCoordinator: ProcessCoordinator;
      counsellor: Counsellor;
      cancellationRequest: boolean;
      log: LogEntry[];
      status: string;
      stage: string;
      docChecklist: any[];
      createdAt: string; // ISO 8601 date string
      updatedAt: string; // ISO 8601 date string
      __v: number;
      deadline: string | null; // ISO 8601 date string or null
    }
    
    interface Approval {
      counsellorApproval: boolean;
      justification: string;
    }
    
    interface University {
      location: Location;
      _id: string;
      name: string;
      logoSrc: string;
      type: string;
      establishedYear: number;
    }
    
    interface Location {
      country: string;
      state: string;
      city: string;
    }
    
    interface Courses {
      applicationDetails: ApplicationDetails;
      _id: string;
      name: string;
      subDiscipline: string;
      schoolName: string;
      discipline: string;
      studyLevel: string;
      duration: number; // Duration in months or weeks (depending on context)
    }
    
    interface ApplicationDetails {
      applicationFee: number;
      applicationFeeLink: string;
    }
    
    interface UserProfile {
      _id: string;
      displayPicSrc: string;
      email: string;
      userType: string;
      firstName: string;
      lastName: string;
    }
    
    interface ProcessCoordinator {
      _id: string;
      displayPicSrc: string;
      email: string;
      userType: string;
      firstName: string;
      lastName: string | null;
    }
    
    interface Counsellor {
      _id: string;
      displayPicSrc: string;
      email: string;
      userType: string;
      firstName: string;
      lastName: string | null;
    }
    
    interface LogEntry {
      status: string;
      stages: Stage[];
      _id: string;
    }
    
    interface Stage {
      name: string;
      updatedAt: string; // ISO 8601 date string
      _id: string;
    }
    
export interface UserStatus {
  isAuthorized: boolean;
  isRegistered: boolean;
  role: any;
}

export interface Error {
  show: boolean;
  message: string;
}


export interface StoreItem<datatype> {
  requestStatus: "not_initiated" | "initiated";
  responseStatus: "recieved" | "not_recieved";
  haveAnIssue: boolean;
  issue: string;
  data: datatype;
}

export interface StoreAction<payloadType> {
  type: "string";
  payload: payloadType;
}

export interface Store {
  workexperience: StoreItem<WorkExperience[]>;
  skills: StoreItem<any>;
  educationhistory: StoreItem<any>;
  shortlistedcourses: StoreItem<ShortlistedCourse[]>;
  recommendedcourses: StoreItem<any>;
  chats: StoreItem<{ advisors: Chat[]; community: Chat[] }>;
  messages: StoreItem<Message[]>;
  profile: StoreItem<Profile>;
  counsellorinfo: StoreItem<any>;
  testscores: StoreItem<any>;
  preferences: StoreItem<any>;
  applications: StoreItem<Application[]>;
  documents: StoreItem<any>;
  communityposts: StoreItem<any>;
  communityfeed: StoreItem<any>;
  communityjoined: StoreItem<any>;
  counsellorbookedslots: StoreItem<any>;
  userauthstatus: StoreItem<UserStatus>;
  error: StoreItem<Error>;
  notifications: StoreItem<Notification[]>;
  userlocation: StoreItem<Location>;
  courses: StoreItem<any>;
  meetings: StoreItem<any>;
  //event:StoreItem<Event|null>
}

export interface ShortlistedCourse {
  university: {
    location: {
      country: string;
      state: string;
      city: string;
    };
    _id: string;
    name: string;
    logoSrc: string;
    type: string;
    establishedYear: number;
  };
  course: {
    tuitionFee: {
      tuitionFee: number;
      tuitionFeeType: string;
    };
    currency: {
      symbol: string;
      code: string;
    };
    _id: string;
    name: string;
    subDiscipline: string;
    schoolName: string;
    discipline: string;
    studyLevel: string;
    duration: string;
    studyMode: string[];
    startDate: {
      _id: string;
      courseStarting: string;
      Deadline: string;
      courseStartingMonth: number;
      deadlineMonth: number;
    }[];
  };
  _id: string;
}

export type chatParticipantActions = "online" | "typing" | "offline" | "inchat";

export interface Chat {
  _id: string;
  participants: Participant[];
  admins: [];
  unSeenMessages: {
    message: {
      _id: string;
      sender: {
        _id: string;
        displayPicSrc: string;
        email: string;
        userType: string;
        firstName: string;
        lastName: string;
      };
      content: string;
      iv: string;
      chat: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    seen: string[];
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastMessage?: {
    _id: string;
    sender: string;
    content: string;
    iv: string;
    chat: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface Participant {
  _id: string;
  displayPicSrc: string;
  email: string;
  userType: UserRoles;
  firstName: string;
  lastName: string;
  role: string;
  activity: chatParticipantActions;
  lastSeenMessageId?: string;
}

export interface Message {
  _id: string;
  sender?: {
    _id: string;
    displayPicSrc: string;
    email: string;
    userType: string;
    firstName: string;
    lastName: string;
  };
  content?: string;
  iv?: string;
  chat?: string;
  createdAt?: string;
  updatedAt?: string;
  type: "seen" | "normal" | "typing";
  __v?: number;
}

export interface WorkExperience {
  companyName: string;
  sector: string;
  type: string;
  startDate: string;
  designation: string;
  endDate: string;
  _id?: string;
  docId: any;
}
export interface ListItem {
  name: any;
  value: any;
  // required?:boolean
}
export interface FilterSelected {
  type: string;
  data: ListItem[];
}
export interface FilterInfo {
  // label(label: any): import("react").ReactNode;
  title?:string;
  type: string;
  options?:ListItem[];
  selectedType: string;
  label: string;
  customContainer?:{
    name:string,
    data:any
  },
  selectionEventname?:string;
  handler?:(data:{type:string,data:any,appliedFilters:FilterSelected[]})=>FilterSelected,
  searchbox:boolean;
}
export interface Applications {
  processing: Application[];
  accepted: Application[];
  rejected: Application[];
  completed: Application[];
  cancelled: Application[];
}
export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  displayPicSrc: string;
  email: string;
}
export interface TriggerObject {
  action: string;
  sender: any;
  recievers?: any;
  data: any;
}
export interface Verification {
  token: {
    data: string;
    expiry: Date;
  };
  _id: string;
  type: string;
  status: boolean;
}

export interface SuggestedPackage {
  priceDetails: {
      currency: {
          symbol: string;
          code: string
      };
      totalPrice: number
  };
  _id: string;
  name: string;
  description:string;
  country: string [];
  requirements: string[];
  benefits: string[];
  termsAndConditions: string;
  active: boolean;
  products: []
}

export type UserRoles = "student" | "counsellor" | "processCoordinator" | "member";
export interface User {
  _id: string;
  numberOfStudentsAssisted: number;
  email: string;
  firstName: string;
  lastName: string;
  displayPicSrc: string;
  userType: UserRoles;
  role: UserRoles;
  language: string[];
}
export  interface FilterProps {
  appliedFilter:FilterSelected[],
  setAppliedFilter:any,
  setAnchorElNav?:any
}
export interface UniversityListObj {
  location: {
    country: string;
    state: string;
    city: string;
  };
  faqs:any;
  currency: {
    symbol: string;
    code: string;
  };
  uni_rating:number;
  _id: string;
  name: string;
  logoSrc: string;
  type: string;
  graduationRate:string;
  acceptanceRate:string;
  establishedYear: string;
  average_temperatures:{
    summer: any;
    winter:any;
    spring: any;
    autumn: any;
};

medianEarning:{
  year:string
};
  ranking: {
    _id: string;
    rank: number;
    source: string;
  }[];
  cost: {
    _id: string;
    name: string;
    lowerLimit: number;
    upperLimit: number;
  }[];
  courses:number;
  code:string;
  userReviews:any | undefined
}
export interface exploreListInfo{
  type:string;
  page: number;
  filterData: FilterInfo[];
  currency: string;
  search: string;
  totalItems: number | undefined;
  totalPages: number | undefined;
  appliedFilters: {type:string,data:ListItem[]}[];
}