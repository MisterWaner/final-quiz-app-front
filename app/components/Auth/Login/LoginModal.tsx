import { useNavigate } from 'react-router';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';

export default function LoginModal({
    loginStatus,
    loginMessage,
    open,
    onOpenChange,
    onClose,
    titleStyle,
    buttonStyle,
}: {
    loginStatus: string;
    loginMessage: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
    titleStyle: string;
    buttonStyle: string;
}) {
    const navigate = useNavigate();

    function handleNavigate() {
        loginStatus === 'Connexion réussie'
            ? navigate('/mon-compte')
            : navigate('/connexion');
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={titleStyle}>
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
