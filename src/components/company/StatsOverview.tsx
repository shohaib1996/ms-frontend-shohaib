import { BarChart, Users, Award, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function StatsOverview() {
    return (
        <section className='py-12 bg-foreground'>
            <div className='my-container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <Card className='bg-purple-100 dark:bg-purple-900'>
                        <CardContent className='pt-6'>
                            <div className='flex items-center gap-4'>
                                <div className='p-2 bg-primary/10 rounded-full'>
                                    <Users className='h-6 w-6 text-primary-white' />
                                </div>
                                <div>
                                    <p className='text-sm text-dark-gray'>
                                        Total Students
                                    </p>
                                    <h3 className='text-2xl font-bold'>
                                        1,250+
                                    </h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='bg-lime-100 dark:bg-lime-900'>
                        <CardContent className='pt-6'>
                            <div className='flex items-center gap-4'>
                                <div className='p-2 bg-primary/10 rounded-full'>
                                    <Award className='h-6 w-6 text-primary-white' />
                                </div>
                                <div>
                                    <p className='text-sm text-dark-gray'>
                                        Programs Offered
                                    </p>
                                    <h3 className='text-2xl font-bold'>12</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='bg-pink-100 dark:bg-pink-900'>
                        <CardContent className='pt-6'>
                            <div className='flex items-center gap-4'>
                                <div className='p-2 bg-primary/10 rounded-full'>
                                    <BarChart className='h-6 w-6 text-primary-white' />
                                </div>
                                <div>
                                    <p className='text-sm text-dark-gray'>
                                        Job Placement
                                    </p>
                                    <h3 className='text-2xl font-bold'>92%</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className='bg-teal-100 dark:bg-teal-900'>
                        <CardContent className='pt-6'>
                            <div className='flex items-center gap-4'>
                                <div className='p-2 bg-primary/10 rounded-full'>
                                    <Calendar className='h-6 w-6 text-primary-white' />
                                </div>
                                <div>
                                    <p className='text-sm text-dark-gray'>
                                        Years Active
                                    </p>
                                    <h3 className='text-2xl font-bold'>7</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
