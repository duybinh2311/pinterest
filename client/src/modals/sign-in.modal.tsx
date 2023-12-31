import { Title } from '@mantine/core'
import { modals } from '@mantine/modals'

import { AppLogo } from '@/components/app-logo'
import { FormSignIn } from '@/components/form-sign-in'

import { styles } from './modal.styles'

export const onModalSignIn = () => {
  return modals.open({
    title: <AppLogo w={35} />,
    children: (
      <>
        <Title
          order={2}
          ta={'center'}
          c={'gray'}
        >
          Welcome to Pinterest
        </Title>
        <FormSignIn />
      </>
    ),
    centered: true,
    closeButtonProps: {
      size: 'lg',
      radius: 'xl',
      style: styles.closeButton,
    },
    styles: {
      title: styles.title,
    },
  })
}
