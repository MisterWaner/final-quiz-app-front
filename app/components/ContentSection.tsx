export default function ContentSection({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className='mt-5 w-full mb-6'>{children}</section>;
}
