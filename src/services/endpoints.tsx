export const loginEndPoint = () => {
  return `api/v1/auth/host-login`;
};

export const registerUserEndPoint = () => {
  return `api/v1/auth/host-register`;
};


export const singleParticipantEndPoint = (id:string) => {
  return `/api/v1/participants/?s=${id}`;
};

export const visitEndPoint = () =>{
  return `/api/v1/visit`
}
