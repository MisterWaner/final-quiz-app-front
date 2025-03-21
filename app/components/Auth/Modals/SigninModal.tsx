import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

import { useNavigate } from 'react-router';

export default function SigninModal({
    registrationStatus,
    registrationMessage,
    open,
    onOpenChange,
    titleColor,
}: {
    registrationStatus: string;
    registrationMessage: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    titleColor: string;
}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (registrationStatus === 'Inscription réussie') {
            navigate('/connexion');
        } else {
            navigate('/inscription');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={titleColor}>
                        {registrationStatus}
                    </DialogTitle>
                    <DialogDescription>{registrationMessage}</DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <div className='flex h-full justify-end'>
                        <Button
                            className='w-1/3'
                            variant='destructive'
                            onClick={() => {
                                handleNavigate();
                                onOpenChange(false);
                            }}
                        >
                            Fermer
                        </Button>
                    </div>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
