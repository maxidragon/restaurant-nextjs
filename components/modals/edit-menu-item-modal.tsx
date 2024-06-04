import {useModal} from "@/hooks/use-modal-store";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useEffect, useTransition} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {MenuItemSchema} from "@/schemas";
import {updateMenuItem} from "@/actions/menu-items/update-menu-item";
import MenuItemForm from "@/components/modals/forms/menu-item-form";

export const EditMenuItemModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "editMenuItem";
    const [isPending, startTransition] = useTransition();
    const {menuItem} = data;

    const form = useForm({
        resolver: zodResolver(MenuItemSchema),
        defaultValues: {
            name: menuItem?.name || "",
            description: menuItem?.description || "",
            price: menuItem?.price.toString() || "0",
        },
    });

    useEffect(() => {
        if (menuItem) {
            form.reset({
                name: menuItem.name,
                description: menuItem.description,
                price: menuItem.price.toString(),
            });
        }
    }, [form, menuItem]);

    const onSubmit = async (values: z.infer<typeof MenuItemSchema>) => {
        if (!menuItem?.id) return;
        startTransition(() => {
            updateMenuItem(menuItem?.id as string, values)
                .then((res) => {
                    if (res.error) {
                        toast.error(res.error);
                    }

                    if (res.success) {
                        toast.success(res.success);
                        form.reset();
                        router.refresh();
                        onClose();
                    }
                })
                .catch(() => {
                    toast.error("Failed to update menu item");
                });
        });
    };


    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose} key={data.user?.id}>
            <DialogContent className="overflow-hidden p-0">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Update menu item
                    </DialogTitle>
                </DialogHeader>
                <MenuItemForm form={form} onSubmit={onSubmit} isPending={isPending} />
            </DialogContent>
        </Dialog>
    );
};