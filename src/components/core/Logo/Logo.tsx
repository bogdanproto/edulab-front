import LogoIcon from '@/assets/logo.svg?react';

function Logo({
  color = 'white',
  height = 42,
  width = 160,
  ...rest
}: {
  color?: string;
  height?: number;
  width?: number;
  [key: string]: unknown;
}): JSX.Element {
  return (
    <LogoIcon
      height={height}
      width={width}
      style={{ color: color }}
      {...rest}
    />
  );
}

export default Logo;
