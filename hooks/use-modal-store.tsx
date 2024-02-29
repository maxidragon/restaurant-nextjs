import { create } from "zustand";
import {User} from "@/types";
import {MenuItem} from "@prisma/client";

export type ModalType = "editUser" | "editMenuItem" | "createMenuItem";

interface ModalData {
    user?: User;
    menuItem?: MenuItem;
}


interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));