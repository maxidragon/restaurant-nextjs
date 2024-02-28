"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserSchema } from "@/schemas";
import * as z from "zod";

export const updateUser = async (
    id: string,
    values: z.infer<typeof UserSchema>
) => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }
    try {
        await db.user.update({
            where: {
                id: id,
            },
            data: {
                name: values.name,
                role: values.role,
            },
        });
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to update session",
        };
    } finally {
        return {
            success: "Session updated successfully",
        };
    }
};