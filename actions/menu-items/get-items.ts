"use server";;
import {db} from "@/lib/db";

export const getMenuItems = async () => {
    return db.menuItem.findMany();
};
