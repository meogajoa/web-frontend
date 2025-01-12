'use client';

import { CreateRoomButton } from '~/components/Button';
import HomeHeader from '~/components/HomeHeader';
import RoomList from '~/components/RoomList';

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <RoomList />
      <CreateRoomButton className="fixed bottom-[5.5rem] right-4 z-50" />
    </>
  );
};

export default HomePage;
