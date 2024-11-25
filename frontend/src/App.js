import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage, SignupPage,ActivationPage,HomePage,ProductPage,BestSellingPage,EventsPage,FAQPage } from './Routes'
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';


const App = () => {

  useEffect(() => {
    Store.dispatch(loadUser());
  },[])


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/sign-up" element={<SignupPage/>}/>
      <Route path="/activation/:activation_token" element={<ActivationPage/>}/>
      <Route path='/products' element={<ProductPage/>}/>
      <Route path='/best-selling' element={<BestSellingPage/>}/>
      <Route path='/events' element={<EventsPage/>}/>
      <Route path='/faq' element={<FAQPage/>}/>
    </Routes>
    <ToastContainer
    position='bottom-center'
    autoClose={500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick 
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='dark'
    />
    </BrowserRouter>
  )
}

export default App
