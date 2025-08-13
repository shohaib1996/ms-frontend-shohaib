import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import instance from '@/lib/axios';
import GlobalModal from '@/components/global/GlobalModal';

interface SignatureCompProps {
    field: any;
    handleChangeField: (value: string) => void;
    isError?: boolean;
    readOnly?: boolean;
}

function SignatureComp({
    field,
    handleChangeField,
    isError,
    readOnly = false,
}: SignatureCompProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const sigCanvas = useRef<SignaturePad>(null);

    const showModal = () => {
        if (!readOnly) {
            setIsModalVisible(true);
        }
    };

    const dataURLtoBlob = (dataurl: string): Blob => {
        const [header, data] = dataurl.split(',');
        const mime = header.match(/:(.*?);/)?.[1] || 'image/png';
        const binary = atob(data);
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }
        return new Blob([array], { type: mime });
    };

    const clear = () => {
        if (!readOnly && sigCanvas.current) {
            sigCanvas.current.clear();
        }
    };

    const save = () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            // Get the raw canvas data instead of using getTrimmedCanvas
            const dataURL = sigCanvas.current.toDataURL('image/png');
            const blob = dataURLtoBlob(dataURL);
            handleUpload(blob as any);
        } else {
            toast.error('Please draw a signature before saving');
        }
    };

    const close = () => {
        setIsModalVisible(false);
    };

    const documentRef = useRef<HTMLInputElement>(null);
    const handleUpload = (files: File) => {
        if (files) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', files);
            instance
                .post('/settings/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/formdata',
                    },
                })
                .then((res) => {
                    handleChangeField(res.data.url);

                    setIsUploading(false);
                    close();
                })
                .catch((err) => {
                    setIsUploading(false);
                    console.error(err);

                    toast.error(
                        err?.response?.data?.error ||
                            'Something went wrong. Please check your file type',
                    );
                });
        }
    };

    return (
        <div className='space-y-2'>
            <label className='text-dark-gray' htmlFor='image'>
                {field?.label}
                {field?.isRequired && !readOnly && (
                    <span style={{ color: 'red' }}> *</span>
                )}
            </label>
            <input
                ref={documentRef}
                onChange={(e) =>
                    !readOnly &&
                    e.target.files &&
                    handleUpload(e.target.files[0])
                }
                style={{ display: 'none' }}
                id='image'
                type='file'
                disabled={readOnly}
            />

            {field?.description && <p>{field?.description}</p>}

            <GlobalModal
                title='Draw your signature'
                open={isModalVisible}
                resizable={false}
                setOpen={close}
                buttons={
                    <div className='flex items-center gap-2'>
                        <Button
                            className='sign_save'
                            key='save'
                            onClick={save}
                            isLoading={isUploading}
                        >
                            Save
                        </Button>
                        <Button
                            className='sign_clear'
                            key='clear'
                            onClick={clear}
                        >
                            Clear
                        </Button>
                        <Button
                            className='sign_close'
                            key='close'
                            onClick={close}
                        >
                            Close
                        </Button>
                    </div>
                }
            >
                <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                        width: 500,
                        height: 200,
                        className: 'signature-canvas',
                    }}
                />
            </GlobalModal>

            {isError && !readOnly && (
                <p style={{ color: 'red', margin: '5px 0' }}>
                    This field is required
                </p>
            )}
            <div
                style={{
                    height: '100px',
                    width: '100%',
                    color: '#26ac1f',
                    fontWeight: '500',
                    border: '2px dashed #26ac1f',
                    borderRadius: '7px',
                    cursor: readOnly ? 'default' : 'pointer',
                    backgroundColor: '#27ac1f1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: readOnly ? 0.85 : 1,
                }}
                onClick={showModal}
                className={cn(readOnly && 'pointer-events-none')}
            >
                {field.value ? (
                    <img
                        style={{
                            height: '100px',
                            objectFit: 'contain',
                            padding: '10px',
                        }}
                        src={field.value}
                        alt='Uploaded signature'
                    />
                ) : (
                    <span className='text-center w-full'>
                        {readOnly ? 'No Signature' : 'Click To Add Signature'}
                    </span>
                )}
            </div>
        </div>
    );
}

export default SignatureComp;
