import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const enquirySchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  businessOrSchoolName: z
    .string({ required_error: 'Business or school name is required' })
    .trim()
    .min(2, 'Business or school name must be at least 2 characters')
    .max(120, 'Name cannot exceed 120 characters'),
  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(150, 'Email cannot exceed 150 characters'),
  phoneNumber: z
    .string()
    .trim()
    .max(30, 'Phone number cannot exceed 30 characters')
    .optional()
    .or(z.literal('')),
  serviceRequired: z
    .string({ required_error: 'Please select a required service' })
    .trim()
    .min(2, 'Please select a valid service'),
  estimatedBudget: z
    .string()
    .trim()
    .max(80, 'Budget description cannot exceed 80 characters')
    .optional()
    .or(z.literal('')),
  projectDescription: z
    .string({ required_error: 'Project description is required' })
    .trim()
    .min(15, 'Please provide at least 15 characters describing your project goals')
    .max(3000, 'Project description cannot exceed 3000 characters'),
  desiredTimeline: z
    .string()
    .trim()
    .max(80, 'Timeline cannot exceed 80 characters')
    .optional()
    .or(z.literal('')),
  consent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must provide consent for us to respond to your project enquiry',
    }),
  // Honeypot spam trap
  hp_field: z
    .string()
    .optional()
    .or(z.literal('')),
});

export type ValidatedEnquiry = z.infer<typeof enquirySchema>;

export function validateEnquiry(req: Request, res: Response, next: NextFunction): void {
  // Check honeypot field
  if (req.body.hp_field && req.body.hp_field.trim().length > 0) {
    // Honeypot triggered: Return 400 to prevent bot spam
    res.status(400).json({
      success: false,
      error: 'SPAM_DETECTED',
      message: 'Submission rejected by anti-spam verification filter.',
    });
    return;
  }

  const result = enquirySchema.safeParse(req.body);

  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));

    res.status(422).json({
      success: false,
      error: 'VALIDATION_FAILED',
      message: 'Invalid submission data. Please check the highlighted fields.',
      errors: formattedErrors,
    });
    return;
  }

  req.body = result.data;
  next();
}
