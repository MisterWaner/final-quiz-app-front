export default function Wrapper({ children }: { children: React.ReactNode }) {
    return <div className={`relative p-8 w-full mx-auto`}>{children}</div>;
}
