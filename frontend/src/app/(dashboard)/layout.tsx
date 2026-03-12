import AppHeader from "../../components/layout/app-header";
import AppSidebar from "../../components/layout/app-sidebar";
import PageContainer from "../../components/layout/page-container";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({
                                            children,
                                        }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl">
                <AppSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <AppHeader />
                    <PageContainer>{children}</PageContainer>
                </div>
            </div>
        </div>
    );
}