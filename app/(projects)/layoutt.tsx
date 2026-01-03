import Navbar from "@/components/navbar";

export default function ProjectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="flex mx-auto w-full max-w-[1440px] justify-center flex-col px-4 md:px-8 py-4">
            <Navbar/>
            {children}
        </main>
    );
}