
import { useState } from "react";
import styles from "../Styles/Home_page.module.css"
import { LandingNavbar } from "../Components/Nav";
import Hero_sec from "../assets/Hero_sec.png"
import { useNavigate } from "react-router";

export function Home_page(){

    const navigate = useNavigate()

 return(
    <div className={styles.Home_page_wrapper}>
        <LandingNavbar/>

      <div className={styles.Hero_section}>
        <div className={styles.CTA_wrapper}>
<h1>Build the business you’ve always wanted.</h1>
<span>Best Way to reach customers,No coding or design skills required. Just your passion and our platform.</span>
<div className={styles.CTA_btns}>
                <button className={styles.ghost} onClick={() => navigate('/Sign-in')}>Sign in</button>
                <button className={styles.primary} onClick={() => navigate('/Sign-in')}>Get started →</button>
</div>
        </div>

        <div className={styles.animation_wrapper}>
<img src={Hero_sec}/>
        </div>
      </div>


    </div>
 )



}