import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
    return (
        <header className='border-b'>
            <div className='container mx-auto py-4 px-4 flex items-center justify-between'>
                <Link href='/' className='font-bold text-xl'>
                    Student Portal
                </Link>
                <nav className='flex items-center gap-4'>
                    <Link
                        href='/courses'
                        className='text-sm font-medium hover:text-primary'
                    >
                        Courses
                    </Link>
                    <Link
                        href='/enrollment-status'
                        className='text-sm font-medium hover:text-primary'
                    >
                        My Enrollments
                    </Link>
                    <Button size='sm' variant='outline'>
                        Login
                    </Button>
                </nav>
            </div>
        </header>
    );
}
