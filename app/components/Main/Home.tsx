import { Button } from "../ui/button";

export default function Home() {
    return (
        <>
            <p>Hello World from Home Page</p>
            <Button className='mt-4 bg-black text-white cursor-pointer hover:bg-stone-600 active:scale-98'>
                Click me
            </Button>
        </>
    );
}
