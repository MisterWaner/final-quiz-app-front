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

export default function LoginModal({
    loginStatus,
    loginMessage,
    open,
    onOpenChange,
    onClose,
    buttonColor,
    titleColor,
}: {
    loginStatus: string;
    loginMessage: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
    buttonColor: string;
    titleColor: string;
}) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (loginStatus === 'Connexion réussie') {
            navigate('/compte');
        } else {
            navigate('/connexion');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={titleColor}>
                        {loginStatus}
                    </DialogTitle>
                    <DialogDescription>{loginMessage}</DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <div className='flex h-full justify-end'>
                        <Button
                            className='w-1/3'
                            variant='destructive'
                            onClick={() => {
                                handleNavigate();
                                onOpenChange(false);
                                onClose();
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
