import { useEffect, useState } from 'react';
import { sample, fill } from 'lodash';
import styled from 'styled-components';

import { emojis } from '../utils/color';

const StyledP = styled.p`
  margin-top: 10px;
`;

export const Loader = () => {
  const [emoji, setEmoji] = useState<string>();

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmojis = fill(Array(3), null)
        .map(() => sample(emojis)?.emoji || '')
        .join(' ');

      setEmoji(newEmojis);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [emoji]);

  return <StyledP>{emoji}</StyledP>;
};
