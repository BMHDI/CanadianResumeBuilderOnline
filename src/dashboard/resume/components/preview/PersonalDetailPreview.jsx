import { MailIcon, PhoneCallIcon } from 'lucide-react'
import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
    console.log('personaldetailpreview'+resumeInfo)
  return (
    <div>
        <h2 className='font-bold txt-xl text-center'
        style={{color: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor}}> {resumeInfo?.attributes?.firstName} {resumeInfo?.attributes?.lastName}</h2>
        <h2 className='text-center text-sm font-medium'
        >{resumeInfo?.attributes?.jobTitle}</h2>
        <h2 className='text-center font-normal text-xs'  style={{color: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor}}>{resumeInfo?.attributes?.address}</h2>
       <div className='flex justify-between'>
       <h2 className='flex font-normal text-xs'  style={{color: resumeInfo?.themeColor}}> <MailIcon size={14}/> : {resumeInfo?.attributes?.email}</h2>
        <h2 className='flex  font-normal text-xs'  style={{color: resumeInfo?.themeColor}}><PhoneCallIcon size={14}/>: {resumeInfo?.attributes?.phone}</h2>
        
        
       </div>
       <hr className='border-[1.5px] my-2' style={{borderColor: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor}}/>
    </div>
    
  )
  
}

export default PersonalDetailPreview
