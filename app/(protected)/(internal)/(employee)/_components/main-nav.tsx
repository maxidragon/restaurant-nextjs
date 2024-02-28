import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
                            className,
                            ...props
                        }: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <Link
                href="/panel"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Overview
            </Link>
            <Link
                href="/panel/orders"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Orders
            </Link>
            <Link
                href="/users"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Users
            </Link>
            <Link
                href="/panel/menu"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Menu
            </Link>
        </nav>
    )
}