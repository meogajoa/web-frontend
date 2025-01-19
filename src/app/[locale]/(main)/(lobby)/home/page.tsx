import { CreateRoomButton } from '~/components/Button';
import HomeHeader from '~/components/HomeHeader';
import RoomList from '~/components/RoomList';

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <RoomList />
      <CreateRoomButton className="fixed bottom-24 right-4 z-20" />
    </>
  );
};

export default HomePage;
