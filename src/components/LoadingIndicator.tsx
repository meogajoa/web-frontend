import React from 'react';
import { HashLoader } from 'react-spinners';
import useDotsString from '~/hooks/misc/useDotsString';
import { cn } from '~/utils/classname';
import { getCssVariable } from '~/utils/misc';

type Props<T> = T & {
  className?: string;
  label: React.ReactNode;
  loaderComponent?: React.ReactNode | React.FC<T>;
};

const LoadingIndicator = <T extends object = {}>({
  className,
  label,
  loaderComponent: LoaderComponent,
  ...props
}: Props<T>) => {
  const dots = useDotsString({ maxLength: 3 });
  const brandRed = getCssVariable({ variableName: '--color-red' });

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-y-4 font-semibold',
        className,
      )}
    >
      {!LoaderComponent ? (
        <HashLoader color={brandRed} {...props} />
      ) : typeof LoaderComponent === 'function' ? (
        <LoaderComponent {...(props as T)} />
      ) : (
        LoaderComponent
      )}

      <div className="text-red relative">
        <span>{label}</span>
        <span className="absolute">{dots}</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
