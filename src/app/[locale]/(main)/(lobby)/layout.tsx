'use client';

import { noop } from 'lodash-es';
import React, { PropsWithChildren } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { BottomNavigationContent } from '~/components/BottomNavigation';

const LobbyLayout: React.FC<PropsWithChildren> = ({ children }) => {
  // Subscribe to the alert topic to receive notifications for like invites, etc.
  // TODO: Implement the alert system
  useSubscription('/topic/alert', noop);

  return (
    <>
      {children}
      <BottomNavigationContent className="bottom-0-dynamic fixed z-10" />
    </>
  );
};

export default LobbyLayout;
