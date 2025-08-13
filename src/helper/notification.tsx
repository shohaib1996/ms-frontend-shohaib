import store from '../store';
import moment from 'moment';
import Router from 'next/router';
import instance from '@/lib/axios';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';
import { toast } from 'sonner';

const notificationMarkRead = (noti: any) => {
    instance
        .patch(`/notification/markread/${noti._id}`)
        .then((res) => {
            store.dispatch({
                type: 'UPDATE_NOTIFICATION',
                payload: res.data.notification,
            });
            Router.push(
                generateNotificationUrl(
                    noti.notificationType,
                    noti.entityId,
                    noti?.text,
                ),
            );
        })
        .catch((err) => {
            console.error(err);
            toast.error(err?.response?.data?.error || 'Something went wrong');
        });
};

export const generateNotificationUrl = (
    type: any,
    entityId: any,
    text: any,
) => {
    let url = '';
    switch (type) {
        case 'organizationApprove':
            url = `/company/mycompanies`;
            break;

        default:
            break;
    }
    return url;
};

export const generateNotificationText = (
    type: any,
    user: any,
    entityId: any,
) => {
    let text = '';
    switch (type) {
        case 'organizationApprove':
            text = `Congratulations! Your organization has been approved`;
            break;
        default:
            text = 'This notification is not defined';
            break;
    }
    return text;
};

export const notificationsList = (notifications: any) => (
    <div className='space-y-2'>
        {notifications.map((noti: any) => (
            <Card
                key={noti._id}
                onClick={() => notificationMarkRead(noti)}
                className={cn(
                    `${!noti?.opened ? 'bg-primary-light' : 'bg-background'}`,
                    'rounded-md p-2 flex gap-2',
                )}
                style={{ cursor: 'pointer' }}
            >
                <Avatar className='size-8'>
                    <AvatarImage
                        src={
                            noti?.userFrom?.profilePicture ||
                            '/placeholder2.jpg'
                        }
                    ></AvatarImage>
                    <AvatarFallback>
                        <User size={18} />
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className='text-sm text-dark-gray font-semibold'>
                        {noti?.generatedText || 'N/A'}
                    </h2>
                    <p className='text-xs text-gray pt-1'>
                        {moment(noti.createdAt).fromNow()}
                    </p>
                </div>
            </Card>
        ))}
    </div>
);
