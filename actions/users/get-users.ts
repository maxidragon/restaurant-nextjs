"use server";

import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const getUsers = async () => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    return db.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            image: true,
        },
    });
};