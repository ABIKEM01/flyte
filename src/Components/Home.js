import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemSlider from './ItemSlider';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function Home() {
    const [data, setData] = useState([])
    const [doctor, setDoctor] = useState(false)
    const [vital, setVital] = useState(false)
    const [billings, setBillings] = useState(false)
    const [laboratory, setLaboratory] = useState(false)
    const [pharmacy, setPharmacy] = useState("")


    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');

    const startTimer = () => {
        // We set the time to 0
        let time = 0;
        // We set an interval to update the time every second
        const interval = setInterval(() => {
            // We get the current time
            const date = new Date(time);
            // We format the time to add a 0 if it's less than 10
            const formattedTime = date
                .toISOString()
                .substr(11, 8)
                .replace(/^(\d{2}):(\d{2}):(\d{2})$/, '$1:$2:$3');
            // We update the time
            setTimer(formattedTime);
            // We add 1 second
            time += 1000;
        }, 1000);
        // We return the interval to clear it when the component unmounts
        return interval;
    };


    // const getTimeRemaining = (e) => {
    //     const total = Date.parse(e) - Date.parse(new Date());
    //     const seconds = Math.floor((total / 1000) % 60);
    //     const minutes = Math.floor((total / 1000 / 60) % 60);
    //     const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    //     return {
    //         total, hours, minutes, seconds
    //     };
    // }


    // const startTimer = (e) => {
    //     let { total, hours, minutes, seconds }
    //         = getTimeRemaining(e);
    //     if (total >= 0) {

    //         setTimer(
    //             (hours > 9 ? hours : '0' + hours) + ':' +
    //             (minutes > 9 ? minutes : '0' + minutes) + ':'
    //             + (seconds > 9 ? seconds : '0' + seconds)
    //         )
    //     }
    // }


    // const clearTimer = (e) => {

    //     setTimer('01:00:59');
    //     if (Ref.current) clearInterval(Ref.current);
    //     const id = setInterval(() => {
    //         startTimer(e);
    //     }, 1000)
    //     Ref.current = id;
    // }

    // const getDeadTime = () => {
    //     let deadline = new Date();

    //     deadline.setSeconds(deadline.getSeconds() + 180);
    //     return deadline;
    // }
    // useEffect(() => {
    //     clearTimer(getDeadTime());
    // }, []);

    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // }

    useEffect(() => {
        fetchData()
        startTimer()

        setInterval(fetchData, 40000)
    }, [])

    const receptionsHandler = (system_id) => {
        console.log('clicked')
        setDoctor(system_id)
    }
    const vitalHandler = (system_id) => {

        setVital(system_id)
    }
    const billingsHandler = (system_id) => {

        setBillings(system_id)
    }
    const synlabsHandler = (system_id) => {

        setLaboratory(system_id)
    }
    const pharmaciesHandler = (system_id) => {
        console.log('clicked....', system_id)
        setPharmacy(system_id)
        // setPharmacies((prev) => !prev)
    }

    const fetchData = async () => {
        localStorage.setItem('scrollToEnd', true);
        const response = await axios.get('https://misas.avonmedical.com:8020/api/v1/get-queue')
        // const response = await axios.get('http://127.0.0.1:9000/api/check')
        console.log('all data', response.data)
        // console.log(response.data.vitals[0].vital)
        console.log('length', response.data.vitals.length)

        setData(response.data)

        // setData(response.data)
        // for vitals
        if (response.data.vitals.length > data?.vitals?.length) {
            localStorage.setItem('scrollToEnd', false);
            let numberOfData = response.data.vitals.length - data.vitals.length;
            console.log('numberofdata', numberOfData);
            // add last new data equivalent to number of data to the state
            let newData = response.data.vitals.slice(-numberOfData);
            console.log('newData', newData);
            setData((prev) => {
                return {
                    ...prev,
                    vitals: [...prev.vitals, ...newData]
                }
            })

        }
        // for billings
        if (response.data.billings.length > data?.billings?.length) {
            localStorage.setItem('scrollToEnd', false);
            let numberOfData = response.data.billings.length - data.billings.length;
            console.log('numberofdata', numberOfData);
            // add last new data equivalent to number of data to the state
            let newData = response.data.billings.slice(-numberOfData);
            console.log('newData', newData);
            setData((prev) => {
                return {
                    ...prev,
                    billings: [...prev.billings, ...newData]
                }
            }
            )
        }
        // for laboratory
        if (response.data.laboratory.length > data?.laboratory?.length) {
            localStorage.setItem('scrollToEnd', false);
            let numberOfData = response.data.laboratory.length - data.laboratory.length;
            console.log('numberofdata', numberOfData);
            // add last new data equivalent to number of data to the state
            let newData = response.data.laboratory.slice(-numberOfData);
            console.log('newData', newData);
            setData((prev) => {
                return {
                    ...prev,
                    laboratory: [...prev.laboratory, ...newData]
                }
            })
        }
        // for pharmacy
        if (response.data.pharmacy.length > data?.pharmacy?.length) {
            localStorage.setItem('scrollToEnd', false);
            let numberOfData = response.data.pharmacy.length - data.pharmacy.length;
            console.log('numberofdata', numberOfData);
            // add last new data equivalent to number of data to the state
            let newData = response.data.pharmacy.slice(-numberOfData);
            console.log('newData', newData);
            setData((prev) => {
                return {
                    ...prev,
                    pharmacy: [...prev.pharmacy, ...newData]
                }
            })
        }
        // for doctor
        if (response.data.doctor.length > data?.doctor?.length) {
            localStorage.setItem('scrollToEnd', false);
            let numberOfData = response.data.doctor.length - data.doctor.length;
            console.log('numberofdata', numberOfData);
            // add last new data equivalent to number of data to the state
            let newData = response.data.doctor.slice(-numberOfData);
            console.log('newData', newData);
            setData((prev) => {
                return {
                    ...prev,
                    doctor: [...prev.doctor, ...newData]
                }
            })
        }

    }


    const timestamp = Date.now()
    const ttime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    return (
        <div className='w-full h-auto bg-flytePrimary'>
            <p className='flex justify-center w-full text-[40px] font-bold pt-5'>Top Ticket(s) Labelled "BLUE" PROCEED To Service STATION</p>
            {/* <p>{timer}</p> */}
            <div className='flex flex-wrap justify-around mt-12'>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className=' bg-violet-600 text-[28px] font-bold flex justify-center'>VITALS</p>
                    <div className='text-center'>
                        <ItemSlider last={data?.vitals?.length} >
                            {
                                data && data?.vitals?.map((item, i) => (<div key={i} style={{ backgroundColor: vital == item ? "blue" : "" }} className={`flex justify-center text-[20px] cursor-pointer ${vital === item ? 'bg-blue-700' : ''}  `} onClick={() => setVital(item)}>{item} <br /><span className='text-sm bg-violet-600 text-white'> {ttime}</span> </div>))
                            }
                        </ItemSlider>
                    </div>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className='bg-red-300 text-[28px] font-bold flex justify-center'>BILLING</p>
                    <div className='text-center'>

                        <ItemSlider last={data?.billings?.length} >
                            {
                                data && data?.billings?.map((item, i) => (<div key={i} style={{ backgroundColor: billings == item ? "blue" : "" }} className={`flex justify-center text-[20px] cursor-pointer ${billings === item ? 'bg-blue-700' : ''}  `} onClick={() => setBillings(item)}>{item} <br /><span className='text-sm bg-violet-600 text-white'> {ttime}</span> </div>))
                            }
                        </ItemSlider>

                    </div>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto'>
                    <p className='bg-green-800 text-[28px] font-bold flex justify-center text-white'>PHARMACY</p>
                    <ul className=''>
                        <div className='text-center'>

                            <ItemSlider last={data?.pharmacy?.length} >
                                {
                                    data && data?.pharmacy?.map((item, i) => (<div key={i} style={{ backgroundColor: pharmacy == item ? "blue" : "" }} className={`flex justify-center text-[20px] cursor-pointer ${pharmacy === item ? 'bg-blue-700' : ''}  `} onClick={() => setPharmacy(item)}>{item} <br /><span className='text-sm bg-violet-600 text-white'> {ttime}</span> </div>))
                                }
                            </ItemSlider>

                        </div>
                    </ul>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className='bg-blue-200 text-[28px] font-bold flex justify-center'>LABORATORY</p>
                    <div className='text-center'>
                        <ItemSlider last={data?.laboratory?.length} >
                            {
                                data && data?.laboratory?.map((item, i) => (<div key={i} style={{ backgroundColor: laboratory == item ? "blue" : "" }} className={`flex justify-center text-[20px] cursor-pointer ${laboratory === item ? 'bg-blue-700' : ''}  `} onClick={() => setLaboratory(item)}>{item} <br /><span className='text-sm bg-violet-600 text-white'> {ttime}</span> </div>))
                            }
                        </ItemSlider>
                    </div>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className='bg-green-600 text-[28px] font-bold flex justify-center'>DOCTOR</p>
                    <div className='text-center'>
                        <ItemSlider last={data?.doctor?.length}>
                            {
                                data && data?.doctor?.map((item, i) => (<div key={i} style={{ backgroundColor: doctor == item ? "blue" : "" }} className={`flex justify-center text-[20px] cursor-pointer ${doctor === item ? 'bg-blue-700' : ''}  `} onClick={() => setDoctor(item)}>{item} <br /><span className='text-sm bg-violet-600 text-white'> {ttime}</span> </div>))
                            }
                        </ItemSlider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home