import type { Metadata } from 'next';
import { Geist, Geist_Mono, Orbitron, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/shared/Navbar';
import { ThemeProvider } from 'next-themes';
import { Toaster, toast } from 'sonner';
import WithAuth from '@/helper/withAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Suspense } from 'react';
import store, { persistor } from '@/store';
import MainProvider from '@/Providers/MainProvider';

const inter = Inter({ subsets: ['latin'] });

const myFont = Orbitron({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // choose weights you need
    variable: '--font-orbitron', // create a CSS variable
});

export const metadata: Metadata = {
    title: 'SkillBNK',
    description:
        'Discover skillBNK: your go-to platform for educational resources, bootcamps, and daily activity tracking',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                <body className={`${inter.className} antialiased`}>
                    <GoogleOAuthProvider
                        clientId={
                            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''
                        }
                    >
                        <MainProvider>{children}</MainProvider>
                        <Toaster richColors position='top-center' />
                    </GoogleOAuthProvider>
                </body>
            </ThemeProvider>
        </html>
    );
}
