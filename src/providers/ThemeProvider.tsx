'use client';

import React, { PropsWithChildren } from 'react';
import { useStore } from 'zustand';
import { createThemeStore, ThemeState, ThemeStore } from '~/stores/theme';
import { Nullable } from '~/types/misc';
import { assert } from '~/utils/assert';

export type ThemeStoreApi = ReturnType<typeof createThemeStore>;

export const ThemeStoreContext =
  React.createContext<Nullable<ThemeStoreApi>>(null);

type Props = Pick<ThemeState, 'bgColor'>;

export const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...initState
}) => {
  const storeRef = React.useRef<ThemeStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createThemeStore(initState);
  }

  return (
    <ThemeStoreContext.Provider value={storeRef.current}>
      <ThemeController>{children}</ThemeController>
    </ThemeStoreContext.Provider>
  );
};

const ThemeController: React.FC<PropsWithChildren> = ({ children }) => {
  const { bgColor } = useTheme();

  return (
    <>
      {children}

      <style>
        {`
          body {
            background-color: ${bgColor};
          }
        `}
      </style>
    </>
  );
};

export const useThemeStore = <T,>(selector: (store: ThemeStore) => T): T => {
  const themeStoreContext = React.useContext(ThemeStoreContext);
  assert(
    themeStoreContext,
    'useThemeStore must be used within <ThemeProvider />',
  );

  return useStore(themeStoreContext, selector);
};

export const useTheme = () => {
  const themeStore = useThemeStore((store) => store);

  return themeStore;
};

export const useBodyBgColor = (newBgColor: string) => {
  const { bgColor, setBgColor } = useTheme();
  const bgColorRef = React.useRef(bgColor);

  React.useEffect(() => {
    setBgColor(newBgColor);

    return () => {
      setBgColor(bgColorRef.current);
    };
  }, [newBgColor]);
};
