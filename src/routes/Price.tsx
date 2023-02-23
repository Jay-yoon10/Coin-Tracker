import styled from 'styled-components';
import BasicTable from '../tables/BasicTable';
const Container = styled.div`
  /* max-width: 480px; */
  margin: 0 auto;
`;

export default function Price() {
  return (
    <Container>
      <BasicTable />
    </Container>
  );
}
