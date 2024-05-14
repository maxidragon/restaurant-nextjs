"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {User} from "@/types";
import {useRouter} from "next/navigation";


export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        id: "actions",
        cell: ({row}) => {
            const order = row.original
            const router = useRouter();
            return (
                <>
                    <Button variant="default" onClick={() => {
                        router.push(`/orders/${order.id}`)
                    }}>
                        Details
                    </Button>

                </>
            );
        },
    },
]
