// @ts-nocheck
import React, { memo, useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { millisecondsToSeconds } from "date-fns";
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosApi from '../Axios/Axios';
import { toast } from 'react-toastify';

const IdleTimer = () => {
  const navigation = useNavigate()

  const [state, setState] = useState('Active')
  const [count, setCount] = useState(0)
  const [remaining, setRemaining] = useState("00:00")

  const onIdle = useCallback(async (e) => {
    // WHEN THE IDLE TRIGGER IS FIRED LOG OUT FUNCTIONALITY START
    const userSlno = localStorage.getItem("app_auth");

    if (userSlno) {
      const userId = atob(JSON.parse(userSlno)?.authNo);

      if (userId) {
        // localStorage.removeItem("app_auth");
        // window.location.href = "/";
        const res = await axiosApi.get(`/user/logout/${userId}`);
        if (res) {
          localStorage.removeItem("app_auth");

          toast.error(
            <div className='flex h-20 flex-col'>Your Session has been Expired</div>,
            {
              position: "top-center", // Centers toast horizontally at the top
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );


          setTimeout(() => {
            navigation('/')
          }, 3000); // Wait 3 seconds before redirecting
        }
      }

    } else {
      localStorage.removeItem("app_auth");
      toast.error(
        <div className='flex h-20 flex-col'>Your Session has been Expired</div>,
        {
          position: "top-center", // Centers toast horizontally at the top
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setTimeout(() => {
        navigation('/')
      }, 3000); // Wait 3 seconds before redirecting
    }

    setState('Idle')
  }, [])

  const onActive = useCallback((e) => {
    setState('Active')
  }, [])

  // const onAction = useCallback(() => {
  //   setCount(count + 1)
  // }, [])

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    // onAction,
    timeout: 1000 * 60 * 30, // 10 minits
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const idleTimeInMilliseconds = getRemainingTime();

      if (idleTimeInMilliseconds <= 0) {
        setRemaining("00:00");
        clearInterval(interval); // Stop the coutdown when time runs out
        return;
      }

      // Convert milliseconds to Second format
      const convertMillisecondsToTime = (milliseconds) => {
        const date = millisecondsToSeconds(milliseconds);
        return formatTime(date);
      };
      // Convert second yo minits:seconds format 09:59
      const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
      };

      setRemaining(convertMillisecondsToTime(idleTimeInMilliseconds));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getRemainingTime]);

  return (
    <div className='text-white' style={{ fontFamily: 'var(--font-varient)', fontWeight: 800, fontSize: '0.90rem' }} >{remaining}</div>
  )
}

export default memo(IdleTimer)