import { memo } from 'react';

const OptionInput = memo(({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" className={`text-sm h-8 rounded ${props.className}`} {...props} />;
});

export default OptionInput;
