import { z } from "zod";

export const familySchema = z.object({
  name: z.string().min(1, "Parent/Guardian name is required"),
  email: z.string().email("Enter a valid email"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP is required"),
});

export const studentSchema = z.object({
  firstName: z.string().min(1, "Student first name is required"),
  lastName: z.string().min(1, "Student last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
});

export const enrollmentSchema = z.object({
  selectedMembership: z.any().refine((v) => v, {
    message: "Please select a membership",
  }),
  requiredPolicies: z.literal(true, {
    message: "Please accept all policies",
  }), 
});
