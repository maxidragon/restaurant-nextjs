import {Metadata} from "next"
import {MainNav} from "@/app/(protected)/(internal)/_components/main-nav"
import {Search} from "@/app/(protected)/(internal)/(employee)/_components/search"
import {UserNav} from "@/components/auth/user-nav";
import {ModeToggle} from "@/components/mode-toggle";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function PanelLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                            <ModeToggle />
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}