"use server";

import {currentUser} from "@/lib/auth";
import {db} from "@/lib/db";
import {PendingOrder} from "@/types";

export const getPendingOrders = async (): Promise<PendingOrder[]> => {
    const user = await currentUser();

    // @ts-ignore
    if (!user || !["ADMIN", "EMPLOYEE"].includes(user?.role)) {
        throw new Error("You are not authorized to perform this action");
    }

    const orders = await db.order.findMany({
        select: {
            id: true,
            address: true,
            status: true,
            createdAt: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            items: {
                select: {
                    menuItem: {
                        select: {
                            price: true,
                        },
                    }
                }
            }
        },
        where: {
            status: "PENDING",
        }
    });
    return orders.map((order) => {
        const total = order.items.reduce((acc, item) => {
            return acc + item.menuItem.price;
        }, 0);
        return {
            ...order,
            user: {
                ...order.user,
                name: order.user.name || "Guest",
                image: order.user.image || undefined,
            },
            total,
        };
    });
};