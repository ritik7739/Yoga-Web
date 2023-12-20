import React, { useState } from 'react'
import RegisterForm from './RegisterForm'
import UnpaidTable from './UnpaidTable'

const FormTable = () => {
    const [openRegisterForm, setOpenRegisterForm] = useState(true)
    return (
        <div className='flex flex-col lg:w-[80%] border-2 mx-auto mt-4 shadow-lg rounded-lg'>
            <div className='flex flex-row justify-around bg-slate-100 pb-4 '>
                <button className={`text-lg uppercase font-bold mt-5 ${openRegisterForm && "underline underline-offset-4 decoration-4	"}`} onClick={() => setOpenRegisterForm(true)}>
                    Register
                </button>
                <button className={`text-lg uppercase font-bold mt-5 ${!openRegisterForm && "underline underline-offset-4 decoration-4"}`} onClick={() => setOpenRegisterForm(false)} >
                    Unpaid Customers
                </button>
            </div>
            <div className='p-10 '>
                {
                    openRegisterForm ? <RegisterForm /> : <UnpaidTable />
                }

            </div>

        </div >
    )
}

export default FormTable