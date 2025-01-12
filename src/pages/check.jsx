import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSelectedFeature } from '../store/slice/Host';
import axios from 'axios';
import {axiosInstance} from '../api/axios';

const Check = () => {
   
    const hostData = useSelector(state => state.User)
    const dispatch = useDispatch();
    console.log(hostData);
    const checkmyredux=()=>{
        dispatch(addSelectedFeature({selectedFeature:"myfeature"}))
    }

    axiosInstance.get('/helo').then((data)=>{
console.log('its worked');
    }).catch((eroro)=>{
console.log("this is erroe ",eroro);
    })
  return (
    <div>......check.............

       <h1 onClick={checkmyredux}>click meeeeeeeeee</h1>
    </div>
  )
}

export default Check

