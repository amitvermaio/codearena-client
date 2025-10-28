import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/store/actions/user/userAction";
import Loader from "../Loader";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { initialized, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    console.log(initialized);
  }, []); // run only once on mount

  if (!initialized) return <Loader />;
  
  return <> { children } </>;
};

export default AuthWrapper;
