import { Checkbox } from '@/components/ui/checkbox';
import { TSingleRow } from '@/types/auth';
import React from 'react';

type TProps = {
    field: TSingleRow;
    handleChangeField: (_: any) => void;
    isError: any;
    readOnly?: boolean;
};

function CheckBoxComp({ field, handleChangeField, isError, readOnly }: TProps) {
    const handleChange = (value: any) => {
        handleChangeField(value);
    };
    return (
        <>
            {field?.options?.map((x, i) => (
                <Checkbox
                    key={i}
                    value={x.value}
                    readOnly={readOnly}
                    onCheckedChange={handleChange}
                />
            ))}
        </>
    );
}

export default CheckBoxComp;
