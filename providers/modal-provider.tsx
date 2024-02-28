"use client";

import { useState, useEffect } from "react";
import {UpdateUserModal} from "@/components/modals/edit-user-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <UpdateUserModal />
        </>
    );

};