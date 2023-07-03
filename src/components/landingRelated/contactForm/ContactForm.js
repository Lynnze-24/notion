import React, { useRef, useState } from 'react'
import './ContactForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons'
import MessageAlert from '../../messageAlert/MessageAlert';

function validateEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export default function ContactForm() {

    const [formParas, setFormParas] = useState({
        name:'',
        email:'',
        message:'',
        isValid:false
    })
    const [loading, setloading] = useState(false)
    const [messageAlert, setmessageAlert] = useState({text:'',mode:'error'})
   

    const changeHandler=(e)=>{
        setFormParas((prev) => {
            const newParas = {
                ...prev,
                [e.target.name]:e.target.value
            }
            const isValid = newParas.name !=='' && newParas.message !=='' && validateEmail(newParas.email)
            return{
                ...newParas,
                isValid
            }
    })
    }   

    const timeRef = useRef()

    const clickHandler = async(e)=>{
        e.preventDefault();
        console.log(formParas,'submit')
            setloading(true)
            if(timeRef.current){
                clearTimeout(timeRef.current)
                timeRef.current = null
            }
            try{
                let {email,message,name} = formParas;
                let postData = {
                    email,
                    subject:`message to OrganizerX from ${name}`,
                    message
                }
                const response = await fetch('https://mailingservice.vercel.app/mail',{
                method:'POST',
                body:JSON.stringify(postData),
                headers: {
                "Content-Type": "application/json",
                },
                mode:'cors'
            })
            if(response.ok){
                setmessageAlert({
                    text:'Your message was sent successfully.',
                    mode:'success'
                })
                setFormParas({
                    name:'',
                    email:'',
                    message:'',
                    isValid:false
                })
            }else{
                 setmessageAlert({
                    text:'Your message was not sent.',
                    mode:'error'
                })
            }   
             
            }catch(e){
                setmessageAlert({
                     text:'Your message was not sent.',
                     mode:'error'
                })
            }finally{
                setloading(false)
                timeRef.current= setTimeout(()=>{
                    setmessageAlert({text:'',mode:'error'})
                    timeRef.current = null;
                },2000)
                
            }
    }

  return (
    <form id='contactForm'>
        <input placeholder='Your Name' value={formParas.name} onChange={changeHandler} type='text' name='name' />
        <input placeholder='Your Email' value={formParas.email} onChange={changeHandler} type='text' name='email' />
        <textarea placeholder='Message...' value={formParas.message} onChange={changeHandler} type='text' name='message' ></textarea>
        <button disabled={!formParas.isValid && !loading} type='button' onClick={clickHandler} >Send Message  <FontAwesomeIcon spinPulse={loading} className='fontawesome' icon={loading?faSpinner:faPaperPlane} /></button>
   { messageAlert.text && (<MessageAlert message={messageAlert.text} mode={messageAlert.mode} />)}
    </form>
  )
}
