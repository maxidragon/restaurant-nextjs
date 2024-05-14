import { MenuItem } from "@prisma/client";

export interface User extends PublicUser {
    email: string;
    role: string;
}

export interface PublicUser {
    id: string;
    name?: string;
    image?: string;
}

export interface PendingOrder {
    id: string;
    address: string;
    status: string;
    total: number;
    createdAt: Date;
    user: PublicUser;
}

export interface OrderedItem extends MenuItem {
    quantity: number;
}