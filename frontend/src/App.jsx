import React from 'react'
import Header from './components/Header'
import FormTable from './components/FormTable'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className=" w-screen"
    >
      <Header />
      <FormTable />
      <ToastContainer />
    </div>
  )
}

export default App