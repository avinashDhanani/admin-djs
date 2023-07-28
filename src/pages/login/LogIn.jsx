import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginForm,
  ResetPassword,
} from "../../components/authComponents/login";

const LogIn = () => {
  const [isShow, setIsShow] = useState(0);
  const navigate= useNavigate()
  const user = JSON.parse(localStorage.getItem("user")) || null; 
  const [emailForResetPass, setEamilResetPass] = useState("");
  
  useEffect(() => {
    document.title = "DJ-login";
    if(user) navigate('/admin-dashboard')
  }, []);

  return (
    <main className="bg-background-register font-roboto  bg-cover bg-center bg-no-repeat h-screen w-full text-white">
      <div className=" flex justify-center  flex-col items-center relative h-full">
        
        <div
          className="w-[57.688rem] h-[27.625rem] max-lg:w-[30rem] max-lg:h-[41rem] max-sm:w-[100%] max-sm:h-[40%]
           border border-[#FFFFFF] rounded-[76px] relative bg-trans-card"
        >
          {isShow === 0 ? (
           <div
           className="flex  max-sm:hidden flex-col justify-center max-lg:relative  
            h-full text-black-dark ml-[3.563rem] flex-wrap"
         >
           <h2
             className="leading-[2.7rem]  max-lg:absolute  bottom-[1rem] font-bold w-[max-content] 
               max-sm:text-[2rem] text-[2.5rem] "
           >
             <span>Admin</span>{" "}
             <span className="block">Login</span>
           </h2>
         </div>
          ) : (
            <div
              className="flex   max-sm:hidden flex-col justify-center max-lg:relative  
             h-full text-black-dark ml-[3.563rem] flex-wrap"
            >
              <h2
                className="leading-[2.7rem]  max-lg:absolute  bottom-[1rem] font-bold w-[max-content] 
            max-sm:text-[2rem] text-[2.5rem] "
              >
                <span>Forgot Your</span>{" "}
                <span className="block">Password?</span>
              </h2>
            </div>
          )}
          {/* Form card */}
          {isShow === 0 && (
            <LoginForm
              setIsShow={setIsShow}
              setEamilResetPass={setEamilResetPass}
            />
          )}
          {isShow === 1 && (
            <ResetPassword
              emailForResetPass={emailForResetPass}
              setIsShow={setIsShow}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default LogIn;
