import { ReactNode } from 'react';

import { ElementsWrapper } from './AnimatedWrapper.styled';

type TAnimatedWrapperProps = {
  animationTrigger: boolean;
  children: ReactNode;
};

const AnimatedWrapper: React.FC<TAnimatedWrapperProps> = ({
  animationTrigger,
  children,
}) => {
  return (
    <ElementsWrapper
      animate={animationTrigger ? 'shown' : 'hide'}
      variants={{
        shown: {
          height: 'auto',
          opacity: 1,
        },
        hide: {
          height: '0px',
          opacity: 0,
        },
      }}
    >
      {children}
    </ElementsWrapper>
  );
};

export default AnimatedWrapper;
