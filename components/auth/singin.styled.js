import styled from "@emotion/styled";

export const SignSec = styled.div`
  width: 350px;
  gap: 50px;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
`;
export const Btn = styled.button`
  padding: 12px 28px;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  border: 1px solid #fff;
  transition: all 0.3s;
  font-size: 1.15em;
  &:first-of-type {
    background: transparent;
    color: #fff;
  }
  &:hover {
    background: #fff;
    color: #000;
  }
`;

export const GoogleBtn = styled.a`
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: block;
  padding: 10px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 50px;
  text-decoration: none;
  border-radius: 10px;
  cursor: pointer;
  span {
    color: rgba(255, 255, 255, 0.8);
  }
  svg {
    color: #fff;
    font-size: 2em;
  }
`;
export const Hr = styled.hr`
  border: none;
  height: 2px;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  margin: 20px 0px;
`;

export const Form = styled.form`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  label {
    display: block;
    padding: 5px 0px;
  }
  input {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    width: 100%;
    padding: 10px 20px;
    font-size: 1.2em;
    color: #fff;
    outline: none;
    font-family: "Open Sans", sans-serif;
  }
  input[type="submit"] {
    background-color: #fff;
    color: #2f2f2f;
    border: 2px solid #fff;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: transparent;
      color: #fff;
    }
  }
`;
export const Span = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
  display: flex;
  gap: 5px;
  padding: 20px 0px;
  cursor: pointer;
  align-items: center;
  a {
    color: #fff;
    font-weight: 700;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
