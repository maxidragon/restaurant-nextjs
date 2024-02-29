import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import * as z from "zod";
import {MenuItemSchema} from "@/schemas";
import {UseFormReturn} from "react-hook-form";

interface MenuItemFormProps {
    form: UseFormReturn<z.infer<typeof MenuItemSchema>>;
    onSubmit: (values: z.infer<typeof MenuItemSchema>) => void;
    isPending: boolean;
}
const MenuItemForm = ({form, onSubmit, isPending }: MenuItemFormProps) => {
    return (
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
                                        placeholder="Enter item name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <Textarea {...field} disabled={isPending} />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        disabled={isPending}
                                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Enter price"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <DialogFooter className="px-6 py-4">
                    <Button variant="default" disabled={isPending}>
                        Submit
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
};

export default MenuItemForm;