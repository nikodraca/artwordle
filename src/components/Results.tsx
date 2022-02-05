import { Twitter } from 'react-feather';

import { Textarea, StyledTwitterShareButton } from '.';

interface ResultsProps {
  textResponse: string;
}

export const Results = ({ textResponse }: ResultsProps) => (
  <>
    <Textarea value={textResponse} readOnly />

    <StyledTwitterShareButton url={'http:share.com'} title={textResponse} resetButtonStyle={false}>
      Share <Twitter />
    </StyledTwitterShareButton>
  </>
);
