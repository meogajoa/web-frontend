import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { cn } from '~/utils/classname';

type Props = Readonly<
  Omit<React.ComponentPropsWithRef<typeof ReactTooltip>, 'id'> & {
    contents?: React.ReactNode | React.FC;
    clickToOpen?: boolean;
  }
>;

const Tooltip: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  classNameArrow,
  contents: Contents,
  place = 'bottom',
  clickToOpen,
  children,
  ...props
}) => {
  const id = useId();

  return (
    <>
      <div data-tooltip-id={id}>{children}</div>

      <ReactTooltip
        id={id}
        className={cn('', className)}
        classNameArrow={cn('', classNameArrow)}
        place={place}
        disableStyleInjection={true}
        openEvents={clickToOpen ? { click: true } : undefined}
        {...props}
      >
        {typeof Contents === 'function' ? <Contents /> : Contents}
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
