import styled from "styled-components";

export const Button = styled.button`
  padding: 1rem;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #ff7b54;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-bottom: 1rem;
  &:hover {
    background-color: #ffd495;
  }
`;
