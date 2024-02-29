"use client";

import { useState, useEffect } from "react";
import {UpdateUserModal} from "@/components/modals/edit-user-modal";
import {EditMenuItemModal} from "@/components/modals/edit-menu-item-modal";
import {CreateMenuItemModal} from "@/components/modals/create-menu-item-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <UpdateUserModal />
            <EditMenuItemModal />
            <CreateMenuItemModal />
        </>
    );

};