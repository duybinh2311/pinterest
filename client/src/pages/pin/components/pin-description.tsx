import { FC, useState } from 'react'

import { ActionIcon, Avatar, Button, Group, Stack, Text, Title } from '@mantine/core'

import { IconChevronDown } from '@tabler/icons-react'

import { AppModule } from '@/modules/app/app.module'
import { CommentResDto } from '@/modules/comment/comment.types'
import { AuthorDto } from '@/types'

import { PinComment } from './pin-comment'

interface PinDescriptionProps {
  title?: string
  description?: string
  path: string
  author: AuthorDto
  comments: CommentResDto[]
  getComments: () => void
}

export const PinDescription: FC<PinDescriptionProps> = (props) => {
  /* Local State */
  const [isShowComments, setIsShowComments] = useState<boolean>(true)

  return (
    <Stack
      py={'md'}
      gap={'xl'}
      px={'xl'}
    >
      <Stack>
        <Title
          order={2}
          fw={500}
        >
          {props?.title}
        </Title>

        <Text lineClamp={3}>{props?.description}</Text>

        <Group
          justify='space-between'
          mt={'xs'}
        >
          <Group gap={'xs'}>
            <Avatar
              size={'md'}
              src={AppModule.config.APP_API_URL + props.author.avatar}
            />
            <Stack gap={0}>
              <Text
                fz='sm'
                fw={500}
              >
                {props.author.userName || props.author.fullName}
              </Text>
              <Text
                fz='xs'
                c={'dimmed'}
              >
                53 followers
              </Text>
            </Stack>
          </Group>

          <Button
            radius={'xl'}
            size='md'
          >
            Follow
          </Button>
        </Group>
      </Stack>

      <Stack>
        <Group justify='space-between'>
          <Text
            fw={500}
            fz='xl'
          >
            Comments
          </Text>

          <ActionIcon
            variant='transparent'
            onClick={() => setIsShowComments((s) => !s)}
          >
            <IconChevronDown
              style={{
                transition: 'transform 0.2s ease-in-out',
                transform: isShowComments ? 'rotate(-180deg)' : 'rotate(0deg)',
              }}
            />
          </ActionIcon>
        </Group>

        <>
          {isShowComments &&
            props.comments.map((comment) => {
              return (
                <PinComment
                  key={comment.id}
                  comment={comment}
                  getComments={props.getComments}
                />
              )
            })}
        </>
      </Stack>
    </Stack>
  )
}
