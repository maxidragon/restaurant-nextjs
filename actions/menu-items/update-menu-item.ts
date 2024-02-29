"use server";

import * as z from "zod";
import {MenuItemSchema} from "@/schemas";
import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const updateMenuItem = async (
    id: string,
    values: z.infer<typeof MenuItemSchema>
) => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    try {
        await db.menuItem.update({
            where: {
                id: id,
            },
            data: {
                name: values.name,
                description: values.description,
                price: +values.price,
            },
        });
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to update menu item",
        };
    } finally {
        return {
            success: "Menu item updated successfully",
        };
    }
}