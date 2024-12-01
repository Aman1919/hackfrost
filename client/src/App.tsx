import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import './index.css';
import NavBar from './components/navbar';
import ProtectedRoute, { PublicRoute } from './components/routeComponents';
import AuthWrapper from './hooks/auth';
import React from 'react';
import AllCourses from './pages/allcourse';
import Course from './components/course/course';
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar/>
      <AuthWrapper>
        <Routes>
          <Route path="/login" element={<PublicRoute> <Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allcourse"
            element={
              <ProtectedRoute>
                <AllCourses/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute>
                <Course/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
    </div>
  )
}
