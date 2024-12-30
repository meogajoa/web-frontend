import React from 'react';

type LobbyLayoutProps = Readonly<React.PropsWithChildren>;

const LobbyLayout: React.FC<LobbyLayoutProps> = ({ children }) => {
  return (
    <div>
      <div>
        <p>게임 이름(추후 협의 필요)</p>
      </div>

      {children}
    </div>
  );
};

export default LobbyLayout;
