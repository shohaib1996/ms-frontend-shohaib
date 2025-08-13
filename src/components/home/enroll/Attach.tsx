import { GlobalImage } from '@/components/global/Image/GlobalImage';
import { Input } from '@/components/ui/input';
import instance from '@/lib/axios';
import { TSingleRow } from '@/types/auth';
import axios from 'axios';
import {
    Loader,
    Trash,
    FileText,
    FileImage,
    File,
    FileSpreadsheet,
} from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

type TProps = {
    field: TSingleRow;
    handleChangeField: (_: any) => void;
    isError: any;
    readOnly?: boolean;
};

function Attach({
    field,
    handleChangeField,
    isError,
    readOnly = false,
}: TProps) {
    const [isUploading, setIsUploading] = useState(false);

    const handleChange = (value: any) => {
        if (!readOnly) {
            handleChangeField(value);
        }
    };

    const documentRef = useRef<HTMLInputElement>(null);

    const handleUpload = (files?: File) => {
        if (!files || readOnly) {
            return;
        }

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
            })
            .catch((err) => {
                if (documentRef?.current) {
                    documentRef.current.value = '';
                }
                setIsUploading(false);
                toast.error(
                    'something went wrong, Please check your file type',
                );
            });
    };

    const handleLabelClick = (e: React.MouseEvent) => {
        if (readOnly) {
            e.preventDefault();
        }
    };

    // Function to determine if the file is an image
    const isImageFile = (url: string): boolean => {
        const extension = url.split('.').pop()?.toLowerCase() || '';
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(
            extension,
        );
    };

    // Function to get appropriate icon based on file type
    const getFileIcon = (url: string) => {
        const extension = url.split('.').pop()?.toLowerCase() || '';

        switch (extension) {
            case 'pdf':
                return <FileText size={20} style={{ color: '#f5222d' }} />;
            case 'xls':
            case 'xlsx':
            case 'csv':
                return (
                    <FileSpreadsheet size={20} style={{ color: '#52c41a' }} />
                );
            case 'doc':
            case 'docx':
                return <FileText size={20} style={{ color: '#1890ff' }} />;
            default:
                return <File size={20} style={{ color: '#595959' }} />;
        }
    };

    // Get filename from URL
    const getFileName = (url: string): string => {
        return url.split('/').pop() || 'file';
    };

    return (
        <div className='space-y-2'>
            <label
                htmlFor='image'
                onClick={handleLabelClick}
                className='text-dark-gray'
            >
                {field?.label}
                {field?.isRequired && <span style={{ color: 'red' }}> *</span>}
                <Input
                    ref={documentRef}
                    onChange={(e) => handleUpload(e.target.files?.[0])}
                    style={{ display: 'none' }}
                    id='image'
                    type='file'
                    disabled={readOnly}
                />
            </label>

            {field?.description && <p>{field?.description}</p>}
            <div>
                {field?.value ? (
                    <span
                        style={{
                            padding: '10px',
                            background: '#27ac1f1a',
                            marginTop: '0',
                            borderRadius: '7px',
                            display: 'inline-block',
                            maxHeight: '100px',
                            height: '100px',
                        }}
                    >
                        {isImageFile(field.value) ? (
                            <div>
                                <GlobalImage
                                    src={field.value}
                                    alt='Uploaded file'
                                    style={{
                                        width: '100%',
                                        height: '80px',
                                        objectFit: 'contain',
                                        cursor: 'pointer',
                                    }}
                                    height={720}
                                    width={1080}
                                    onDownload={() =>
                                        window.open(field.value, '_blank')
                                    }
                                    downloadable
                                />
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {getFileIcon(field.value)}
                                <a
                                    href={field.value}
                                    target='_blank'
                                    rel='noreferrer'
                                    style={{ marginLeft: '8px' }}
                                >
                                    {getFileName(field.value)}
                                </a>
                            </div>
                        )}
                        {!readOnly && (
                            <Trash
                                onClick={() => handleChange('')}
                                style={{
                                    marginLeft: '10px',
                                    cursor: 'pointer',
                                }}
                            />
                        )}
                    </span>
                ) : (
                    <label
                        className='upload_button id_upload'
                        htmlFor='image'
                        onClick={handleLabelClick}
                        style={{
                            maxWidth: '100%',
                            border: '2px dashed #27ac1f',
                            marginTop: 0,
                            marginBottom: 4,
                            padding: '30px',
                            backgroundColor: '#27ac1f1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '7px',
                            height: '100px',
                            color: '#26ac1f',
                            cursor: readOnly ? 'default' : 'pointer',
                        }}
                    >
                        <span style={{ marginRight: '5px' }}>
                            Click to Upload (jpg/png/pdf){' '}
                        </span>
                        {isUploading && (
                            <Loader
                                className='animate-spin'
                                style={{ marginLeft: '10px' }}
                            />
                        )}
                    </label>
                )}
            </div>
            {isError && !readOnly && (
                <p style={{ color: 'red', margin: '5px 0' }}>
                    This field is required
                </p>
            )}
        </div>
    );
}

export default Attach;
