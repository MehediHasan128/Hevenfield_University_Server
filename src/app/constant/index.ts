import { Schema } from "mongoose";
import { z } from "zod";

export type TAddress = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export const addressSchema = new Schema<TAddress>({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    }
});

export const addressValidationSchema = z.object({
    street: z.string({required_error: 'Street is required'}),
    city: z.string({required_error: 'City is required'}),
    state: z.string({required_error: 'State is required'}),
    postalCode: z.string({required_error: 'Postal code is required'}),
    country: z.string({required_error: 'Country is required'}),
})