import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { DatePicker } from '@/components/global/DatePicket';

type TProps = {
    field: any;
    handleChangeField: (_: any) => void;
    isError: any;
    readOnly?: boolean;
};

function DateComp({ field, handleChangeField, isError, readOnly }: TProps) {
    const handleChange = (date: any, dateString?: any) => {
        handleChangeField(dateString);
    };

    dayjs.extend(utc);

    const dateValue = dayjs(field.value).utc().local();
    return (
        <div>
            <label className='text-sm text-gray font-semibold'>
                {field?.label} {field?.isRequired ? '*' : ''}
            </label>
            <DatePicker
                yearSelection
                className='bg-background pointer-events-none'
                value={dateValue ? dayjs(dateValue) : null}
                placeholder={field?.defaultValue}
                onChange={(date) =>
                    handleChange(date ? dayjs(date).format() : null)
                }
            />
            {isError && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    );
}

export default DateComp;
