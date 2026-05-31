import { useState } from 'react'
import './App.css'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyTask from './pages/MyTask'
import PageNotFound from './pages/PageNotFound'
import UpdateTask from './pages/UpdateTask'
import LandingPage from './pages/LandingPage'
import TasksList from './pages/TasksList'




function App() {
  

  return (
    <>

    <Routes>
        <Route path='/landing' element={<LandingPage></LandingPage>}/>
      <Route path='/' element={<Register></Register>}/>
      <Route path='/login' element={<Login></Login>} />
      <Route path='/dashboard' element={<Dashboard></Dashboard>} />
      <Route path='/mytasks' element={<MyTask></MyTask>} />
       <Route path='/tasks' element={<TasksList></TasksList>} />
      <Route path='/updatetask/:id' element={<UpdateTask></UpdateTask>} />
       <Route path='*' element={<PageNotFound></PageNotFound>} />
      
    </Routes>
     
    </>
  )
}

export default App
