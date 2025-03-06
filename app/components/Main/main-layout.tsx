import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import Header from '../Header';
import SideBar from '../SideBar/SideBar';
import Wrapper from '../Wrapper';

export default function MainLayout() {
    return (
        <SidebarProvider>
            <SideBar />
            <Header />
            <div className='relative top-28 w-full h-[calc(100dvh-112px)]'>
                <SidebarTrigger className='text-stone-950 hover:cursor-pointer' />
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </div>
        </SidebarProvider>
    );
}
