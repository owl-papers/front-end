import { FC, ReactNode, Dispatch, SetStateAction } from 'react';
import Left from '@material-ui/icons/ArrowLeftRounded';
import Right from '@material-ui/icons/ArrowRightOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Container, CurrentPage } from './styles';

export type H1Props = {
  children?: ReactNode;
  page: number;
  setFunction: Dispatch<SetStateAction<number>>;
  className?: string;
};

const PageHandler: FC<H1Props> = ({ setFunction, page, className }) => (
  <Container {...{ className }}>
    <IconButton
      onClick={() => {
        setFunction(page - 1);
      }}
      disabled={page === 1}
    >
      <Left aria-label="left" />
    </IconButton>
    <CurrentPage>{page}</CurrentPage>
    <IconButton onClick={() => setFunction(page + 1)}>
      <Right aria-label="left" />
    </IconButton>
  </Container>
);

export default PageHandler;
