'use client';

import type React from 'react';
import { useRef, useState, useId } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import axios from 'axios';
import { Card } from '@/components/ui/card';

interface UploadFilesProps {
    attachment: string | string[];
    setAttachment: React.Dispatch<
        React.SetStateAction<string | string[] | null>
    >;
    label?: string;
    placeholder?: string;
    accept?: string;
    fileType?: string;
    fileName?: string;
    htmlFor?: string;
    multiple?: boolean;
}

const UploadFiles = ({
    attachment,
    setAttachment,
    label = '',
    placeholder,
    accept,
    fileType,
    fileName,
    htmlFor,
    multiple = false,
}: UploadFilesProps) => {
    // Generate a unique ID for this component instance
    const uniqueId = useId();
    const inputId = htmlFor || `attachment-${uniqueId}`;

    const [isFileUploading, setIsFileUploading] = useState(false);
    const attachmentRef = useRef<HTMLInputElement>(null);

    // Use a consistent API endpoint for both single and multiple uploads
    const API_ENDPOINT = '/document/useranydocument';

    const handleUpload = async (file: File | null) => {
        if (!file) {
            return;
        }

        setIsFileUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('path', fileName || '');

        try {
            const { data } = await axios.post(API_ENDPOINT, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (multiple) {
                // If multiple is true, append to array
                setAttachment((prev) => {
                    const prevArray = Array.isArray(prev)
                        ? prev
                        : prev
                          ? [prev]
                          : [];
                    return [...prevArray, data.fileUrl];
                });
            } else {
                // If multiple is false, just set the single value
                setAttachment(data.fileUrl);
            }

            if (attachmentRef.current) {
                attachmentRef.current.value = '';
            }
        } catch (err) {
            console.error('Upload error:', err);
            toast.error('Upload failed');

            if (attachmentRef.current) {
                attachmentRef.current.value = '';
            }
        } finally {
            setIsFileUploading(false);
        }
    };

    const handleMultipleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        setIsFileUploading(true);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('path', fileName || '');

                try {
                    const { data } = await axios.post(API_ENDPOINT, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return data.fileUrl;
                } catch (error) {
                    console.error(`Failed to upload ${file.name}:`, error);
                    throw new Error(`Failed to upload ${file.name}`);
                }
            });

            try {
                const uploadedUrls = await Promise.all(uploadPromises);

                setAttachment((prev) => {
                    const prevArray = Array.isArray(prev)
                        ? prev
                        : prev
                          ? [prev]
                          : [];
                    return [...prevArray, ...uploadedUrls];
                });
            } catch (error) {
                console.error('One or more uploads failed:', error);
                toast.error('One or more files failed to upload');
            }

            if (attachmentRef.current) {
                attachmentRef.current.value = '';
            }
        } catch (err) {
            console.error('Multiple upload error:', err);
            toast.error('One or more files failed to upload');

            if (attachmentRef.current) {
                attachmentRef.current.value = '';
            }
        } finally {
            setIsFileUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (multiple) {
            handleMultipleUpload(e.target.files);
        } else {
            handleUpload(e.target.files?.[0] || null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        if (multiple) {
            handleMultipleUpload(e.dataTransfer.files);
        } else {
            handleUpload(e.dataTransfer?.files[0] || null);
        }
    };

    const removeAttachment = (url: string) => {
        if (multiple) {
            setAttachment((prev) => {
                if (!Array.isArray(prev)) {
                    return [];
                }
                return prev.filter((item) => item !== url);
            });
        } else {
            setAttachment(null);
        }
    };

    const renderAttachment = (att: string) => {
        const extension = att.split('.').pop();
        return (
            <div
                className='relative p-1 bg-background rounded-md w-[140px] h-[120px] shadow-lg border'
                key={att}
            >
                <div className='flex flex-col items-center h-full w-full'>
                    <Image
                        width={150}
                        height={100}
                        className='object-contain rounded-md h-[calc(100%-20px)] w-full'
                        src={
                            extension === 'docx'
                                ? '/doc.png'
                                : extension === 'doc'
                                  ? '/doc.png'
                                  : extension === 'pdf'
                                    ? '/pdf.png'
                                    : extension === 'txt'
                                      ? '/txt-file.png'
                                      : extension === 'zip'
                                        ? '/zip.png'
                                        : extension === 'xls'
                                          ? '/sheets.png'
                                          : extension === 'xlsx'
                                            ? '/sheets.png'
                                            : att
                        }
                        alt='Image'
                    />
                    <span className='whitespace-nowrap overflow-hidden text-ellipsis text-center text-xs w-full border-t pt-[2px] mt-[2px]'>
                        {att.split('-').pop()}
                    </span>
                </div>
                <div
                    className='absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full shadow bg-danger text-pure-white cursor-pointer'
                    onClick={() => removeAttachment(att)}
                >
                    <X size={14} />
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <label className='form_label'>{label}</label>
                <label
                    className='block max-w-full border-2 border-dashed border-primary mt-2 mb-1 p-[30px] bg-primary-light flex min-h-[115px] items-center justify-center rounded-[10px] cursor-pointer'
                    htmlFor={inputId}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    {isFileUploading ? (
                        <div>
                            <div className='flex justify-center items-center'>
                                <div className='animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full ml-[10px]' />
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center'>
                            <p className='text-center text-[15px] font-medium text-gray'>
                                {placeholder || 'Upload Attachment'}
                            </p>
                            <p className='text-center text-[15px] text-gray'>
                                Or
                            </p>
                            <p className='text-center text-[15px] font-medium text-primary-white'>
                                Drag and Drop
                            </p>
                        </div>
                    )}
                </label>

                <input
                    disabled={isFileUploading}
                    ref={attachmentRef}
                    onChange={handleFileChange}
                    className='hidden'
                    id={inputId}
                    type='file'
                    accept={accept}
                    multiple={multiple}
                />
                <p className='text-[12px] mb-[3px] text-gray'>
                    Upload JPEG/PNG/PDF/Docs file (Max file size 10 MB)
                </p>
            </div>

            {/* Render attachments */}
            {multiple ? (
                <div className='flex flex-wrap gap-4 mt-4'>
                    {Array.isArray(attachment) &&
                        attachment.map((url) => renderAttachment(url))}
                </div>
            ) : (
                attachment && renderAttachment(attachment as string)
            )}
        </>
    );
};

export default UploadFiles;
