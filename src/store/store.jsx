// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import problemsReducer from "./features/problems/problemSlice";
// import contestsReducer from "./features/contests/contestsSlice.jsx";

export const store = configureStore({
  reducer: {
    problems: problemsReducer,
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
