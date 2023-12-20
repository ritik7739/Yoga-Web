import React, { useEffect, useState } from 'react'
import { base_url } from '../../utils/base_url'
import axios from 'axios'
import Payment from './Payment'

const UnpaidTable = () => {
    const [data, setData] = useState([])
    const fetchData = () => {
        axios.get(`${base_url}/api/customer/unpaid`).then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const [paymentBoxOpen, setPaymentBoxOpen] = useState({})
    useEffect(() => {
        fetchData();


    }, [paymentBoxOpen])

    return (
        <div className=''>
            <div className='rounded border min-h-[30rem]  '>
                {
                    !paymentBoxOpen.open && <>

                        <div className='grid grid-cols-4  place-items-center h-10 bg-slate-200 '>
                            <p>
                                ID
                            </p>
                            <p>
                                Name
                            </p>
                            <p>
                                Age
                            </p>
                            <p>
                                Actions
                            </p>
                        </div>
                        <div className='flex flex-col gap-4   max-h-[32rem] overflow-y-auto '>
                            {
                                data?.length > 0 && data.map((item) => {
                                    return (
                                        <div className=' border-b-2 grid grid-cols-4 place-items-center py-1 '>
                                            <p>
                                                {item.id}
                                            </p>
                                            <p>
                                                {item.name}
                                            </p>
                                            <p>
                                                {item.age}
                                            </p>
                                            <button className='bg-green-700 px-8 py-1 rounded ' onClick={() => setPaymentBoxOpen({ open: true, id: item.id })} >
                                                Pay
                                            </button>



                                        </div>
                                    )
                                })
                            }


                        </div>
                    </>
                }
                {
                    paymentBoxOpen.open && <div className='bg-white border-2 border-black rounded backdrop:bg-slate-400 z-40 p-2  absolute  transform -translate-x-1/2 -translate-y-1/2  top-1/2 left-1/2 min-h-[18rem] w-[85vw] sm:w-[30rem]' >
                        <Payment setOpenDiv={setPaymentBoxOpen} id={paymentBoxOpen.id} />
                    </div>
                }
                {
                    data.length == 0 && <p className='text-center my-5 '>
                        No Unpaid Customer
                    </p>
                }
            </div>
        </div>
    )
}

export default UnpaidTable