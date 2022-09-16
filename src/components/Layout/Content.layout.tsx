import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
`;

interface Props { }

const ContentLayout: React.FC<Props> = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default ContentLayout;
