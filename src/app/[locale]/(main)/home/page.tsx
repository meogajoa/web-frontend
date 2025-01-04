import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Room } from '~/components/Room';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-2.5 px-4 py-2.5">
      <div className="flex h-[5.5rem] items-center justify-between px-4">
        <h1 className="text-3xl">게임 이름(추후 협의 필요)</h1>
        <ArrowPathIcon className="size-6 stroke-black" />
      </div>

      <div className="overflow-y-auto">
        {Array.from({ length: 20 }).map((_, index) => (
          <Room
            key={index}
            title="방 제목 1"
            description="미니게임 전용"
            current={1}
            isPrivate
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
