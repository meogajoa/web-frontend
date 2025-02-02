export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const delay = sleep;

export const getCssVariable = ({
  variableName,
  fallback = '#ffffff',
}: {
  variableName: string;
  fallback?: string;
}) => {
  if (typeof document !== 'undefined') {
    return (
      getComputedStyle(document.documentElement).getPropertyValue(
        variableName,
      ) || fallback
    );
  }

  return fallback;
};
