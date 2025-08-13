import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TCertificate } from '@/types/certificate.type';
import { useReactToPrint } from 'react-to-print';

const getPercent = (value: number, referenceValueData: number): number => {
    const percent = Math.floor((value / referenceValueData) * 100) || 0;
    const data = percent > 100 ? 100 : percent;
    return data;
};

const getFullText = {
    summary: 'Summary',
    interviewSubmitted: 'Submitted Interview',
    interviewAnswered: 'Answered Interview',
    showTell: 'Show & Tell',
    messages: 'Total Messages',
    issues: 'Issues',
    shoutOut: 'My Compliments',
    uploadedDocuments: 'Uploaded Documents',
    day2day: 'Day to Day Activities',
    events: 'Calendar Events',
    contentComments: 'Comments on Content',
    technicalTestAnswers: 'Answered Technical Test',
    familyMembers: 'Family Members',
};

type Props = {
    data: TCertificate | null;
};

function Transcript({ data }: Props) {
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef });

    // Enhanced PDF export function with custom sizing
    // const handleExportPDF = async () => {
    //     const element = contentRef.current;
    //     if (!element) {
    //         console.error('Transcript element not found');
    //         return;
    //     }

    //     try {
    //         // Dynamic import for better bundle size
    //         const html2canvas = (await import('html2canvas')).default;
    //         const jsPDF = (await import('jspdf')).default;

    //         // Configure html2canvas for better PDF rendering
    //         const canvas = await html2canvas(element, {
    //             scale: 2, // Higher resolution
    //             useCORS: true,
    //             allowTaint: false,
    //             backgroundColor: 'white',
    //             width: element.scrollWidth,
    //             height: element.scrollHeight,
    //             scrollX: 0,
    //             scrollY: 0,
    //             windowWidth: element.scrollWidth,
    //             windowHeight: element.scrollHeight,
    //             onclone: (clonedDoc) => {
    //                 const clonedElement = clonedDoc.getElementById(
    //                     'transcript_generate',
    //                 );
    //                 if (clonedElement) {
    //                     clonedElement.style.width = element.scrollWidth + 'px';
    //                     clonedElement.style.height =
    //                         element.scrollHeight + 'px';
    //                     clonedElement.style.overflow = 'visible';
    //                     clonedElement.style.position = 'relative';
    //                     clonedElement.style.transform = 'translateZ(0)';
    //                 }
    //             },
    //         });

    //         const imgData = canvas.toDataURL('image/png', 1.0);

    //         // Calculate PDF dimensions to match transcript size
    //         const transcriptWidth = element.scrollWidth;
    //         const transcriptHeight = element.scrollHeight;

    //         // Convert pixels to mm (assuming 96 DPI)
    //         const pdfWidth = (transcriptWidth * 25.4) / 96;
    //         const pdfHeight = (transcriptHeight * 25.4) / 96;

    //         const pdf = new jsPDF({
    //             orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
    //             unit: 'mm',
    //             format: [pdfWidth, pdfHeight],
    //         });

    //         // Add image to PDF with exact transcript dimensions
    //         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //         pdf.save(`transcript-${data?.userData?.name || 'download'}.pdf`);
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

    const getScoreClass = (percent: number) => {
        if (percent === 100) {
            return 'text-green-600 font-bold';
        }
        if (percent >= 60) {
            return 'text-blue-600 font-semibold';
        }
        return 'text-red-600 font-semibold';
    };

    return (
        <div className='relative min-h-screen w-full mx-auto'>
            <div className='text-center text-3xl lg:text-5xl text-black py-4 border-t-2 border-b-2 border-forground-border w-full mb-4'>
                Transcript
            </div>
            <div className='p-4 min-h-screen'>
                {/* Transcript Container with Golden Border */}
                <div className='max-w-4xl mx-auto'>
                    <div
                        ref={contentRef}
                        id='transcript_generate'
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
                                    TRANSCRIPT
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

                                {/* Program Name with Golden Borders */}
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
                                        Performance Evaluation Report
                                    </p>
                                    <div
                                        className='h-[3px] w-full'
                                        style={{ background: '#EFBF04' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Transcript Table */}
                            <div className='mb-8'>
                                <div className='overflow-x-auto'>
                                    <table
                                        className='w-full'
                                        style={{
                                            borderCollapse: 'collapse',
                                            border: '2px solid #9ca3af',
                                        }}
                                    >
                                        <thead>
                                            <tr
                                                style={{
                                                    background: '#f3f4f6',
                                                }}
                                            >
                                                <th
                                                    className='px-4 py-3 text-left font-bold'
                                                    style={{
                                                        border: '1px solid #9ca3af',
                                                        fontSize: '14px',
                                                        color: '#1f2937',
                                                    }}
                                                >
                                                    Areas of Evaluation
                                                </th>
                                                <th
                                                    className='px-4 py-3 text-center font-bold'
                                                    style={{
                                                        border: '1px solid #9ca3af',
                                                        fontSize: '14px',
                                                        color: '#1f2937',
                                                    }}
                                                >
                                                    Student Points
                                                </th>
                                                <th
                                                    className='px-4 py-3 text-center font-bold'
                                                    style={{
                                                        border: '1px solid #9ca3af',
                                                        fontSize: '14px',
                                                        color: '#1f2937',
                                                    }}
                                                >
                                                    Expected Points
                                                </th>
                                                <th
                                                    className='px-4 py-3 text-center font-bold'
                                                    style={{
                                                        border: '1px solid #9ca3af',
                                                        fontSize: '14px',
                                                        color: '#1f2937',
                                                    }}
                                                >
                                                    Points (%)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.results?.map(
                                                (item: any, i: number) => {
                                                    const percentage =
                                                        getPercent(
                                                            item?.value,
                                                            item?.referenceValue,
                                                        );
                                                    return (
                                                        <tr key={i}>
                                                            <td
                                                                className='px-4 py-3 text-gray-700'
                                                                style={{
                                                                    border: '1px solid #9ca3af',
                                                                    fontSize:
                                                                        '13px',
                                                                    fontWeight:
                                                                        '500',
                                                                }}
                                                            >
                                                                {getFullText[
                                                                    item?.name as keyof typeof getFullText
                                                                ] || item?.name}
                                                            </td>
                                                            <td
                                                                className='px-4 py-3 text-center text-gray-700'
                                                                style={{
                                                                    border: '1px solid #9ca3af',
                                                                    fontSize:
                                                                        '13px',
                                                                    fontWeight:
                                                                        '500',
                                                                }}
                                                            >
                                                                {item?.value ||
                                                                    0}
                                                            </td>
                                                            <td
                                                                className='px-4 py-3 text-center text-gray-700'
                                                                style={{
                                                                    border: '1px solid #9ca3af',
                                                                    fontSize:
                                                                        '13px',
                                                                    fontWeight:
                                                                        '500',
                                                                }}
                                                            >
                                                                {item?.referenceValue ||
                                                                    0}
                                                            </td>
                                                            <td
                                                                className={`px-4 py-3 text-center ${getScoreClass(percentage)}`}
                                                                style={{
                                                                    border: '1px solid #9ca3af',
                                                                    fontSize:
                                                                        '13px',
                                                                    fontWeight:
                                                                        '600',
                                                                }}
                                                            >
                                                                {percentage}%
                                                            </td>
                                                        </tr>
                                                    );
                                                },
                                            ) || (
                                                <tr>
                                                    <td
                                                        colSpan={4}
                                                        className='px-4 py-8 text-center text-gray-500'
                                                        style={{
                                                            border: '1px solid #9ca3af',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        No transcript data
                                                        available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Bottom Section - Signature and Validation */}
                            <div className='grid grid-cols-2 gap-8 mt-8'>
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
                                            <span className='text-gray-900 font-bold text-nowrap mr-1'>
                                                Verification Link:
                                            </span>
                                            <span
                                                className='text-blue-600'
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#2563eb',
                                                }}
                                            >
                                                https://www.bootcampshub.ai/verification
                                            </span>
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
                            Print Transcript
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transcript;
