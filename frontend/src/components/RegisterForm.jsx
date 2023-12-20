import React, { useState } from 'react'
import Payment from './Payment';
import { base_url } from '../../utils/base_url';
import axios from 'axios';
import { Bars } from 'react-loader-spinner'
import { errorToast, successToast } from '../../utils/toastify';

const RegisterForm = () => {
    const [form, setForm] = useState({});
    const [error, setError] = useState({});
    const [openPaymentDiv, setOpenPaymentDiv] = useState({})
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState()
    const submit = () => {
        let temp = {};
        setError({})

        if (!(form?.name?.length && form?.name?.length > 0)) {
            console.log("Rishi11")
            temp = { ...temp, name: "Name Field must not be empty!" }

        }
        if (!(form?.age >= 18 && form?.age <= 65)) {
            temp = { ...temp, age: "Invalid age (Must be between 18 - 65)" }
        }

        if (!(form?.gender?.length > 0)) {
            temp = { ...temp, gender: "Choose the gender" }
        }


        if (temp.name || temp.age || temp.gender) {
            setError({ ...temp })
        } else {
            console.log((new Date()).toISOString().split('T')[0])
            setLoading(true)
            axios.post(`${base_url}/api/customer/`, {
                ...form,
                reg_date: (new Date()).toISOString().split('T')[0]

            }).then((res) => {
                console.log(res)
                setLoading(false);
                if (res.status == 200) {
                    successToast("User Registered")
                    setOpenPaymentDiv({ open: true, id: res.data.data.id })
                } else {
                    errorToast("Something went wrong")
                    console.log(err)
                }

            }).catch((err) => {
                setLoading(false);
                errorToast("Something went wrong")
                console.log(err)
                console.log("Something went wrong")
            });

        }

    }
    return (
        <div className='lg:w-[50%] mx-auto text-lg flex flex-col gap-5  z-0 ' >

            <p className='text-center uppercase'>
                ADD New Customer
            </p>
            {!openPaymentDiv.open && <>
                <div>
                    <p>
                        Enter name
                    </p>
                    <input className='border-2 rounded-lg border-black w-full py-2 px-2' type='text' onChange={(e) => {
                        setForm({ ...form, name: e.target.value })
                    }} />
                    {error.name && <p className='text-red-700 ml-2' >
                        {error.name}
                    </p>}
                </div>
                <div>
                    <p>
                        Enter Age
                    </p>
                    <input className='border-2 rounded-lg border-black w-full py-2 px-2' type='text' onChange={(e) => {
                        setForm({ ...form, age: e.target.value })
                    }} />
                    {error.age && <p className='text-red-700 ml-2' >
                        {error.age}
                    </p>}
                </div>
                <div>
                    <p>
                        Enter your Gender
                    </p>
                    <select className='border-2 bg-white rounded-lg border-black w-full py-2 px-2' type='text' onChange={(e) => {
                        setForm({ ...form, gender: e.target.value })
                    }} >
                        <option value={""}>
                            Choose
                        </option>
                        <option value={"male"}>
                            Male
                        </option>
                        <option value={"female"}>
                            Female
                        </option>
                    </select>
                    {error.gender && <p className='text-red-700 ml-2' >
                        {error.gender}
                    </p>}
                </div>

                <button className='bg-black text-white uppercase font-bold rounded-lg   py-2 flex flex-row justify-center ' onClick={() => submit()}>
                    {loading ? <Bars height="25"
                        width="100"
                        color="#ffffff" /> : " Register New Customer"}
                </button>
            </>}
            {openPaymentDiv.open && <div className='bg-white border-2 border-black rounded backdrop:bg-slate-400 z-40 p-2  mx-auto min-h-[18rem] w-[85vw] sm:w-[30rem]' >
                <Payment setOpenDiv={setOpenPaymentDiv} id={openPaymentDiv.id} />
            </div>}
        </div>
    )
}

export default RegisterForm