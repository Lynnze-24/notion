import React, { useEffect } from 'react'
import './Home.css'
import HomeNav from '../../components/landingRelated/nav/HomeNav'
import ContactForm from '../../components/landingRelated/contactForm/ContactForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

import {  useNavigate } from "react-router-dom";
import { signInWithGoogle } from '../../firebase'


export default function Home() {

    const navigate = useNavigate();

    const getStartedHandler = (e)=>{
        e.preventDefault();
        signInWithGoogle()
    }
    

    useEffect(()=>{
        const userValid = localStorage.getItem('userValidTime');
        if(userValid > Date.now()){
            console.log('redirect')
            navigate('/dashboard')
        }
    },[])


    return (
        <div className='home'>
            <HomeNav />
            <main>
                <section className='hero'>
                    <div className='hero-content'>
                        <h1>Plan everything with OrganizerX</h1>
                        <p>Use your time effectively by planning your next move. Without planning, you might lose your focus. Let us take care of organizing tasks and help you improve your productivity.</p>
                        <button onClick={getStartedHandler}>Get Started</button>
                    </div>
                    <div className='hero-image'>
                        <img src='hero.png' alt='human' />
                    </div>
                </section>
                <section id='about'>
                    <h1>What is Organizer X?</h1>
                    <p>Organizer X is a cutting-edge planner app designed to revolutionize the way users organize tasks and plan for any topic, all while offering a seamless user experience. With a sleek and intuitive interface, Organizer X empowers individuals to take control of their productivity and efficiently manage their projects and personal goals. Unlike traditional calendar-focused apps, Organizer X is tailored for those seeking a comprehensive organizational tool that goes beyond mere scheduling. With a powerful task management system, users can effortlessly create, categorize, and prioritize tasks, ensuring nothing slips through the cracks.</p>
                    <p>With Organizer X, the possibilities are endless. Say goodbye to scattered to-do lists and disjointed planning efforts; embrace a new era of efficiency and organization. Join us today and experience a planner app that caters to your unique needs, helping you stay on top of your tasks and unlock your full potential.</p>
                </section>

                <section id='contact'>
                    <h1>Contact Us</h1>
                    <div className='contact-wrap'>
                        <ContactForm />
                        <div className='contact-content'>
                            <img src='logo.png'  alt='OrganizerX'/>
                            <div className='contact-platforms'>
                                <FontAwesomeIcon icon={faEnvelope} />
                                 <p>organizerX@gmail.com</p>
                            </div>
                            <div className='contact-platforms'>
                                 <FontAwesomeIcon icon={faPhone}/>
                                 <p>+959-796578327</p>
                            </div>
                        </div>
                    </div>
                    

                </section>
            </main>
            <footer>
               <h3>All rights reserved</h3>
               <p> © organizerX2023</p>
            </footer>
        </div>
    )
}
