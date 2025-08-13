import React from 'react';

function HeadingComp({ field, isPaymentOption }: any) {
    return (
        <div
            className={`${isPaymentOption && 'bg-background p-4 rounded-md border border-forground-border'}`}
        >
            <h2>{field?.label}</h2>
            {field?.description && <h4>{field?.description}</h4>}
        </div>
    );
}

export default HeadingComp;
