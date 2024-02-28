"use server";

import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const deleteUser = async (id: string) => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    await db.user.delete({
        where: {
            id,
        },
    });

    return true;
}