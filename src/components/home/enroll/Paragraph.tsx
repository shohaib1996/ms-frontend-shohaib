import { Textarea } from '@/components/ui/textarea';
import React from 'react';

function Paragraph({ field, handleChangeField, isError, readOnly }: any) {
    const handleChange = (event: any) => {
        handleChangeField(event.target.value);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <label className='text-sm text-gray font-semibold'>
                {field?.label} {field?.isRequired ? '*' : ''}
            </label>
            <Textarea
                readOnly={readOnly}
                className='bg-background'
                placeholder={field?.defaultValue}
                value={field?.value || ''}
                onChange={handleChange}
            />
            {isError && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    );
}

export default Paragraph;
