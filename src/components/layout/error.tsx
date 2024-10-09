import React from "react";
const Error = ({ data }: any) => {
  // Capitalize the first letter of the text
  const capitalizedText = data.charAt(0).toUpperCase() + data.slice(1);

  return <div>{capitalizedText}</div>;
};
export default Error;