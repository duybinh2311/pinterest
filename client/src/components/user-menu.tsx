import { FC } from 'react'

import { ActionIcon, Avatar, Box, Group, Menu, Stack, Text } from '@mantine/core'

import { IconBellFilled, IconCheck, IconChevronDown, IconMessageCircle } from '@tabler/icons-react'

import { useCss } from '@/hooks/css.hook'
import { useAppNavigate } from '@/hooks/navigate.hook'
import { SignOutFunc } from '@/modules/account/account.types'
import { AppModule } from '@/modules/app/app.module'
import { ProfileUserResDto } from '@/modules/user/user.types'
import { vars } from '@/theme'

interface UserMenuProps {
  profile: ProfileUserResDto | null
  signOutFunc: SignOutFunc
}

export const UserMenu: FC<UserMenuProps> = (props) => {
  /* Hook Init */
  const navigate = useAppNavigate()

  const menuItemStyle = useCss({
    borderRadius: vars.radius.xl,
    backgroundColor: 'transparent',
    hover: {
      backgroundColor: vars.colors.dark.light,
    },
  })

  return (
    <Group gap={0}>
      <ActionIcon
        c={vars.colors.gray[6]}
        radius={'xl'}
        size={40}
        style={menuItemStyle}
      >
        <IconBellFilled />
      </ActionIcon>

      <ActionIcon
        c={vars.colors.gray[6]}
        radius={'xl'}
        size={40}
        style={menuItemStyle}
      >
        <IconMessageCircle />
      </ActionIcon>

      <ActionIcon
        c={vars.colors.gray[6]}
        radius={'xl'}
        size={40}
        style={menuItemStyle}
        onClick={navigate.profile.root}
      >
        <Avatar
          src={AppModule.config.APP_API_URL + props.profile?.avatar}
          size={'sm'}
        />
      </ActionIcon>

      <Menu
        position='bottom-end'
        width={300}
      >
        <Menu.Target>
          <ActionIcon
            c={vars.colors.gray[6]}
            radius={'xl'}
            size={40}
            style={menuItemStyle}
          >
            <IconChevronDown />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Currently in</Menu.Label>
          <Menu.Item
            bg={'gray.1'}
            onClick={navigate.profile.root}
          >
            <Group
              wrap='nowrap'
              gap={'xs'}
            >
              <Avatar
                src={AppModule.config.APP_API_URL + props.profile?.avatar}
                size={'lg'}
              />

              <Stack gap={5}>
                <Text
                  inline
                  fw={500}
                  fz={'sm'}
                >
                  {props.profile?.userName || props.profile?.fullName}
                </Text>
                <Text
                  inline
                  fw={'lighter'}
                  fz={'xs'}
                >
                  Personal
                </Text>
                <Text
                  inline
                  fw={500}
                  w={180}
                  fz={'xs'}
                  c={'dimmed'}
                  truncate
                >
                  {props.profile?.email || 'user@gmail.com'}
                </Text>
              </Stack>

              <Box>
                <IconCheck size={16} />
              </Box>
            </Group>
          </Menu.Item>

          <Menu.Label>Your accounts</Menu.Label>
          {['Add account', 'Convert to business'].map((item) => {
            return (
              <Menu.Item
                fw={'bold'}
                key={item}
              >
                {item}
              </Menu.Item>
            )
          })}

          <Menu.Label>More options</Menu.Label>
          {['Settings', 'Tune your home feed', 'Get help', 'See terms of service', 'See privacy policy', 'Log out'].map(
            (item) => {
              return (
                <Menu.Item
                  fw={'bold'}
                  key={item}
                  onClick={item === 'Log out' ? props.signOutFunc : undefined}
                >
                  {item}
                </Menu.Item>
              )
            }
          )}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
