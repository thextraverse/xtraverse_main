import styled from "@emotion/styled";
export const SignSec = styled.div`
  width: 350px;
  gap: 50px;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  .paginationUl {
    display: flex;
    gap: 10px;
    margin: 25px 0px 10px;
    li {
      background: transparent;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      list-style: none;
      border: 1px solid #fff;
      &.activeLi {
        background: rgba(255, 255, 255, 1);
        border: 1px solid #fff;
      }
    }
  }
  .BackIcon {
    position: absolute;
    top: 10px;
    font-size: 2.4em;
    color: #fff;
    cursor: pointer;
  }
  .nxtBtn {
    border: 2px solid rgba(255, 255, 255, 0.6);
    display: block;
    padding: 10px 20px;
    width: 100%;
    text-align: center;
    text-decoration: none;
    border-radius: 10px;
    font-size: 1.3em;
    cursor: pointer;
    transition: all 0.3s;
    color: #000;
    &:hover {
      background: transparent;
      color: #fff;
    }
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
  span {
    color: rgba(255, 255, 255, 0.8);
  }
  svg {
    color: #fff;
    font-size: 2em;
  }
`;
export const Form = styled.form`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  label {
    display: block;
    padding: 8px 0px;
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
  display: block;
  padding: 20px 0px;
  display: flex;
  gap: 5px;
  a {
    color: #fff;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
