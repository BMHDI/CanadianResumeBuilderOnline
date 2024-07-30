import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function Skills({ enableNext }) {
    const [skillsList, setSkillsList] = useState([]);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    // Update skillsList when resumeInfo changes
    useEffect(() => {
        if (resumeInfo) {
            setSkillsList(resumeInfo.attributes.skills || []);
        }
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
        enableNext(false);
    };

    const addNewSkill = () => {
        setSkillsList([...skillsList, { name: '', rating: 0 }]);
        enableNext(false);
    };

    const removeSkill = () => {
        setSkillsList(skillsList.slice(0, -1));
        enableNext(false);
    };

    const onSave=()=>{

        setLoading(true);
        const data={
            data:{
                skills:skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId,data)
        .then(resp=>{
            enableNext(true);
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        },(error)=>{
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }
    

    // Update resumeInfo with skillsList
    useEffect(() => {
        setResumeInfo(prevInfo => ({
            ...prevInfo,
            attributes: {
                ...prevInfo.attributes,
                skills: skillsList
            }
        }));
    }, [skillsList, setResumeInfo]);

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills and languages</h2>
            <p className='mb-2'>Add Your top professional key skills you can include languages as well !</p>

            <div>
                {skillsList.map((item, index) => (
                    <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                        <div>
                            <label className='text-xs font-bold'>Name</label>
                            <Input
                                className="w-full"
                                value={item.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <Rating
                            style={{ maxWidth: 120 }}
                            value={item.rating}
                            onChange={(v) => handleChange(index, 'rating', v)}
                        />
                    </div>
                ))}
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={addNewSkill} className="text-primary">+New Skill/Language</Button>
                    <Button variant="outline" onClick={removeSkill} className="text-red-500">Delete</Button>
                </div>
                <Button disabled={loading} onClick={onSave}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
