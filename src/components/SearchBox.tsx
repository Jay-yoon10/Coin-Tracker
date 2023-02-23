import styled from 'styled-components';

interface ISearchBox {
  className: string;
  placeholder: string;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  -webkit-appearance: none;
  border: 1px solid ${(props) => props.theme.textColor};
  outline: none;
  padding: 10px;
  width: 350px;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
`;
export default function SearchBox(props: ISearchBox) {
  return (
    <Container>
      <Input
        className={`search-box ${props.className}`}
        type='search'
        placeholder={props.placeholder}
        onChange={props.onChangeHandler}
      />
    </Container>
  );
}
