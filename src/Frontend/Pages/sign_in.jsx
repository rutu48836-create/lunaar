
import { useState } from "react";
import { supabase } from "../Components/supabase";
import styles from "../Styles/sign_in.module.css"
import { SendHorizonal } from "lucide-react";
import {useNavigate} from "react-router-dom"
import google from "../assets/google.png"
export function Sign_In(){

 const [email,setEmail] = useState("")
 const navigate = useNavigate()

 async function login(email){

      const { error } = await supabase.auth.signInWithOtp({
    email
  })

  if (error) {
    alert("Error sending OTP")
  } else {
    alert("Check your email for login link")
  }

 }

const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })

  if(error){
    alert("failed to register")
    return
  }

  else{
      navigate('/Dashboard')
  }

}

 return (
    <>
    
    <div className={styles.Sign_in_wrapper}>
      <div className={styles.Sign_in_head}>
        <h2 onClick={() => navigate('/')}>Home</h2><span></span>
      </div>
        <div className={styles.Main_form}>
        <div className={styles.logo_card}><SendHorizonal size={26}/></div>
            <h2>Sign Up / Login</h2>
            <span>Create a account or login in seconds</span>
            <input type="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/> <br></br>
            <button onClick={() => login(email)}>Continue</button>

            <h3 style={{display:"flex",placeSelf:"center",fontSize:"12px",marginTop:"20px",color:"#ccc"}}>or</h3>
           
           <div className={styles.Sign_in_provider}>
            <div className={styles.provider_card} onClick={handleGoogleLogin}>Continue with<img src={google} style={{width:"30px",height:"30px"}}/></div>
           </div>

        </div>
    </div>
    
    </>
 )


}