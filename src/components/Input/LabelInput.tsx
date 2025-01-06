import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/classname';
import Input from './Input';

type LabelInputProps = Readonly<
  React.ComponentProps<'div'> & // div props 상속
    VariantProps<typeof LabelInputVariant> & {
      label: string;
      type?: 'text' | 'password' | 'email' | 'textarea';
      placeholder?: string;
      size?: 'lg' | 'md' | 'sm';
      labelsize?: 'lg' | 'md' | 'sm';
      rounded?: 'full' | 'md';
      error?: string;
    }
>;

const LabelInputVariant = cva('w-full text-left', {
  variants: {
    variant: {
      primary: 'mb-1.5 font-normal text-gray-1',
    },
    labelSize: {
      lg: 'text-lg',
      md: 'text-base',
      sm: 'text-sm',
    },
  },
  defaultVariants: {
    variant: 'primary',
    labelSize: 'md',
  },
});

const LabelInput: React.FC<LabelInputProps> = ({
  label,
  type,
  size,
  labelSize,
  rounded,
  placeholder,
  error,
  className,
  ...props
}) => {
  return (
    <div className={cn(`w-full`, className)} {...props}>
      <label className={cn(LabelInputVariant({ labelSize }))}>{label}</label>
      <Input
        type={type}
        size={size}
        rounded={rounded}
        error={error}
        placeholder={placeholder}
      />
      {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
    </div>
  );
};

export default LabelInput;
