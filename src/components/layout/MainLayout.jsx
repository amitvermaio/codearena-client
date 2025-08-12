// src/components/layout/MainLayout.jsx
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}