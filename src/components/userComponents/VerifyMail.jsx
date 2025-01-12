import {React, useState, useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import axiosInstance from '../../api/axios';
import { Toaster,toast } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { RxCrossCircled } from 'react-icons/rx';


const VerifyMail = () => {
    const {userId} = useParams();
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const expirationToken = queryParams.expires;
    const [success,setSuccess] = useState(false)
    const [fail,setFail] = useState(false)
    const navigate = useNavigate();
   
   
    const handleResendEmail = () => {
      console.log('handlllllleeeeee');
      
        axiosInstance.post('/resendVerificationEmail', { userId,})
          .then((response) => {
           
            toast.success('Verification email has been resent.');
          })
          .catch((error) => {
            navigate('/ register')
            if(error?.response?.data){
                toast.error(error?.response?.data?.errmsg)
            } 
          });
      };

    useEffect(()=>{
        console.log('userId',userId,expirationToken)
        axiosInstance.get(`/verifyMail/${userId}?expires=${expirationToken}`).then((response) => {
            setSuccess(true)
        })
        .catch ((error)=>{
            setFail(true)
            if(error?.response?.data){
                toast.error(error?.response?.data?.errmsg)
            }
        })
       },[])
    
      
    
  return (
    <div>
    <Toaster toastOptions={3000} />
    {success ? (
      <div className="bg-gray-100 h-screen ">
        <div className="bg-white p-6 md:mx-auto">
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Email verified successfully!</h3>
            <p className="text-gray-600 my-2">Thank you.</p>
            <p>Have a great day!</p>
            <div className="py-10 text-center">
              <button onClick={() => navigate('/userLogin')} className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
  
    <div className="h-screen bg-gray-100 ">
        <div className="bg-gray-100 justify-center items-center flex flex-col">
          <div className="bg-white  mx-auto">
            <RxCrossCircled className='text-9xl text-red-500 my-6'/>
            </div>
            <div className="text-center mx-auto">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Link has been expired, send mail again</h3>
              <p className="text-gray-600 my-2">Try again</p>
              <div className="py-10">
                <button onClick={handleResendEmail} className="px-12 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                  Send Mail
                </button>
              </div>
          </div>
        </div>
      </div>
  
    )}
  </div>
  )
    }  

export default VerifyMail