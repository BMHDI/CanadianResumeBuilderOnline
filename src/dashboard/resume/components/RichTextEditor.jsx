import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import {
  EditorProvider,
  Editor,
  BtnBold,
  BtnItalic,
  Toolbar,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnClearFormatting,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = `
I need a detailed job description for the job title: {jobTitle}. Please provide 5-7 bullet points specifically related to the given job title. Each bullet point should describe a key responsibility or achievement in a clear and professional manner. The response should be in HTML format and follow this structure:

<ul>
<li>Provided exceptional customer service to [Number customers] daily via phone, email, and chat.</li>
<li>Resolved customer inquiries and complaints efficiently and professionally, achieving [Customer satisfaction rate]% customer satisfaction.</li>
<li>Processed customer orders, returns, and exchanges accurately and timely.</li>
<li>Maintained a thorough understanding of [Company Products/Services] and company policies to provide accurate information and support.</li>
<li>Collaborated with team members to ensure seamless customer service and shared knowledge.</li>
<li>Utilized [CRM System or Tools] to track customer interactions and manage accounts effectively.</li>
</ul>

Do not include any JSON format in your response. Provide the result only in HTML tags.
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, experienceList }) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const sanitizeHTML = (html) => {
    // Replace specific characters with an empty space
    return html.replace(/[{}[]"]/, '');
  };

  const generateSummaryFromAi = async () => {
    setLoading(true);
    
    const jobTitle = experienceList?.[index]?.title;
    if (!jobTitle) {
      toast('Please add a Job Title ...');
      setLoading(false);
      return;
    }
  
    const prompt = PROMPT.replace("{jobTitle}", jobTitle);
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const resp = await result.response.text();
      
      // Sanitize the response
      const sanitizedResp = sanitizeHTML(resp);
      console.log('Generated summary:', sanitizedResp);
      
      setValue(sanitizedResp);
      onRichTextEditorChange(index, sanitizedResp);
    } catch (error) {
      console.error('Error generating summary:', error);
      toast('Error generating summary');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs font-bold'>Summary</label>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(index, e.target.value);
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <Button
        onClick={generateSummaryFromAi}
        size='sm'
        variant='outline'
        className='flex mt-3 gap-2 border-primary text-primary'
      >
        {loading ? <LoaderCircle className='animate-spin' /> : <> <Brain className='h-4 w-4' /> Generate from AI</>}
      </Button>
    </div>
  );
}

export default RichTextEditor;