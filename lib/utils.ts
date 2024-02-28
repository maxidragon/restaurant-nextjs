import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const prettyRoleName = (role: string) => {
    switch (role) {
        case "ADMIN":
            return "Owner";
        case "EMPLOYEE":
            return "Employee";
        case "USER":
            return "User";
        default:
            return "Unknown";
    }
};