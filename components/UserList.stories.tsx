import type { Meta, StoryObj } from '@storybook/react';
import UserList from './UserList';

const meta: Meta<typeof UserList> = {
  title: 'Components/UserList',
  component: UserList,
};

export default meta;

type Story = StoryObj<typeof UserList>;

export const Default: Story = {
  args: {
    users: [
      {
        id: 1,
        name: '山田 太郎',
        email: 'taro.yamada@example.com',
        role: '管理者',
        deleted: false,
      },
      {
        id: 2,
        name: '鈴木 花子',
        email: 'hanako.suzuki@example.com',
        role: '一般ユーザー',
        deleted: false,
      },
      {
        id: 3,
        name: '佐藤 次郎',
        email: 'jiro.sato@example.com',
        role: '一般ユーザー',
        deleted: false,
      }
    ]
  },
};