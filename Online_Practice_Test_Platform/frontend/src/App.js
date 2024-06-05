import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Quiz from './components/Quiz';
import toast, { Toaster } from "react-hot-toast";
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import QuizReview from './components/QuizReview';

function App() {

  return (
    <Router>

      <Routes>
        <Route path="/" element={
          <Auth >
            <Home />
          </Auth>} />
        <Route path="/quiz/:id" element={
          <Auth redirect="/login">
            <Quiz />
          </Auth>
        } />
        <Route path="/dashboard" element={
          <Auth redirect="/login">
            <Dashboard />
          </Auth>} />
        <Route path="/quiz-review" element={
          <Auth redirect="/login">
            <QuizReview />
          </Auth>} />

        <Route
          path="/login"
          element={
            <Login />
          }
        />
        <Route
          path="/register"
          element={

            <Register />
          }
        />

      </Routes>
      <Toaster />


    </Router>
  );

}

export const server = 'http://localhost:5000/api/v1';

export default App;
