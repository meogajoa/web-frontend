import { CreateRoomButton } from '~/components/Button';
import HomeHeader from '~/components/HomeHeader';
import RoomList from '~/components/RoomList';

const HomePage = () => {
  return (
    <>
      <HomeHeader className="fixed inset-0 z-10" renderPlaceholder />
      <RoomList />
      <CreateRoomButton className="fixed bottom-24 right-4 z-20" />
    </>
  );
};

export default HomePage;
