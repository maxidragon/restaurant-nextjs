"use server";

import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const getMenuItems = async () => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    return db.menuItem.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
        },
    });
};
