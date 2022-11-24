import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemSlider from './ItemSlider';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

function Home() {
    const [data, setData] = useState([])
    const [receptions, setReceptions] = useState(false)
    const [vital, setVital] = useState(false)
    const [billings, setBillings] = useState(false)
    const [synlabs, setSynlabs] = useState(false)
    const [pharmacies, setPharmacies] = useState("")

    useEffect(() => {
        calc()
    }, [])
    const calc = async () => {
        const response = axios.get('https://misas.avonmedical.com:8020/api/v1/get-queue')
        console.log('response from server', response)
        // setData(response.data)
    }



    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);

    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');


    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }


    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
            = getTimeRemaining(e);
        if (total >= 0) {

            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }


    const clearTimer = (e) => {

        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('01:00:59');

        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();

        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 180);
        return deadline;
    }

    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible

    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    useEffect(() => {
        fetchData()
    }, [])

    const receptionsHandler = (system_id) => {
        console.log('clicked')
        setReceptions(system_id)
    }
    const vitalHandler = (system_id) => {

        setVital(system_id)
    }
    const billingsHandler = (system_id) => {

        setBillings(system_id)
    }
    const synlabsHandler = (system_id) => {

        setSynlabs(system_id)
    }
    const pharmaciesHandler = (system_id) => {
        console.log('clicked....', system_id)
        setPharmacies(system_id)
        // setPharmacies((prev) => !prev)
    }

    const fetchData = async () => {
        const response = await axios.get('http://hollymab.com/api/mails')

        setData(response.data)
    }
    const timestamp = Date.now()
    const ttime = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);
    return (
        <div className='w-full h-auto bg-flytePrimary'>
            <p className='flex justify-center w-full text-[40px] font-bold pt-5'>Top Ticket(s) Labelled "BLUE" PROCEED To Service STATION</p>
            <div className='flex flex-wrap justify-around mt-12'>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className=' bg-violet-600 text-[28px] font-bold flex justify-center'>VITALS</p>
                    <div className='text-center'>
                        <ItemSlider>
                            {
                                data && data?.vitals?.map((item, i) => (<p key={i} style={{ backgroundColor: vital == item.system_id ? "blue" : "" }} className={`flex justify-center text-[40px] cursor-pointer ${vital === item.system_id ? 'bg-blue-700' : ''}  `} onClick={() => setVital(item.system_id)}>{item.system_id} <span className='text-sm bg-violet-600 text-white'> {ttime}</span></p>))
                            }
                        </ItemSlider>
                    </div>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className='bg-red-300 text-[28px] font-bold flex justify-center'>BILLING</p>
                    <div className='text-center'>

                        <ItemSlider>
                            {
                                data && data?.billings?.map((item, i) => (<p key={i} style={{ backgroundColor: billings == item.system_id ? "blue" : "" }} className={`flex justify-center text-[40px] cursor-pointer ${billings === item.system_id ? 'bg-blue-700' : ''}  `} onClick={() => setBillings(item.system_id)}>{item.system_id}<span className='text-sm bg-red-300 text-white'> {ttime}</span></p>))
                            }
                        </ItemSlider>

                    </div>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto'>
                    <p className='bg-green-800 text-[28px] font-bold flex justify-center text-white'>PHARMARCY</p>
                    <ul className=''>
                        <div className='text-center'>

                            <ItemSlider>
                                {
                                    data && data?.pharmacies?.map((item, i) => (<p key={i} className={`flex justify-center text-[40px] cursor-pointer ${pharmacies === item.system_id ? 'bg-blue-700' : ''}  `} onClick={() => pharmaciesHandler(item.system_id)}>{item.system_id}<span className='text-sm bg-green-800 text-white'> {ttime}</span></p>))
                                }
                            </ItemSlider>

                        </div>
                    </ul>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className='bg-blue-200 text-[28px] font-bold flex justify-center'>LABORATORY</p>
                    <div className='text-center'>
                        <ItemSlider>
                            {
                                data && data?.synlabs?.map((item, i) => (<p key={i} style={{ backgroundColor: synlabs == item.system_id ? "blue" : "" }} className={`flex justify-center text-[40px] cursor-pointer ${synlabs === item.system_id ? 'bg-blue-700' : ''}  `} onClick={() => setSynlabs(item.system_id)}>{item.system_id}<span className='text-sm bg-blue-200 text-black'> {ttime}</span></p>))
                            }
                        </ItemSlider>
                    </div>
                </div>
                <div className='w-1/6 bg-flyPrimary100 h-auto '>
                    <p className='bg-green-600 text-[28px] font-bold flex justify-center'>DOCTOR</p>
                    <div className='text-center'>
                        <ItemSlider>
                            {
                                data && data?.receptions?.map((item, i) => (<p key={i} className={`flex justify-center text-[40px] cursor-pointer ${receptions === item.system_id ? 'bg-blue-700' : ''}  `} onClick={() => receptionsHandler(item.system_id)}>{item.system_id} <span className='text-sm bg-green-600 text-white'> {timer}</span></p>))
                            }
                        </ItemSlider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home