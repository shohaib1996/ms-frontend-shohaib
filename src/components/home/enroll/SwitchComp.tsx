import { Switch } from '@/components/ui/switch';
import React from 'react';

function SwitchComp({
    field,
    handleChangeField,
    isError,
    isPaymentOption,
    readOnly,
}: any) {
    const handleChange = (checked: any) => {
        handleChangeField(checked);
    };

    return (
        <div
            className={`${isPaymentOption && 'border border-forground-border p-5 bg-background rounded-md'} ${
                field?.value && 'border_primary'
            }`}
        >
            <label className='text-sm text-gray font-semibold'>
                {field?.label} {field?.isRequired ? '*' : ''}
            </label>
            <Switch
                readOnly={readOnly}
                checked={field?.value || false}
                className={`${isPaymentOption && 'is_paymet_option_switch'}`}
                onChange={handleChange}
            />
            {isError && (
                <div style={{ color: 'red' }}>This field is required</div>
            )}
        </div>
    );
}

export default SwitchComp;
