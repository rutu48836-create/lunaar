
import { useState } from 'react'
import './App.css'
import { Dashboard } from './Frontend/Pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sign_In } from './Frontend/Pages/sign_in'
import { Products_Page } from './Frontend/Pages/Create_Product'
import { Store_Page_Content_Wrapper } from './Frontend/Pages/Store_Page'
import { Create_Page } from './Frontend/Pages/Create_Page'
import {Page} from './Frontend/Pages/Page.jsx'
import { Home_page } from './Frontend/Pages/Home.jsx'
import { Privacy } from './Frontend/Components/policy.jsx'
import { About } from './Frontend/Components/About.jsx'
import { Contact } from './Frontend/Components/Contact.jsx'

function App() {

  return (
    <>
          <BrowserRouter>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/" element={<Home_page/>}/>
        <Route path = "/Privacy" element={<Privacy/>}/>
                <Route path = "/About" element={<About/>}/>
                                <Route path = "/Contact" element={<Contact/>}/>
                <Route path="/Sign-in" element={<Sign_In/>} />
                <Route path="/Product-Page" element={<Products_Page/>}/>
                <Route path="/Create-Page" element={<Create_Page/>} />
                <Route path={`/store/:token`} element={<Store_Page_Content_Wrapper/>} />
                <Route path="/page/:token/:slug" element={<Page/>} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
