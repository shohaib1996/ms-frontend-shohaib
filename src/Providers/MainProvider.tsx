'use client';
import BootcampsHubFooter from '@/components/home/BootcampsHubFooter';
import Navbar from '@/components/shared/Navbar';
import WithAuth from '@/helper/withAuth';
import store, { persistor } from '@/store';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@smastrom/react-rating/style.css';
import 'react-phone-number-input/style.css';

const MainProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Suspense>
                    <WithAuth>
                        <Navbar />
                        {children}
                        <BootcampsHubFooter />
                    </WithAuth>
                </Suspense>
            </PersistGate>
        </Provider>
    );
};

export default MainProvider;
