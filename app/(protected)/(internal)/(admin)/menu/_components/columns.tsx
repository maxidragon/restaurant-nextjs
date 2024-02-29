"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {MdDelete, MdEdit} from "react-icons/md";
import {ArrowDownIcon} from "@radix-ui/react-icons";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";
import {MenuItem} from "@prisma/client";
import {deleteMenuItem} from "@/actions/menu-items/delete-item";


export const columns: ColumnDef<MenuItem>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => {
            const value = row.getValue("description");
            if (!value) return null;
            const str = value as string;
            return (
                <span>{str.substring(0, 50) + "..."}</span>
            );
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const item = row.original
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { onOpen } = useModal();

            const handleDelete = () => {
                if (confirm(`Are you sure you want to delete ${item.name}?`)) {
                    deleteMenuItem(item.id).then((ok) => {
                        if (ok) {
                            toast.success(`${item.name} has been deleted`);
                            router.refresh();
                        }
                    })
                }
            }

            return (
                <>
                    <Button variant="ghost" size="icon" onClick={() => {
                        onOpen("editMenuItem", {menuItem: item})
                    }}>
                        <MdEdit size={20}/>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <MdDelete size={20}/>
                    </Button>
                </>
            );
        },
    },
]
