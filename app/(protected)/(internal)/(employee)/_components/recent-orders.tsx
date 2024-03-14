"use client";

import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar"
import {useEffect, useState} from "react";
import {getPendingOrders} from "@/actions/orders/get-pending-orders";
import {PendingOrder} from "@/types";
import {useRouter} from "next/navigation";

export function RecentOrders() {
    const router = useRouter();
    const [orders, setOrders] = useState<PendingOrder[]>([]);

    useEffect(() => {
        getPendingOrders().then((data) => {
            setOrders(data);
        });
    }, []);
    return (
        <div className="space-y-8">
            {orders.map((order) => (
                <div className="flex items-center cursor-pointer hover:bg-accent p-3" key={order.id} onClick={() => router.push(`orders/${order.id}`)}>
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={order.user?.image || ""}/>
                        <AvatarFallback>{order.user && order.user.name && order.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{order.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {order.address}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">${order.total}</div>
                </div>
            ))}
        </div>
    );
}