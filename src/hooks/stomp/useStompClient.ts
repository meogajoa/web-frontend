import { STOMP_CLIENT_NAME } from '@/constants/stomp';
import { useStompClient as _useStompClient } from 'react-stomp-hooks';

const useStompClient = (name: string = STOMP_CLIENT_NAME) => {
  return _useStompClient(name);
};

export default useStompClient;
