import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '@/config/axios.config';
import { verifyAuth } from '@/store/actions/user/userAction';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Kick off an auth verification only when we have a token
      dispatch(verifyAuth());
    } else {
      // Attempt a silent refresh using refresh token cookie
      (async () => {
        try {
          const res = await axios.post('/auth/refresh-token', null, {
            headers: { Authorization: undefined },
          });
          const newToken = res?.data?.token;
          if (newToken) {
            localStorage.setItem('access_token', newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            dispatch(verifyAuth());
          }
        } catch (e) {
          // no-op: user remains unauthenticated on public pages
        }
      })();
    }
  }, [dispatch]);

  return (
    <>
    </>
  )
}

export default App