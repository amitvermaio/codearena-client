import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/store/actions/user/userAction";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []); // run only once on mount
  
  return <> { children } </>;
};

export default AuthWrapper;
