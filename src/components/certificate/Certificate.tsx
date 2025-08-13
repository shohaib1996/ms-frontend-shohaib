import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TCertificate } from '@/types/certificate.type';
import { useReactToPrint } from 'react-to-print';

type Props = {
    data: TCertificate | null;
};

function Certificate({ data }: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef });

    // Enhanced PDF export function with fixed height
    // const handleExportPDF = async () => {
    //     const element = contentRef.current;
    //     if (!element) {
    //         console.error('Certificate element not found');
    //         return;
    //     }

    //     try {
    //         // Dynamic import for better bundle size
    //         const html2canvas = (await import('html2canvas')).default;
    //         const jsPDF = (await import('jspdf')).default;

    //         // Configure html2canvas for better PDF rendering with fixed height
    //         const canvas = await html2canvas(element, {
    //             scale: 2, // Higher resolution
    //             useCORS: true,
    //             allowTaint: false,
    //             backgroundColor: 'white',
    //             width: element.scrollWidth,
    //             height: 750, // Fixed height as requested
    //             scrollX: 0,
    //             scrollY: 0,
    //             windowWidth: element.scrollWidth,

    //             windowHeight: 750,
    //             onclone: (clonedDoc) => {
    //                 // Ensure all styles are preserved in the clone
    //                 const clonedElement = clonedDoc.getElementById(
    //                     'certificate_generate',
    //                 );
    //                 if (clonedElement) {
    //                     // Force layout with fixed dimensions and better rendering
    //                     clonedElement.style.width = element.scrollWidth + 'px';
    //                     clonedElement.style.height = '750px';
    //                     clonedElement.style.overflow = 'hidden';
    //                     clonedElement.style.position = 'relative';
    //                     clonedElement.style.transform = 'translateZ(0)'; // Force GPU acceleration
    //                 }
    //             },
    //         });

    //         const imgData = canvas.toDataURL('image/png', 1.0);

    //         // Calculate PDF dimensions to match certificate size exactly
    //         const certificateWidth = 830; // Your certificate width in pixels
    //         const certificateHeight = 750; // Your certificate height in pixels

    //         // Convert pixels to mm (assuming 96 DPI)
    //         const pdfWidth = (certificateWidth * 25.4) / 96; // Convert px to mm
    //         const pdfHeight = (certificateHeight * 25.4) / 96; // Convert px to mm

    //         const pdf = new jsPDF({
    //             orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
    //             unit: 'mm',
    //             format: [pdfWidth, pdfHeight], // Custom format matching certificate dimensions
    //         });

    //         // Add image to PDF with exact certificate dimensions
    //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //         pdf.save(`certificate-${data?.userData?.name || 'download'}.pdf`);
    //     } catch (error) {
    //         console.error('Error generating PDF:', error);
    //         alert('Error generating PDF. Please try again.');
    //     }
    // };

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
                Certificate
            </div>
            <div className='p-4  min-h-screen'>
                {/* Certificate Container with Golden Border */}
                <div className='max-w-4xl mx-auto'>
                    <div
                        ref={contentRef}
                        id='certificate_generate'
                        className='bg-white shadow-2xl rounded-lg overflow-hidden'
                        style={{
                            width: '850px',
                            height: '750px',
                            margin: '0 auto',
                            border: '3px solid #EFBF04',
                            borderRadius: '0px',
                            printColorAdjust: 'exact',
                            WebkitPrintColorAdjust: 'exact',
                            background: 'white',
                            overflow: 'hidden',
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
                                    CERTIFIED
                                </p>
                            </div>
                        </div>
                        {/* Main Content */}
                        <div
                            className='px-8 py-6 text-center'
                            style={{
                                height: 'calc(100% - 200px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            {/* Student Name */}
                            <div>
                                <p
                                    className='text-gray-800 font-serif font-bold'
                                    style={{
                                        fontSize: '48px',
                                        fontWeight: '700',
                                        marginBottom: '20px',
                                        fontFamily: 'serif',
                                        color: '#1f2937',
                                    }}
                                >
                                    {data?.userData?.name || 'Student Name'}
                                </p>
                                {/* Certificate Details */}
                                <div className='space-y-1 text-gray-700 mb-6'>
                                    <p
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}
                                    >
                                        {data?.certificateTemplate?.details1 ||
                                            'Has successfully completed the DevOps'}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '16px',
                                            lineHeight: '1.5',
                                        }}
                                    >
                                        {data?.certificateTemplate?.details2 ||
                                            'requirements and has achieved her:'}
                                    </p>
                                </div>
                                {/* Program Name with Perfect Centering */}
                                <div className=''>
                                    {/* Top border */}
                                    <div
                                        className='h-[3px] w-full'
                                        style={{
                                            background: '#EFBF04',
                                            width: '100%',
                                            height: '3px',
                                        }}
                                    ></div>
                                    <p
                                        className='text-blue-700 font-bold py-3'
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: '700',
                                            color: '#1d4ed8',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {data?.userData?.program ||
                                            'Course Program'}
                                    </p>
                                    {/* Bottom border */}
                                    <div
                                        className='h-[3px] w-full'
                                        style={{
                                            background: '#EFBF04',
                                            width: '100%',
                                            height: '3px',
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Bottom Section - Two Columns */}
                            <div className='grid grid-cols-2 gap-2 text-left'>
                                {/* Left Column - Course Details */}
                                <div className='space-y-2 text-gray-700'>
                                    <p
                                        className='font-semibold'
                                        style={{ fontSize: '14px' }}
                                    >
                                        <span className='text-gray-900 font-bold'>
                                            Course name:
                                        </span>{' '}
                                        {data?.userData?.program || 'N/A'}
                                    </p>
                                    <p
                                        className='font-semibold'
                                        style={{ fontSize: '14px' }}
                                    >
                                        <span className='text-gray-900 font-bold'>
                                            Course session:
                                        </span>{' '}
                                        {data?.userData?.session || 'N/A'}
                                    </p>
                                    <p
                                        className='font-semibold'
                                        style={{ fontSize: '14px' }}
                                    >
                                        <span className='text-gray-900 font-bold'>
                                            Issue date:
                                        </span>{' '}
                                        {formatDate(data?.userData?.issueDate)}
                                    </p>
                                    <p
                                        className='font-semibold'
                                        style={{ fontSize: '14px' }}
                                    >
                                        <span className='text-gray-900 font-bold'>
                                            Expiration date:
                                        </span>{' '}
                                        {formatDate(data?.userData?.expireDate)}
                                    </p>
                                </div>

                                {/* Right Column - Signature and Validation */}
                                <div className='space-y-4'>
                                    {/* Signature */}
                                    <div className='text-center'>
                                        <p
                                            className='text-gray-800 font-script italic'
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
                                    </div>

                                    {/* Validation Box */}
                                    <div
                                        className='border border-gray-400 rounded-lg p-3'
                                        style={{
                                            border: '2px solid #9ca3af',
                                            borderRadius: '12px',
                                            padding: '12px',
                                        }}
                                    >
                                        <p
                                            className='text-gray-700 mb-1'
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '600',
                                            }}
                                        >
                                            <span className='text-gray-900 font-bold'>
                                                Validation Number:
                                            </span>{' '}
                                            {data?.id || 'N/A'}
                                        </p>
                                        <div className='flex flex-wrap  '>
                                            <p
                                                className='text-gray-700 mr-1 mb-1'
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
                            variant='default'
                            onClick={handlePrint}
                            className='font-semibold px-6 py-3 rounded-lg shadow-lg transition-colors'
                        >
                            Print Certificate
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Certificate;
