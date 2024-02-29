"use server";

import {db} from "@/lib/db";
import {currentUser} from "@/lib/auth";

export const deleteMenuItem = async (id: string) => {

    const user = await currentUser();
    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    await db.menuItem.delete({
        where: {
            id,
        },
    });

    return true;
};