import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { useLayoutStore } from '~/store/layout-store';
import Header from '../Header';
import SideBar from '../SideBar/SideBar';
import Wrapper from '../Wrapper';

export default function MainLayout() {
    const isSidebarOpen = useLayoutStore((state) => state.isSidebarOpen);
    const { toggleSidebar } = useLayoutStore();

    function handleSidebarClick() {
        if (isSidebarOpen) {
            toggleSidebar();
        }
    }

    return (
        <SidebarProvider>
            <SideBar />
            <Header />
            <main className='relative top-28 w-full h-[calc(100dvh-112px)]'>
                <SidebarTrigger className='text-stone-950 hover:cursor-pointer' onClick={handleSidebarClick} />
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </main>
        </SidebarProvider>
    );
}
