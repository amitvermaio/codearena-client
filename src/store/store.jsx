import { configureStore } from "@reduxjs/toolkit";
import problemsReducer from "./features/problems/problemSlice";
import userReducer from "./features/user/userSlice"; // <- common users
import adminUserReducer from "./features/admin/userSlice"; // <- admin panel users
import profileReducer from "./features/profile/profileSlice"; // <- profile
import potdReducer from "./features/problems/potdSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,          // for common user
    adminUsers: adminUserReducer, // for admin panel
    problems: problemsReducer,
    profile: profileReducer, // for profile
    potd: potdReducer,
    // contests: contestsReducer,
  },
});



// // In your components
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchProblems, setFilter } from './problemActions';
// import { selectPaginatedProblems, selectProblemLoading } from './problemSlice';

// const dispatch = useDispatch();
// const problems = useSelector(selectPaginatedProblems);
// const loading = useSelector(selectProblemLoading);
