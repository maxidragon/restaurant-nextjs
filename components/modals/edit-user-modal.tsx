import {useModal} from "@/hooks/use-modal-store";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useEffect, useTransition} from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {UserSchema} from "@/schemas";
import {updateUser} from "@/actions/users/update-user";
import {Role} from "@prisma/client";
import {prettyRoleName} from "@/lib/utils";

export const UpdateUserModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "editUser";
    const [isPending, startTransition] = useTransition();
    const {user} = data;

    const form = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: data?.user?.name || "",
            email: data?.user?.email || "",
            role: data?.user?.role || Role.USER,
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email,
                role: user.role as Role,
            });
        }
    }, [form, user]);

    const onSubmit = async (values: z.infer<typeof UserSchema>) => {
        if (!data?.user?.id) return;
        startTransition(() => {
            updateUser(data?.user?.id as string, values)
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
                    toast.error("Failed to update user");
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
                        Update user
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold"
                                        >
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isPending}
                                                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                                placeholder="Enter session name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            disabled={isPending}
                                            onValueChange={field.onChange}
                                            value={field.value as Role}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none"
                                                >
                                                    <SelectValue placeholder="Select role"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem
                                                    key={Role.USER}
                                                    value={Role.USER}
                                                >
                                                    {prettyRoleName(Role.USER)}
                                                </SelectItem>
                                                <SelectItem
                                                    key={Role.ADMIN}
                                                    value={Role.ADMIN}
                                                >
                                                    {prettyRoleName(Role.ADMIN)}
                                                </SelectItem>
                                                <SelectItem
                                                    key={Role.EMPLOYEE}
                                                    value={Role.EMPLOYEE}
                                                >
                                                    {prettyRoleName(Role.EMPLOYEE)}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <Button variant="default" disabled={isPending}>
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};