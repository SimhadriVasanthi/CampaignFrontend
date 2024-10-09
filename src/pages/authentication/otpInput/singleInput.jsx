/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useLayoutEffect } from "react";
import usePrevious from "./usePrevious";

const SingleInput = (props) => {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return React.createElement("input", { ref: inputRef, ...rest });
};

export default SingleInput;
