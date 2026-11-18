import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Add your email so we can reach you.')
  .email('That email doesn’t look quite right.')
  .max(254);

export const waitlistSources = ['hero', 'cta', 'newsletter', 'article'] as const;

export const waitlistRequestSchema = z.object({
  email: emailSchema,
  source: z.enum(waitlistSources),
  ref: z.string().trim().max(200).optional(),
  utm: z.record(z.string().max(100)).optional(),
  // Honeypot — humans never see or fill this.
  company: z.string().max(0).optional(),
});

export type WaitlistRequest = z.infer<typeof waitlistRequestSchema>;
