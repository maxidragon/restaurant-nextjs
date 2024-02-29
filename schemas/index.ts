import * as z from "zod";
import {Role} from "@prisma/client";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required",
    }),
});

export const UserSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    role: z.nativeEnum(Role),
});

export const MenuItemSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    price: z.string().min(1, {
        message: "Price is required",
    }),
    description: z.string().min(1, {
        message: "Description is required",
    }),
});
