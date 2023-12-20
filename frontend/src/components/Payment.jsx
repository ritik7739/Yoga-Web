import axios from 'axios'
import React, { useState } from 'react'
import { base_url } from '../../utils/base_url'
import { errorToast } from '../../utils/toastify'

const Payment = ({ setOpenDiv, id }) => {
    const [paymentForm, setPaymentForm] = useState({})
    const [error, setError] = useState({})
    const [confirm, setConfirm] = useState(false)

    const completePayment = () => {
        let temp = {};
        setError({})
        if (!(paymentForm?.card?.length && paymentForm?.card?.length > 0)) {

            temp = { ...temp, card: "Card Field must not be empty!" }

        }
        if (!(paymentForm?.amt == 500)) {
            temp = { ...temp, amt: "Invalid Amount (Must be 500)" }
        }

        if (!(paymentForm?.batch?.length > 0)) {
            temp = { ...temp, batch: "Choose the batch" }
        }
        if (temp.card || temp.amt || temp.batch) {
            setError({ ...temp })
        } else {
            axios.put(`${base_url}/api/customer/pay`, {
                id: id,
                batch: paymentForm.batch
            }).then((res) => {

                setConfirm(true)
            }).catch((err) => {
                errorToast("Something went wrong ")
                console.log(err);
            })
        }

    }


    return (
        <div className='w-full h-full'>
            {confirm ? <div className='flex flex-col justify-around h-64'>
                <p className='text-green-500 text-3xl text-center' >
                    Payment Successfull!!!
                </p>
                <p className=' text-center text-2xl'>
                    User Registered and Enrolled
                </p>
                <button className='bg-black rounded px-4 py-2 text-white active:bg-slate-600' onClick={() => setOpenDiv({ open: false })}  >
                    Close
                </button>
            </div> : <div className='flex flex-col justify-around' >
                <p className='text-center mb-5' >

                    Payment
                </p>
                <div>
                    <p>
                        Enter Debit Card No
                    </p>
                    <input className='border-2 rounded-lg border-black w-full py-2 px-2' type='text' onChange={(e) => {
                        setPaymentForm({ ...paymentForm, card: e.target.value })
                    }} />
                    {error.card && <p className='text-red-700 ml-2' >
                        {error.card}
                    </p>}

                    <p>
                        Enter Amount
                    </p>

                    <input className='border-2 rounded-lg border-black w-full py-2 px-2' type='text' onChange={(e) => {
                        setPaymentForm({ ...paymentForm, amt: e.target.value })
                    }} />
                    {error.amt && <p className='text-red-700 ml-2' >
                        {error.amt}
                    </p>}
                </div>
                <div>
                    <p>
                        Enter preferred batch timings
                    </p>
                    <select className='border-2 bg-white rounded-lg border-black w-full py-2 px-2' type='text' onChange={(e) => {
                        setPaymentForm({ ...paymentForm, batch: e.target.value })
                    }} >
                        <option value={""}>
                            Choose
                        </option>
                        <option value={"6-7AM"}>
                            6 AM - 7 AM
                        </option>
                        <option value={"7-8AM"}>
                            7 AM - 8 AM
                        </option> <option value={"8-9AM"}>
                            8 AM - 9 AM
                        </option> <option value={"5-6PM"}>
                            5 PM - 6 PM
                        </option>
                    </select>
                    {error.batch && <p className='text-red-700 ml-2' >
                        {error.batch}
                    </p>}
                </div>
                <button className='bg-green-800  text-white w-full mt-2 rounded py-2 active:bg-green-900' onClick={() => completePayment()} >
                    Pay
                </button>
                <button className='bg-red-800  text-white w-full mt-2 rounded py-2 active:bg-green-900' onClick={() => setOpenDiv({ open: false })} >
                    Cancel
                </button>
            </div>
            }
        </div>
    )
}

export default Payment