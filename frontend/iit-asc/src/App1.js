import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login } from './links/login/login'
import { Landing } from './links/landing/Landing'
import { Home } from './links/home/home'
import { Chat } from './links/chat/chat'
import { Network } from './links/network/network'
import { Jobs } from './links/jobs/jobs'
import { JobDetails } from './links/jobs_details/jobs_details'

function App() {
  
  return (
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/network' element={<Network />}/>
        <Route path='/jobs' element={<Jobs />}/>
        <Route path='/jobs/details/:job_id' element={<JobDetails />}/>
      </Routes>
  )
}

export default App