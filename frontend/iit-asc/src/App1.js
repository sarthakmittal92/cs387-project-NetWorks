import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login } from './links/login/login'
import { Landing } from './links/landing/Landing'
import { Home } from './links/home/home'
import { Chat } from './links/chat/chat'
import { Network } from './links/network/network'
import { Jobs } from './links/jobs/jobs'
import { JobDetails } from './links/jobs_details/jobs_details'
import { FillProfile } from './links/profile_fill/profile_fill'
import {Profile} from './links/profile/profile'
import {Temp} from './links/temp/temp'
import {OneFeed} from './links/one_feed/one_feed'
import {Comment} from './links/comment/comment'
import {NewJob} from'./links/jobs_new/jobs_new'

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
        <Route path='/fill-profile' element={<FillProfile />}/>
        <Route path='/temp' element={<Temp />}/>
        <Route path='/of' element={<OneFeed />}/>
        <Route path='/cc' element={<Comment />}/>
        <Route path='/profile/:user_name' element={<Profile />}/>
        <Route path='/new-job' element={<NewJob/>}/>
      </Routes>
  )
}

export default App