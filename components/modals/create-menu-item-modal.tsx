import {useModal} from "@/hooks/use-modal-store";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useTransition} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {MenuItemSchema} from "@/schemas";
import {createMenuItem} from "@/actions/menu-items/create-menu-item";
import MenuItemForm from "@/components/modals/forms/menu-item-form";

export const CreateMenuItemModal = () => {
    const {isOpen, onClose, type} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "createMenuItem";
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(MenuItemSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "0",
        },
    });



    const onSubmit = async (values: z.infer<typeof MenuItemSchema>) => {
        startTransition(() => {
            createMenuItem(values)
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
                    toast.error("Failed to create menu item");
                });
        });
    };


    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden p-0">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create menu item
                    </DialogTitle>
                </DialogHeader>
                <MenuItemForm  form={form} onSubmit={onSubmit} isPending={isPending} />
            </DialogContent>
        </Dialog>
    );
};