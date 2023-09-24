"use client";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const signupFormSchema = z.object({
  name: z.string(),
  surname: z.string(),
  fatherName: z.string(),
  phone: z.string(),
  birthDate: z.date(),
  currentAddress: z.string(),
  passportAddress: z.string(),
  finCode: z.string().length(7).toUpperCase(),
  identityNumber: z.string().length(9).toUpperCase(),
  password: z.string().min(8),
});

export const loginFormSchema = z.object({
  finCode: z.string().length(7).toUpperCase(),
  password: z.string().min(8),
});

export const creditFormSchema = z.object({
  professionField: z.string(),
  monthlyIncome: z.coerce.number(),
  yearsOfExperience: z.coerce.number(),
  monthsOfExperience: z.coerce.number(),
  region: z.string(),
  businessAddress: z.string(),
  currency: z.string(),
  purpose: z.string(),
  amount: z.coerce.number(),
  duration: z.coerce.number(),
  percentage: z.coerce.number(),
});

export const rnd = function (n: number) {
  return Math.round(n * 100) / 100; // round to 2 digits
};
