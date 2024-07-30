import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  // Check if resumeInfo is defined before using it
  if (!resumeInfo) {
    return <div>Loading...</div>;
  }

  console.log('resumepreview', resumeInfo);

  return (
   <div className=' rounded-lg border border-gray-300 p-3  '>
    <div className='h-full p-2 border-t-[10px]'
      style={{
        borderColor: resumeInfo?.themeColor ||resumeInfo?.attributes?.themeColor
      }}>
      {/* Personal Detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* Summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Education */}
      <EducationPreview resumeInfo={resumeInfo} />

      {/* Skills */}
      <SkillsPreview resumeInfo={resumeInfo} />
    </div>
    </div>
  );
}

export default ResumePreview;
