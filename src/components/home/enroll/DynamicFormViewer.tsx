'use client';

import { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import StepForm from './StepForm';
import CustomMarkdownPreview from '@/components/lexicalEditor/renderer/CustomMarkdownPreview/CustomMarkdownPreview';
import GlobalModal from '@/components/global/GlobalModal';
import FullScreenModal from '@/components/global/FullScreenModal/FullScreenModal';

interface FormStep {
    label: string;
    fields: any[];
    [key: string]: any;
}

interface DynamicFormViewerProps {
    formSteps: FormStep[];
    handleChangeField: (_: {
        rowId: string;
        stepId: string;
        fieldId: string;
        value: any;
    }) => void;
    handleSubmit: () => void;
    isLoading: boolean;
    company?: {
        name: string;
    };
    term?: { description: string; title: string };
    hasChanges?: () => boolean;
    handleBack: () => void;
}

const DynamicFormViewer = ({
    formSteps,
    handleChangeField,
    handleSubmit,
    isLoading,
    company = { name: 'Company' },
    term = { description: '', title: '' },
    hasChanges = () => true,
    handleBack,
}: DynamicFormViewerProps) => {
    console.log({ term });
    const [current, setCurrent] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [checkBoxError, setCheckBoxError] = useState(false);
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

    const childRef = useRef<any>(null);

    const items = formSteps?.map((item) => ({
        key: item?.label,
        title: item?.label,
        content: (
            <StepForm
                readOnly={false}
                ref={childRef}
                handleChangeField={handleChangeField}
                step={item as any}
            />
        ),
    }));

    const next = () => {
        if (childRef.current?.validate()?.success) {
            setCurrent(current + 1);
        }
    };

    const prev = () => {
        if (current === 0) {
            handleBack();
            return;
        }
        setCurrent(current - 1);
    };

    const handleFinalSubmit = () => {
        if (formSteps?.length - 1 === current && !accepted) {
            setCheckBoxError(true);
            return;
        }

        setCheckBoxError(false);

        if (!hasChanges()) {
            toast.warning(
                'No changes detected. Please modify the form before submitting.',
            );
            return;
        }

        if (childRef.current?.validate()?.success) {
            handleSubmit();
        }
    };

    return (
        <div className='pt-4'>
            <div className='flex justify-between flex-auto gap-4'>
                {items?.map((item, index) => (
                    <div key={index}>
                        <div className='flex flex-col items-center w-fit text-center'>
                            <div
                                className={cn(
                                    'bg-secondary transition-all ease-in-out duration-200 text-base font-semibold border size-7 rounded-full text-primary-white flex justify-center items-center',
                                    {
                                        'bg-primary text-white':
                                            index <= current,
                                    },
                                )}
                            >
                                {current >= index ? (
                                    <Check size={18} />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            <p className='text-sm text-dark-gray dark:text-slate-300'>
                                {item.title}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='border rounded-md bg-white dark:bg-slate-800 p-4 mt-4 shadow-sm'>
                {items[current]?.content}

                {formSteps?.length - 1 === current && (
                    <div className='flex items-start gap-2 mt-6'>
                        <Checkbox
                            id='terms'
                            checked={accepted}
                            onCheckedChange={(checked) => {
                                setAccepted(checked === true);
                                if (checked) {
                                    setCheckBoxError(false);
                                }
                            }}
                            className='mt-1'
                        />
                        <div className='space-y-1'>
                            <label
                                htmlFor='terms'
                                className='font-medium text-sm text-dark-gray leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                I AGREE to accept {company?.name}&apos;s{' '}
                                <button
                                    onClick={() => setIsTermsModalVisible(true)}
                                    className='text-primary-white underline cursor-pointer'
                                >
                                    Terms and Conditions
                                </button>
                            </label>
                            {checkBoxError && (
                                <p className='text-sm text-red-500'>
                                    Please accept the terms and conditions
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className='flex justify-between py-4'>
                <Button
                    variant='outline'
                    onClick={prev}
                    className='border-primary-white text-primary-white hover:bg-primary/10'
                >
                    {current === 0 ? 'Back' : 'Previous'}
                </Button>

                {current < items.length - 1 ? (
                    <Button onClick={next}>Next</Button>
                ) : (
                    <Button disabled={isLoading} onClick={handleFinalSubmit}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </Button>
                )}
            </div>
            <GlobalModal
                className='w-[1280px] mt-[50px] h-[calc(100%-100px)]'
                open={isTermsModalVisible}
                setOpen={setIsTermsModalVisible}
                title='Terms and Conditions'
                allowFullScreen={false}
            >
                {term ? (
                    // <div dangerouslySetInnerHTML={{ __html: term }} />
                    <CustomMarkdownPreview text={term?.description} />
                ) : (
                    <p>
                        By accepting these terms, you agree to abide by the
                        company&apos;s policies and procedures. Please read the
                        full terms and conditions carefully before proceeding.
                    </p>
                )}
            </GlobalModal>
            {/* <Dialog
                open={isTermsModalVisible}
                onOpenChange={setIsTermsModalVisible}
            >
                <DialogContent className='max-w-3xl max-h-[80vh] overflow-y-auto'>
                    <DialogHeader>
                        <DialogTitle>Terms and Conditions</DialogTitle>
                    </DialogHeader>
                    <div className='prose prose-sm dark:prose-invert max-w-none'>
                        {term ? (
                            // <div dangerouslySetInnerHTML={{ __html: term }} />
                            <CustomMarkdownPreview text={term?.description} />
                        ) : (
                            <p>
                                By accepting these terms, you agree to abide by
                                the company&apos;s policies and procedures.
                                Please read the full terms and conditions
                                carefully before proceeding.
                            </p>
                        )}
                    </div>
                </DialogContent>
            </Dialog> */}
        </div>
    );
};

export default DynamicFormViewer;
