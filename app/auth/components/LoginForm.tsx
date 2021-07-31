import { useMutation } from 'blitz'
import { Form, formError } from 'app/core/components/Form'
import login, { Login_User } from 'app/auth/mutations/login'
import { BeforeLogin, Login, LoginSchema, Signup, SignUpSchema } from 'app/auth/validations'
import { CheckboxSingleControl, InputControl, SubmitButton } from 'formik-chakra-ui'
import { Button, chakra, Collapse, Heading, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import AiOutlineGoogle from '@meronex/icons/ai/AiOutlineGoogle'
import AiFillApple from '@meronex/icons/ai/AiFillApple'
import getIfUserExists from '../mutations/getIfUserExists'
import { useMemo } from 'react'
import { z } from 'zod'

type LoginFormProps = {
  onSuccess?: (user: Login_User) => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [getIfUserExistsMutation, { data: userExists }] = useMutation(getIfUserExists)
  const [stage, setStage] = useState(0)

  const handleSubmit = async (values: LoginSchema | SignUpSchema) => {
    try {
      switch (stage) {
        case 0:
          await getIfUserExistsMutation({ email: values.email })
          setStage(1)
          break
        case 1:
          if (userExists) {
            const user = await loginMutation({
              email: values.email,
              password: values.password,
            })
            onSuccess?.(user)
          } else {
          }
          break
        default:
          break
      }
    } catch (error) {
      return formError(error)
    }
  }

  const schema = useMemo(() => {
    switch (stage) {
      case 0:
        return BeforeLogin
      case 1:
        return userExists ? Login : Signup
      default:
        return z.object({})
    }
  }, [stage, userExists])

  return (
    <Form
      schema={schema}
      initialValues={{
        email: '',
        password: '',
      }}
      maxW="sm"
      px={4}
      mx="auto"
      d="flex"
      h="full"
      justifyContent="center"
      flexDir="column"
      onSubmit={handleSubmit}
    >
      <Heading textAlign="center" pb={4} mb={2}>
        {stage < 1 ? 'Sign In' : <>{userExists ? 'Sign In' : 'Sign Up'}</>}
      </Heading>
      <VStack borderBottomWidth={1} pb={4} mb={4} w="full" alignItems="flex-start">
        <Button leftIcon={<AiOutlineGoogle />} borderColor="blackAlpha.100" w="full">
          <chakra.span w="full">Continue with Google</chakra.span>
        </Button>
        <Button w="full" borderColor="blackAlpha.100" leftIcon={<AiFillApple />}>
          <chakra.span w="full">Continue with Apple</chakra.span>
        </Button>
      </VStack>
      <InputControl
        name="email"
        label="Email Address"
        inputProps={{ placeholder: 'Enter your email address...', autoComplete: 'email' }}
        onChange={() => setStage(0)}
      />
      <Collapse unmountOnExit in={stage >= 1}>
        <VStack mt={2}>
          <InputControl
            name="password"
            label="Password"
            inputProps={{
              placeholder: 'Enter your password',
              autoComplete: userExists ? 'current-password' : 'new-password',
              type: 'password',
            }}
          />
          {!userExists && (
            <>
              <InputControl
                name="fullName"
                label="Full Name"
                inputProps={{ placeholder: 'e.g. John Doe', autoComplete: 'name' }}
              />
              <CheckboxSingleControl checkBoxProps={{ my: 1 }} name="agreedToTosAndPrivacy">
                <chakra.span fontSize="sm" color="mode.secondary.800">
                  I agree to the terms of service and privacy policy
                </chakra.span>
              </CheckboxSingleControl>
            </>
          )}
        </VStack>
      </Collapse>
      <SubmitButton
        bg="brand.50"
        _hover={{ bg: 'brand.200' }}
        _active={{ bg: 'brand.200' }}
        borderColor="brand.300"
        color="brand.800"
        colorScheme="brand"
        mt={3}
      >
        {stage < 1 ? (
          'Continue with Email'
        ) : (
          <>{userExists ? 'Login with Email' : 'Sign Up with Email'}</>
        )}
      </SubmitButton>
    </Form>
  )
}

export default LoginForm
