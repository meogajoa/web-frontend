// types.ts
export type NoticeItemProps = {
  rank: number;
  nickname: string;
  score: number;
  calculation: string;
  prize: string;
  className?: string;
};

export type VoteNoticeItemProps = {
  nickname: string;
  voteIcon: string;
  votes: number;
  variant?: 'default' | 'dark';
  profileColor?: 'gray' | 'light-gray';
  className?: string;
};

export type TeamNoticeItemProps = {
  rank: number;
  teamName: string;
  numberIcons: { number: number; team: '흑' | '백' }[];
  variant?: 'default' | 'dark';
  prize: string;
  className?: string;
};

export type ResultData =
  | {
      type: 'game';
      data: NoticeItemProps[];
    }
  | {
      type: 'vote';
      data: VoteNoticeItemProps[];
    }
  | {
      type: 'team';
      data: TeamNoticeItemProps[];
    };
