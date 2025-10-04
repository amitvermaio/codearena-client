import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, isAuthenticated, loading, error, initializing } = useSelector((state) => state.user);

  return {
    user,
    isAuthenticated,
    loading,
    initializing,
    error,
    isAdmin: user?.role === 'admin',
    userId: user?.id || user?._id,
    userRole: user?.role,
  };
};

export default useAuth;
