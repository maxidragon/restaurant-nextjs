"use server";

import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";

export const getUsers = async (search: string) => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || user?.role !== "ADMIN") {
        throw new Error("You are not authorized to perform this action");
    }

    const whereParams = search ? {
        name: {
            contains: search,
        },
    } : {};

    return db.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            image: true,
        },
        where: whereParams,
    });
};