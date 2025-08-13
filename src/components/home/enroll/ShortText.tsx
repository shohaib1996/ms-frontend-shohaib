import { Input } from '@/components/ui/input';
import React from 'react';
import PhoneInput from 'react-phone-number-input';

function ShortText({ field, handleChangeField, isError, readOnly }: any) {
    const handleChange = (event: any) => {
        handleChangeField(event.target.value);
    };

    const isPhoneNumber =
        field?.label === 'Contact Number' ||
        field?.label === 'WhatsApp Number' ||
        field?.label === 'Phone';
    const isShortText = field?.type === 'shortText';
    const isNumber = field?.type === 'number' && !isPhoneNumber;

    return (
        <div className='space-y-2'>
            <label className='text-sm text-gray font-semibold'>
                {field?.label} {field?.isRequired ? '*' : ''}
            </label>

            {isPhoneNumber ? (
                <PhoneInput
                    readOnly={readOnly}
                    defaultCountry='US'
                    onlyCountries={['US', 'CA', 'BD']}
                    className='h-10 bg-background border border-forground-border rounded-lg px-2 text-sm text-dark-gray [&_input]:outline-none'
                    countryCallingCodeEditable={false}
                    international
                    placeholder='Enter phone number'
                    value={field?.value}
                    onChange={(phone) => handleChangeField(phone)}
                />
            ) : (
                (isShortText || isNumber) && (
                    <Input
                        readOnly={readOnly}
                        className='bg-background text-gray h-10'
                        placeholder={field?.defaultValue}
                        type={isNumber ? 'number' : 'text'}
                        value={field?.value || ''}
                        onChange={handleChange}
                    />
                )
            )}

            {isError && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    );
}

export default ShortText;
