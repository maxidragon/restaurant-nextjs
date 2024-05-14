"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { OrderSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ItemsPicker from "./items-picker";
import { useState, useTransition } from "react";
import { createOrder } from "@/actions/orders/create-order";
import { OrderedItem } from "@/types";
import { MenuItem } from "@prisma/client";

const OrderForm = ({availableItems}: {
    availableItems: MenuItem[];
}) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [items, setItems] = useState<OrderedItem[]>([]);
    const [isPending, startTransition] = useTransition();
  
    const form = useForm<z.infer<typeof OrderSchema>>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
          address: "",
          note: "",
        },
      });

      const onSubmit = (values: z.infer<typeof OrderSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
          createOrder(values, items)
            .then((data) => {
              setError(data.error);
              setSuccess(data.success);
            });
        });
      };

      const handleAddItem = (item: MenuItem) => {
        const existingItem = items.find((i) => i.id === item.id);
        if (existingItem) {
          setItems(
            items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          );
        } else {
          setItems([...items, { ...item, quantity: 1 }]);
        }
        };
    

        return (
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                <ItemsPicker availableItems={availableItems} handleAddItem={handleAddItem} items={items} />
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="1234 Elm St."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Extra information</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Extra information"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    Total: {(items.reduce((acc, item) => acc + item.price * item.quantity, 0)).toFixed(2)}
                  </div>
                  <FormError message={error} />
                  <FormSuccess message={success} />
                  <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                  >
                    Order
                  </Button>
                </form>
              </Form>
          );
};

export default OrderForm;