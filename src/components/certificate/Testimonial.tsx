import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TCertificate } from '@/types/certificate.type';
import { useReactToPrint } from 'react-to-print';

type Props = {
    data: TCertificate | null;
};

function Testimonial({ data }: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef });

    // Enhanced PDF export function with custom sizing
    const handleExportPDF = async () => {
        const element = contentRef.current;
        if (!element) {
            console.error('Testimonial element not found');
            return;
        }

        try {
            // Dynamic import for better bundle size
            const html2canvas = (await import('html2canvas')).default;
            const jsPDF = (await import('jspdf')).default;

            // Configure html2canvas for better PDF rendering
            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true,
                allowTaint: false,
                backgroundColor: 'white',
                width: element.scrollWidth,
                height: element.scrollHeight,
                scrollX: 0,
                scrollY: 0,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.getElementById(
                        'testimonial_generate',
                    );
                    if (clonedElement) {
                        clonedElement.style.width = element.scrollWidth + 'px';
                        clonedElement.style.height =
                            element.scrollHeight + 'px';
                        clonedElement.style.overflow = 'visible';
                        clonedElement.style.position = 'relative';
                        clonedElement.style.transform = 'translateZ(0)';
                    }
                },
            });

            const imgData = canvas.toDataURL('image/png', 1.0);

            // Calculate PDF dimensions to match testimonial size
            const testimonialWidth = element.scrollWidth;
            const testimonialHeight = element.scrollHeight;

            // Convert pixels to mm (assuming 96 DPI)
            const pdfWidth = (testimonialWidth * 25.4) / 96;
            const pdfHeight = (testimonialHeight * 25.4) / 96;

            const pdf = new jsPDF({
                orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
                unit: 'mm',
                format: [pdfWidth, pdfHeight],
            });

            // Add image to PDF with exact testimonial dimensions
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`testimonial-${data?.userData?.name || 'download'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        }
    };

    const formatDate = (date: any) => {
        if (!date) {
            return 'N/A';
        }
        return new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className='relative min-h-screen w-full mx-auto'>
            <div className='text-center text-3xl lg:text-5xl text-black py-4 border-t-2 border-b-2 border-forground-border w-full mb-4'>
                Testimonial
            </div>
            <div className='p-4 min-h-screen'>
                {/* Testimonial Container with Golden Border */}
                <div className='max-w-4xl mx-auto'>
                    <div
                        ref={contentRef}
                        id='testimonial_generate'
                        className='bg-white shadow-2xl overflow-hidden'
                        style={{
                            width: '850px',
                            minHeight: 'auto',
                            margin: '0 auto',
                            border: '3px solid #EFBF04',
                            borderRadius: '0px',
                            printColorAdjust: 'exact',
                            WebkitPrintColorAdjust: 'exact',
                            background: 'white',
                            overflow: 'visible',
                        }}
                    >
                        {/* Header Section with Logo */}
                        <div
                            className='text-white py-8 px-6 text-center'
                            style={{
                                background:
                                    'linear-gradient(to right, #4F46E5, #3B82F6)',
                                printColorAdjust: 'exact',
                                WebkitPrintColorAdjust: 'exact',
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div className='flex flex-col items-center space-y-4'>
                                <div className='flex items-center justify-center w-[150px] max-w-[250px] h-[80px] p-2'>
                                    <div
                                        className='text-blue-600 font-bold text-center'
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '12px',
                                            lineHeight: '1.2',
                                            color: '#2563eb',
                                        }}
                                    >
                                        <Image
                                            height={720}
                                            width={1080}
                                            src={
                                                data?.branch?.data
                                                    ?.branchLogo ||
                                                '/logo/logo.png'
                                            }
                                            alt={'Logo'}
                                            className='w-[150px] max-w-[250px] h-[80px] object-cover rounded-lg'
                                        />
                                    </div>
                                </div>
                                <p
                                    className='text-white font-bold tracking-wider'
                                    style={{
                                        fontSize: '42px',
                                        fontWeight: '700',
                                        letterSpacing: '0.2em',
                                        marginTop: '16px',
                                    }}
                                >
                                    TESTIMONIAL
                                </p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className='px-8 py-6'>
                            {/* Student Information */}
                            <div className='mb-8'>
                                <p
                                    className='text-gray-800 font-serif font-bold text-center mb-6'
                                    style={{
                                        fontSize: '36px',
                                        fontWeight: '700',
                                        fontFamily: 'serif',
                                        color: '#1f2937',
                                    }}
                                >
                                    {data?.userData?.name || 'Student Name'}
                                </p>

                                {/* Student Details Grid */}
                                <div className='grid grid-cols-2 gap-4 mb-6 text-gray-700'>
                                    <div className='space-y-2'>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Student ID:
                                            </span>{' '}
                                            {data?.id || 'N/A'}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Course Name:
                                            </span>{' '}
                                            {data?.userData?.program || 'N/A'}
                                        </p>
                                    </div>
                                    <div className='space-y-2'>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Course Session:
                                            </span>{' '}
                                            {data?.userData?.session || 'N/A'}
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Issue Date:
                                            </span>{' '}
                                            {formatDate(
                                                data?.userData?.issueDate,
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* To Whom It May Concern with Golden Borders */}
                                <div className='mb-8'>
                                    <div
                                        className='h-[3px] w-full'
                                        style={{ background: '#EFBF04' }}
                                    ></div>
                                    <p
                                        className='text-blue-700 font-bold py-3 text-center'
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: '700',
                                            color: '#1d4ed8',
                                        }}
                                    >
                                        To Whom It May Concern
                                    </p>
                                    <div
                                        className='h-[3px] w-full'
                                        style={{ background: '#EFBF04' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Testimonial Content */}
                            <div className='mb-8'>
                                <div
                                    className='text-gray-700 leading-relaxed text-justify'
                                    // style={{
                                    //     border: '2px solid #9ca3af',
                                    //     borderRadius: '12px',
                                    //     fontSize: '15px',
                                    //     lineHeight: '1.7',
                                    //     maxHeight: '300px',
                                    //     background: '#fafafa',
                                    // }}
                                >
                                    <p className='whitespace-pre-line'>
                                        {data?.testimonial ||
                                            'No testimonial content available.'}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Section - Contact and Signature */}
                            <div className='grid grid-cols-2 gap-8 mt-12'>
                                {/* Left Column - Contact Info */}
                                <div className='space-y-4'>
                                    <div
                                        className='border border-gray-400 rounded-lg p-4'
                                        style={{
                                            border: '2px solid #9ca3af',
                                            borderRadius: '12px',
                                            padding: '16px',
                                        }}
                                    >
                                        <p
                                            className='text-gray-700 mb-2'
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Contact:
                                            </span>{' '}
                                            (586) 276-7347
                                        </p>
                                        <p
                                            className='text-gray-700 mb-1'
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Verification Link:
                                            </span>
                                        </p>
                                        <p
                                            className='text-blue-600'
                                            style={{
                                                fontSize: '12px',
                                                color: '#2563eb',
                                            }}
                                        >
                                            https://www.bootcampshub.ai/verification
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column - Signature */}
                                <div className='text-center'>
                                    <p
                                        className='text-gray-800 font-script italic mb-2'
                                        style={{
                                            fontSize: '24px',
                                            fontStyle: 'italic',
                                            paddingBottom: '4px',
                                        }}
                                    >
                                        {data?.userData?.signature ||
                                            'Digital Signature'}
                                    </p>
                                    <div
                                        className='bg-gray-400 mx-auto mb-2'
                                        style={{
                                            width: '180px',
                                            height: '1px',
                                        }}
                                    ></div>
                                    <p
                                        className='font-semibold text-gray-700'
                                        style={{ fontSize: '14px' }}
                                    >
                                        {data?.userData?.instructor ||
                                            'Instructor Name'}
                                        ,
                                    </p>
                                    <p
                                        className='text-gray-600'
                                        style={{ fontSize: '12px' }}
                                    >
                                        Mentor,{' '}
                                        {data?.userData?.program ||
                                            'Course Program'}
                                    </p>
                                    <p
                                        className='text-gray-600 mt-2'
                                        style={{ fontSize: '12px' }}
                                    >
                                        Expiration Date:{' '}
                                        {formatDate(data?.userData?.expireDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex justify-center gap-4 mt-8'>
                        {/* <Button
                            onClick={handleExportPDF}
                            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-colors'
                        >
                            Download as PDF
                        </Button> */}
                        <Button
                            onClick={handlePrint}
                            className='font-semibold px-6 py-3 rounded-lg shadow-lg transition-colors'
                        >
                            Print Testimonial
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
