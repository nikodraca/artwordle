import { Twitter } from 'react-feather';

import { Textarea, StyledTwitterShareButton } from '.';
import { TWITTER_URL } from '../constants';

interface ResultsProps {
  textResponse: string;
}

export const Results = ({ textResponse }: ResultsProps) => (
  <>
    <Textarea value={textResponse} readOnly />

    <StyledTwitterShareButton url={TWITTER_URL} title={textResponse} resetButtonStyle={false}>
      Share <Twitter />
    </StyledTwitterShareButton>
  </>
);
