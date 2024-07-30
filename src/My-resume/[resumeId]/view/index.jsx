import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'

import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import { DownloadIcon, Share2Icon } from 'lucide-react'

function ViewResume() {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(ResumeInfoContext)

    useEffect(() => {
        getResumeInfo();

    }, [])

    const getResumeInfo = () => {

        GlobalApi.GetResumeById(resumeId).then((resp) => {

            console.log(resp.data.data);
            setResumeInfo(resp.data.data)

        })
    }

    const HandleDownload=()=>{
        window.print();
    }
        return (
            <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
                <div>
                    <div id='no-print'>
                    <Header />
                    </div>
                    <div >
                        <div id='no-print'>
                        <h2 className='text-center text-2xl font-medium'>Your resume is ready 🥳 ! </h2>
                        <p className='text-center'>Your resume is ready to share and download </p>
                        <div className='flex justify-between px-16 my-10'>
                            <Button onClick={HandleDownload}> Download<DownloadIcon/></Button>
                            <RWebShare
        data={{
          text: "Check This out! My resume with the help of AI ...",
          url: import.meta.env.VITE_BASE_URL+"my-resume/"+resumeId+"/view",
          title: resumeInfo?.attributes?.firstName+" "+resumeInfo?.attributes?.lastName,
        }}
        onClick={() => console.log("shared successfully!")}
      >
                            <Button>  Share <Share2Icon/></Button>
                            </RWebShare>
                        </div>
                        </div>
                        <div className='m-12 '>
                        <div id='print-area'>
                            <ResumePreview />
                        </div>
                        </div>
                    </div>
                </div>
            </ResumeInfoContext.Provider>
        )
    }

    export default ViewResume