import { Box, BoxProps, chakra, Flex, ListItem, UnorderedList } from '@chakra-ui/react'
import HiInformationCircle from '@meronex/icons/hi/HiInformationCircle'
import HiCheckCircle from '@meronex/icons/hi/HiCheckCircle'
import HiXCircle from '@meronex/icons/hi/HiXCircle'
import HiExclamationCircle from '@meronex/icons/hi/HiExclamationCircle'
import { Fragment } from 'react'

export type AlertType = 'error' | 'warning' | 'success' | 'info'
export type AlertDisplayStyle = 'accent-border' | 'default'

export interface AlertProps extends BoxProps {
  title?: string
  description?: string | null
  children?: React.ReactNode
  messages?: string[]
  type?: AlertType
  dismissable?: boolean
  onDismiss?: () => void
  autoDismiss?: boolean
  autoDismissDelay?: number
  displayStyle?: AlertDisplayStyle
}

const Alert = ({
  title,
  type = 'info',
  description,
  children,
  messages = [],
  dismissable,
  onDismiss,
  autoDismiss,
  autoDismissDelay,
  displayStyle,
  ...props
}: AlertProps) => {
  const colorSchemes: Record<AlertType, string> = {
    error: 'red',
    warning: 'yellow',
    success: 'green',
    info: 'blue',
  }

  const colorScheme = colorSchemes[type]
  const Icon = (() => {
    switch (type) {
      case 'info':
        return chakra(HiInformationCircle)
      case 'success':
        return chakra(HiCheckCircle)
      case 'error':
        return chakra(HiXCircle)
      case 'warning':
        return chakra(HiExclamationCircle)
      default:
        return null
    }
  })()

  return (
    <Box
      as="article"
      role="alert"
      rounded="md"
      px={4}
      py={3}
      borderColor={`${colorScheme}.100`}
      bg={`${colorScheme}.50`}
      borderWidth={1}
      {...props}
    >
      <Flex>
        {Icon && (
          <Box flexShrink={0}>
            <Icon h={5} w={5} color={`${colorScheme}.400`} aria-hidden="true" />
          </Box>
        )}

        <Box ml={3}>
          {title && (
            <Box as="h3" fontSize="sm" fontWeight="medium" color={`${colorScheme}.800`}>
              {title}
            </Box>
          )}

          {(children || description || messages.length >= 1) && (
            <Box fontSize="sm" mt={title ? 2 : 0} color={`${colorScheme}.900`}>
              {description && (
                <Box as="p" fontSize="sm">
                  {description}
                </Box>
              )}

              {messages.length >= 1 && (
                <UnorderedList pl={5} experimental_spaceY={1}>
                  {messages.map((message) => (
                    <ListItem key={message}>{message}</ListItem>
                  ))}
                </UnorderedList>
              )}

              {children && children}
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
//       <article
//         role="alert"
//         tw="rounded-md p-4 border"
//         css={containerStyles[type]}
//         className={className}
//       >
//         <div tw="flex">
//           <div tw="flex-shrink-0">
//             <Icon tw="h-5 w-5" css={iconStyles[type]} aria-hidden="true" />
//           </div>

//           <div tw="ml-3">
//             {title && (
//               <h3 tw="text-sm font-medium" css={titleStyles[type]}>
//                 {title}
//               </h3>
//             )}

//             {(children || description || messages?.length >= 1) && (
//               <div
//                 className="text-sm"
//                 css={css`
//                   ${descriptionStyles[type]}
//                   ${title && tw`mt-2`}
//                 `}
//               >
//                 {description && <p tw="text-sm">{description}</p>}
//                 {messages?.length >= 1 && (
//                   <ul tw="list-disc pl-5 space-y-1">
//                     {messages.map((message) => (
//                       <li key={message}>{message}</li>
//                     ))}
//                   </ul>
//                 )}
//                 {children && children}
//               </div>
//             )}
//           </div>

//           {dismissable && (
//             <div tw="ml-auto pl-3">
//               <div tw="-mx-1.5 -my-1.5">
//                 <button
//                   tw="inline-flex rounded-md p-1.5 focus:(outline-none ring-2 ring-offset-2)"
//                   css={dismissButtonStyles[type]}
//                   type="button"
//                   onClick={handleDismiss}
//                 >
//                   <span tw="sr-only">Dismiss</span>
//                   <XIcon aria-hidden="true" tw="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </article>
//     </Transition>
//   );
// };

export { Alert }
