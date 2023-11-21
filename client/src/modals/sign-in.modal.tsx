import { Title } from '@mantine/core'
import { modals } from '@mantine/modals'

import { AppLogo } from '@/components/app-logo'
import { FormSignIn } from '@/components/form-sign-in'

import { modalStyle } from './modal.css'

export const onModalSignIn = () => {
  return modals.open({
    title: <AppLogo />,
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
      className: modalStyle.closeButton,
    },
    classNames: {
      title: modalStyle.title,
    },
  })
}