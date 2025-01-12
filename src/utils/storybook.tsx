export const RemovePadding: React.FC = () => (
  <style>
    {`
      body {
        padding: 0 !important;
      }
    `}
  </style>
);

export const FullScreen: React.FC = () => (
  <style>
    {`
      #storybook-root {
        height: 100%;
      }
    `}
  </style>
);
