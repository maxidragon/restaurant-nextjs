"use server";;
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { OrderSchema } from "@/schemas";
import { OrderedItem } from "@/types";
import { z } from "zod";

export const createOrder = async (values: z.infer<typeof OrderSchema>, items: OrderedItem[]) => {
    const user = await currentUser();
    if (!user) {
        throw new Error("You need to be logged in to perform this action");
    }
    const validatedFields = OrderSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { address, note } = validatedFields.data;
    const order = await db.order.create({
        data: {
            address,
            note,
            user: {
                connect: {
                    id: user.id,
                },
            }
        },
    });

    await db.orderItem.createMany({
        data: items.map((item) => ({
            orderId: order.id,
            menuItemId: item.id,
            quantity: item.quantity,
        })),
    });
    


    return { success: "Order created successfully!" };

};