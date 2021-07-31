/* eslint-disable quotes */
import { z } from 'zod'

const password = z.string().min(8).max(100)

export const Signup = z.object({
  email: z.string().email(),
  password,
  fullName: z.string().nonempty(),
  agreedToTosAndPrivacy: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
})

export const BeforeLogin = z.object({
  email: z.string().email(),
})

export const Login = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const ForgotPassword = z.object({
  email: z.string().email(),
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

export type LoginSchema = z.infer<typeof Login>
export type SignUpSchema = z.infer<typeof Signup>
