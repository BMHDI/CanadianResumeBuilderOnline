import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: ''
};

function Experience({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.attributes?.Experience) {
      setExperienceList(resumeInfo?.attributes?.Experience);
    }
  }, [resumeInfo]);

  const handleInputChange = (index, event) => {
    console.log(experienceList);
    const { name, value } = event.target;
    setExperienceList(prevExperienceList =>
      prevExperienceList.map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleRichTextEditor = (index, value) => {
    setExperienceList(prevExperienceList =>
      prevExperienceList.map((item, idx) =>
        idx === index ? { ...item, workSummary: value } : item
      )
    );
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const removeLastExperience = () => {
    setExperienceList(prevExperienceList => prevExperienceList.slice(0, -1));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = { data: { Experience: experienceList } };
    console.log('Data being sent to server:', data);
  
    try {
      const resp = await GlobalApi.UpdateResumeDetail(params?.resumeId, data);
      setLoading(false);
      toast("Your information has been saved.");
      enableNext(true);
      setResumeInfo(prevResumeInfo => ({
        ...prevResumeInfo,
        attributes: {
          ...prevResumeInfo.attributes,
          Experience: experienceList
        }
      }));
    } catch (error) {
      setLoading(false);
      console.error('Error saving experience:', error);
  
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        toast(`Error saving experience: ${error.response.data.message || 'Internal Server Error'}`);
      } else if (error.request) {
        console.error('Request data:', error.request);
        toast('Error saving experience: No response from server');
      } else {
        console.error('Error message:', error.message);
        toast(`Error saving experience: ${error.message}`);
      }
    }
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg mt-10'>Professional Experience</h2>
      <p>Please enter your job title, company, duration, and key responsibilities.</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 my-5 border p-3 rounded-lg'>
              <div>
                <label className='font-bold text-xs'>Job Title</label>
                <Input
                  onChange={(event) => { handleInputChange(index, event); enableNext(false); }}
                  name='title'
                  placeholder='Enter your job title'
                  value={item.title}
                />
              </div>
              <div>
                <label className='font-bold text-xs'>Company Name</label>
                <Input
                  onChange={(event) => { handleInputChange(index, event); enableNext(false); }}
                  name='companyName'
                  placeholder='Enter company name'
                  value={item.companyName}
                />
              </div>
              <div>
                <label className='font-bold text-xs'>City</label>
                <Input
                  onChange={(event) => { handleInputChange(index, event); enableNext(false); }}
                  name='city'
                  placeholder='Enter city'
                  value={item.city}
                />
              </div>
              <div>
                <label className='font-bold text-xs'>Province</label>
                <Input
                  onChange={(event) => { handleInputChange(index, event); enableNext(false); }}
                  name='state'
                  placeholder='Enter state'
                  value={item.state}
                />
              </div>
              <div>
                <label className='font-bold text-xs'>Start Date</label>
                <Input
                  type='date'
                  onChange={(event) => { handleInputChange(index, event); enableNext(false); }}
                  name='startDate'
                  placeholder='Enter start date'
                  value={item.startDate}
                />
              </div>
              <div>
                <label className='font-bold text-xs'>End Date</label>
                <Input
                  type='date'
                  onChange={(event) => { handleInputChange(index, event); enableNext(false); }}
                  name='endDate'
                  placeholder='Enter end date'
                  value={item.endDate}
                />
              </div>
              <div className='col-span-2'>
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummary}
                  onRichTextEditorChange={(index, value) => {
                    handleRichTextEditor(index, value);
                    enableNext(false);
                  }}
                  experienceList={experienceList}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between gap-3 mt-10'>
        <div className='flex gap-3'>
          <Button onClick={addNewExperience} className='text-primary' variant='outline'>+ Add experience</Button>
          <Button onClick={removeLastExperience} className='text-red-500' variant='outline'>Delete</Button>
        </div>
        <Button disabled={loading} type='submit' onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
