"use client"

import {ColumnDef} from "@tanstack/react-table"
import {Button} from "@/components/ui/button";
import {MdDelete, MdEdit} from "react-icons/md";
import {prettyRoleName} from "@/lib/utils";
import {ArrowDownIcon} from "@radix-ui/react-icons";
import {User} from "@/types";
import {deleteUser} from "@/actions/users/delete-user";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal-store";


export const columns: ColumnDef<User>[] = [
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
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({row}) => {
            return (
                <span>{prettyRoleName(row.getValue("role"))}</span>
            );
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const user = row.original
            const router = useRouter();
            const { onOpen } = useModal();

            const handleDelete = () => {
                if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                    deleteUser(user.id).then((ok) => {
                        if (ok) {
                            toast.success(`${user.name} has been deleted`);
                            router.refresh();
                        }
                    })
                }
            }

            return (
                <>
                    <Button variant="ghost" size="icon" onClick={() => {
                        onOpen("editUser", {user})
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
