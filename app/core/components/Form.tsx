import { useState, ReactNode, PropsWithoutRef } from 'react'
import { Formik, FormikProps } from 'formik'
import { validateZodSchema } from 'blitz'
import { z } from 'zod'
import { Box, BoxProps, chakra } from '@chakra-ui/react'
import { Alert } from './Alert'

export interface FormProps<S extends z.ZodType<any, any>> extends Omit<BoxProps, 'onSubmit'> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: FormikProps<z.infer<S>>['initialValues']
  itemSpacing?: string
  formErrorPosition?: 'top' | 'bottom'
  formErrorTitle?: string
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = 'FORM_ERROR'
export const formError = (error?: string | Error) => ({
  [FORM_ERROR]: typeof error === 'string' ? error : error?.message,
})

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  itemSpacing = '0.55rem',
  formErrorPosition = 'top',
  ...props
}: FormProps<S>) {
  const [formError, setFormError] = useState<string | null>()
  const errorAlert = <Alert mb={5} type="error" description={formError} />

  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateZodSchema(schema)}
      onSubmit={async (values, { setErrors }) => {
        setFormError(null)

        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}

        if (FORM_ERROR) {
          setFormError(FORM_ERROR)
        }

        if (Object.keys(otherErrors).length > 0) {
          setErrors(otherErrors)
        }
      }}
      validateOnMount={false}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box as="form" onSubmit={handleSubmit as never} {...props}>
          {formError && formErrorPosition === 'top' && errorAlert}

          {children}

          {formError && formErrorPosition === 'bottom' && errorAlert}

          {submitText && (
            <button type="submit" disabled={isSubmitting}>
              {submitText}
            </button>
          )}
        </Box>
      )}
    </Formik>
  )
}

export default Form
