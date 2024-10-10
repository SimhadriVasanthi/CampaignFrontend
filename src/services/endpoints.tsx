export const loginEndPoint = () => {
  return `api/v1/auth/host-login`;
};

export const registerUserEndPoint = () => {
  return `api/v1/auth/host-register`;
};


export const singleParticipantEndPoint = (id:string,page:number,perPage:number) => {
  return `api/v1/participants/?s=${id}&page=${page}&perPage=${perPage}`;
};

export const visitEndPoint = () =>{
  return `api/v1/visit`
}
