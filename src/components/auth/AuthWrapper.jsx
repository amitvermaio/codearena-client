// src/components/AuthWrapper.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '@/store/features/user/userSlice';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const initialized = useSelector((s) => s.user.initialized);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (!initialized) return <div>Checking authentication...</div>;
  return <>{children}</>;
};

export default AuthWrapper;
