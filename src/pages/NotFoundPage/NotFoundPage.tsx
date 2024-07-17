import { Link } from 'react-router-dom';

import NotFound from '@/assets/page-not-found.svg';

import {
  BoldText,
  NotFoundImage,
  Main,
  Text,
  ContentHolder,
  HomeButton,
} from './NotFoundPage.styled';

const NotFoundPage: React.FC = () => {
  return (
    <Main>
      <ContentHolder>
        <NotFoundImage src={NotFound} alt="Not found" />
        <BoldText>We are sorry,</BoldText>
        <Text>{"but the page you're looking for doesn't exist"}</Text>
        <Link to="/">
          <HomeButton variant="contained">Return to home</HomeButton>
        </Link>
      </ContentHolder>
    </Main>
  );
};

export default NotFoundPage;
