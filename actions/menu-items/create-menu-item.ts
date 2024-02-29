"use server";

import * as z from "zod";
import {MenuItemSchema} from "@/schemas";
import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const createMenuItem = async (
    values: z.infer<typeof MenuItemSchema>
) => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    try {
        await db.menuItem.create({
            data: {
                name: values.name,
                description: values.description,
                price: +values.price,
            },
        });
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create menu item",
        };
    }
    return {
        success: "Menu item created successfully",
    };
}