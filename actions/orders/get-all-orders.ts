"use server";

import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const getAllOrders = async () => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || !["ADMIN", "EMPLOYEE"].includes(user?.role)) {
        throw new Error("You are not authorized to perform this action");
    }

    return db.order.findMany({
        select: {
            id: true,
            address: true,
            status: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};