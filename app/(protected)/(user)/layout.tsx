import {Metadata} from "next"
import Image from "next/image"
import {MainNav} from "./_components/main-nav";
import {UserNav} from "@/components/auth/user-nav";
import {ModeToggle} from "@/components/mode-toggle";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Example dashboard app built using the components.",
}

export default function PanelLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/dashboard-light.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/dashboard-dark.png"
                    width={1280}
                    height={866}
                    alt="Dashboard"
                    className="hidden dark:block"
                />
            </div>
            <div className="hidden flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
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