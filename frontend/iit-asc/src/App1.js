import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login } from './links/login/login'
import { Landing } from './links/landing/Landing'
import { Home } from './links/home/home'
import { Chat } from './links/chat/chat'
import { Network } from './links/network/network'

function App() {
  
  return (
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/network' element={<Network />}/>
      </Routes>
  )
}

export default App