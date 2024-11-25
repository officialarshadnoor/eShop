import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '../server';
import axios from 'axios';
import { toast } from 'react-toastify';

const ActivationPage = () => {
    const {activation_token} = useParams();
    const {error, setError} = useState(false);

    useEffect(() => {
        if(activation_token){
const activationEmail = async () => {
    try {
const res = await axios.post(`${server}/user/activation`, {
activation_token,
});
toast.success(res.data.message);
    }
    catch(e){
toast.error(e.response.data.message);
    };
};
activationEmail();
}
}, []);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
     {
        error ? (
            <p>Your token is expired</p>
        ): 
        <p>Your account has been created successfully!</p>
     }
    </div>
  )
}

export default ActivationPage
