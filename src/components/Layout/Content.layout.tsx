import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  justify-content: center;
`;

interface Props {
  children: JSX.Element
}

const ContentLayout: React.FC<Props> = ({ children }) => {
  return <Container>{children}</Container>
}


export default ContentLayout;