import React from 'react';
import { HashLoader } from 'react-spinners';
import { useDotsString } from '~/hooks/loading';
import { cn } from '~/utils/classname';

type Props<T> = T & {
  className?: React.ComponentProps<'div'>['className'];
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
  const styles = window?.getComputedStyle(document.documentElement);
  const brandRed = styles?.getPropertyValue('--color-red');

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
