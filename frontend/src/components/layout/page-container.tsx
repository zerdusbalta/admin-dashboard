type PageContainerProps = {
    children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
    return <main className="min-w-0 flex-1 p-6">{children}</main>;
}