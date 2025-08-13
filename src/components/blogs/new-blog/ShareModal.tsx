import React from 'react';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from 'react-share';
import {
    Twitter,
    Facebook,
    Linkedin,
    Copy,
    ArrowLeft,
    X as CloseIcon,
    MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';
import CopyToClipboard from 'react-copy-to-clipboard';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BlogPost {
    slug: string;
    title?: string;
}

interface ShareModalProps {
    post: BlogPost;
    opened: boolean;
    close: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ post, opened, close }) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/blogs/${post?.slug}`;

    const handleCopy = () => {
        toast.success('Link copied to clipboard');
    };

    return (
        <Dialog open={opened} onOpenChange={close}>
            <DialogContent className='sm:max-w-md text-gray p-3'>
                <DialogHeader className='flex flex-row items-center justify-between'>
                    <DialogTitle className='flex items-center gap-2'>
                        <Button
                            variant='ghost'
                            size='icon'
                            onClick={close}
                            className='h-8 w-8'
                        >
                            <ArrowLeft className='h-4 w-4' />
                        </Button>
                        <span>Share</span>
                    </DialogTitle>
                </DialogHeader>

                <div className='py-0'>
                    <div className='grid grid-cols-4 gap-4 mb-6'>
                        <div className='flex flex-col items-center gap-2'>
                            <FacebookShareButton
                                url={shareUrl}
                                className='flex flex-col items-center'
                            >
                                <div className='h-12 w-12 rounded-full flex items-center justify-center bg-[#3b5998]'>
                                    <Facebook className='h-5 w-5 text-white' />
                                </div>
                                <span className='text-xs mt-1'>Facebook</span>
                            </FacebookShareButton>
                        </div>

                        <div className='flex flex-col items-center gap-2'>
                            <FacebookMessengerShareButton
                                url={shareUrl}
                                appId=''
                                className='flex flex-col items-center'
                            >
                                <div className='h-12 w-12 rounded-full flex items-center justify-center bg-[#00B2FF]'>
                                    <MessageSquare className='h-5 w-5 text-white' />
                                </div>
                                <span className='text-xs mt-1'>Messenger</span>
                            </FacebookMessengerShareButton>
                        </div>

                        <div className='flex flex-col items-center gap-2'>
                            <LinkedinShareButton
                                url={shareUrl}
                                className='flex flex-col items-center'
                            >
                                <div className='h-12 w-12 rounded-full flex items-center justify-center bg-[#0a66c2]'>
                                    <Linkedin className='h-5 w-5 text-white' />
                                </div>
                                <span className='text-xs mt-1'>LinkedIn</span>
                            </LinkedinShareButton>
                        </div>

                        <div className='flex flex-col items-center gap-2'>
                            <TwitterShareButton
                                url={shareUrl}
                                title={post?.title || 'Check out this post'}
                                via='SkillBNK'
                                hashtags={['bootcamps', 'education']}
                                className='flex flex-col items-center'
                            >
                                <div className='h-12 w-12 rounded-full flex items-center justify-center bg-[#101010]'>
                                    <Twitter className='h-5 w-5 text-white' />
                                </div>
                                <span className='text-xs mt-1'>X</span>
                            </TwitterShareButton>
                        </div>
                    </div>

                    <h3 className='text-md font-medium mb-3'>
                        Or share with link
                    </h3>

                    <div className='flex items-center space-x-2'>
                        <div className='flex-1 relative'>
                            <Input
                                value={shareUrl}
                                readOnly
                                className='pr-10 text-sm text-muted-foreground font-medium'
                            />
                            <CopyToClipboard
                                text={shareUrl}
                                onCopy={handleCopy}
                            >
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className='absolute right-0 top-0 h-full aspect-square'
                                >
                                    <Copy className='h-4 w-4' />
                                </Button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareModal;
