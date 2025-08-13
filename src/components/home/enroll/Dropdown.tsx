import MultiSelect from '@/components/global/MultiSelect';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';

type TProps = {
    field: any;
    handleChangeField: (_: any) => void;
    isError: any;
    readOnly?: boolean;
};

function Dropdown({ field, handleChangeField, isError, readOnly }: TProps) {
    const handleChange = (value: any) => {
        handleChangeField(value);
    };

    return field?.isMulti ? (
        <div>
            <label className='text-sm text-gray font-semibold'>
                {field?.label} {field?.isRequired ? '*' : ''}
            </label>
            <MultiSelect
                readOnly={readOnly}
                options={field?.options?.map((f: any) => ({
                    value: f?.value,
                    label: f.value,
                }))}
                value={field?.value ? [field?.value] : []}
                onChange={handleChange}
            />
            {isError && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    ) : (
        <div>
            <label className='text-sm text-gray font-semibold'>
                {field?.label} {field?.isRequired ? '*' : ''}
            </label>
            <Select disabled={readOnly}>
                <SelectTrigger className='bg-background'>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent searchable={true}>
                    {field?.options?.map((option: any, i: number) => (
                        <SelectItem
                            className='pointer-events-none'
                            key={i}
                            value={option?.value}
                        >
                            {option.lable || option?.value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isError && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    );
}

export default Dropdown;
