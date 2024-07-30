import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const ExperiencePreview = () => {
    const { resumeInfo } = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState([]);

    useEffect(() => {
        // Set the initial value from resumeInfo.attributes.Experience
        if (resumeInfo?.attributes?.Experience) {
            setExperienceList(resumeInfo.attributes.Experience);
        }
    }, [resumeInfo]);

    useEffect(() => {
        // Update the experience list if resumeInfo.experience changes
        if (resumeInfo?.experience) {
            setExperienceList(resumeInfo.experience);
        }
    }, [resumeInfo?.experience]);

    const formatDate = (date) => {
        if (!date) return '';
        return format(new Date(date), 'MMM yyyy');
    };

    return (
        <div className='my-6'>
            <h2 
                className='text-center font-bold text-sm mb-2'
                style={{ color: resumeInfo?.themeColor || resumeInfo?.attributes?.themeColor }}
            >
                Professional Experience
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor || resumeInfo?.attributes?.themeColor }} />

            {(experienceList || []).map((experience, index) => (
                <div className='my-4' key={index}>
                    <h2 
                        style={{ color: resumeInfo?.themeColor || resumeInfo?.attributes?.themeColor }}  
                        className='text-sm font-bold'
                    >
                        {experience?.title}
                    </h2>
                    <h2 className='text-xs flex justify-between'>
                        {experience?.companyName && (
                            <>
                                {experience?.companyName}
                                {(experience?.city || experience?.state) && ', '}
                            </>
                        )}
                        {experience?.city && (
                            <>
                                {experience.city}
                                {experience?.state && ', '}
                            </>
                        )}
                        {experience?.state && experience.state}
                        <span> 
                            {formatDate(experience?.startDate)} to {experience?.currentlyWorking ? 'Present' : formatDate(experience?.endDate)}
                        </span>
                    </h2>
                    <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: experience?.workSummary }}></div>
                </div>
            ))}
        </div>
    );
};

export default ExperiencePreview;
