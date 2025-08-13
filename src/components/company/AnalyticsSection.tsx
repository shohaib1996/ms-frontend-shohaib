'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import type { EnrollmentData, CompletionData } from '@/types';

interface AnalyticsSectionProps {
    enrollmentData: EnrollmentData[];
    courseCompletionData: CompletionData[];
    colors: string[];
}

export function AnalyticsSection({
    enrollmentData,
    courseCompletionData,
    colors,
}: AnalyticsSectionProps) {
    return (
        <section className='xl:py-16 py-10 bg-blue-50 dark:bg-blue-950'>
            <div className='container mx-auto px-4'>
                <h2 className='text-3xl font-bold mb-6 text-black text-center'>
                    Performance Analytics
                </h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Student Enrollment</CardTitle>
                        <CardDescription>
                            Number of new students enrolled each month over the
                            past year
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='h-[400px]'>
                        <ResponsiveContainer width='100%' height='100%'>
                            <AreaChart
                                data={enrollmentData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='monthName' />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type='monotone'
                                    dataKey='count'
                                    stroke='#8884d8'
                                    fill='#8884d8'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                {/* <Tabs defaultValue='enrollment' className='w-full'>
                    <TabsList className='grid w-full max-w-md mx-auto grid-cols-2'>
                        <TabsTrigger value='enrollment'>
                            Enrollment Trends
                        </TabsTrigger>
                        <TabsTrigger value='completion'>
                            Completion Rates
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='enrollment' className='mt-6'>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Monthly Student Enrollment
                                </CardTitle>
                                <CardDescription>
                                    Number of new students enrolled each month
                                    over the past year
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='h-[400px]'>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <AreaChart
                                        data={enrollmentData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='month' />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type='monotone'
                                            dataKey='students'
                                            stroke='#8884d8'
                                            fill='#8884d8'
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value='completion' className='mt-6'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Program Completion Rates</CardTitle>
                                <CardDescription>
                                    Percentage of students who complete, are in
                                    progress, or drop out
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='h-[400px]'>
                                <ResponsiveContainer width='100%' height='100%'>
                                    <PieChart>
                                        <Pie
                                            data={courseCompletionData}
                                            cx='50%'
                                            cy='50%'
                                            labelLine={false}
                                            label={({ name, percent }) =>
                                                `${name}: ${(percent * 100).toFixed(0)}%`
                                            }
                                            outerRadius={150}
                                            fill='#8884d8'
                                            dataKey='value'
                                        >
                                            {courseCompletionData?.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            colors[
                                                            index %
                                                            colors?.length
                                                            ]
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs> */}
            </div>
        </section>
    );
}
