import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import AccountSideBar from '~/components/SideBar/AccountSideBar';
import Header from '~/components/Header';
import Wrapper from '~/components/Wrapper';

export default function AccountLayout() {
    return (
        <SidebarProvider>
            <AccountSideBar />
            <Header />
            <main className='relative top-28 w-full h-[calc(100dvh-112px)]'>
                <SidebarTrigger
                    className='text-slate-950 hover:cursor-pointer'
                    //onClick={handleSidebarClick}
                />
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </main>
        </SidebarProvider>
    );
}
