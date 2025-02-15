import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'classnames';
import React from 'react';

type NoticeProps = Readonly<
  React.ComponentProps<'div'> &
    VariantProps<typeof NoticeVariant> & {
      children: React.ReactNode;
      type?: 'gameStart' | 'gameInfo' | 'teamInfo'; // 공지 종류 추가
      time?: number; // gameStart에 필요한 시간
      team?: '흑' | '백'; // teamInfo에 필요한 팀 정보
    }
>;

const NoticeVariant = cva(
  'inline-flex items-center justify-center rounded-[50px] px-4 py-2.5 text-center text-white',
  {
    variants: {
      variant: {
        primary: 'bg-gray-1',
        secondary: 'bg-gray-4',
        danger: 'bg-gray-2',
      },
      type: {
        gameStart: 'w-[13.188rem]',
        gameInfo: 'w-72',
        teamInfo: 'w-[7.625rem]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      type: 'teamInfo',
    },
  },
);

const Notice: React.FC<NoticeProps> = ({
  children,
  className,
  variant,
  type,
  time,
  team,
  ...props
}) => {
  const Message = () => {
    switch (type) {
      case 'gameStart':
        return `오늘의 미니게임은 “신뢰게임” 입니다. ${time}초 후 게임 시작하겠습니다.`;
      case 'gameInfo':
        return `팀원 닉네임 01, 닉네임 02, 닉네임 03, 닉네임 04님과 팀 채팅을 시작합니다.`;
      case 'teamInfo':
        return `당신은 ${team}팀입니다.`;
      default:
        return 'children';
    }
  };
  return (
    <div>
      <div
        className={cn(
          NoticeVariant({ variant, type }),
          className,
          'font-brand text-center text-sm font-normal break-words text-white',
        )}
        {...props}
      >
        <p>{Message()}</p>
      </div>
    </div>
  );
};

export default Notice;
