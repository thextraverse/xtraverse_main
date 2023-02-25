import styled from "@emotion/styled";
export const EditHomesc = styled.div``;
export const Wrapper = styled.div`
  width: 400px;
  margin: auto;
  .activeDot {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin: 30px 0px;
    li {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      list-style: none;
      background: transparent;
      border: 2px solid #fff;
      transition: all 0.3s;
      &.active {
        background: #fff;
      }
    }
  }
`;
export const Step = styled.div`
  text-align: center;
  color: #fff;

  h1 {
    font-weight: 800;
    color: #fff;
  }
`;

export const Form = styled.form`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  &.domainForm {
    label {
      display: block;
      color: #fff;
      font-weight: 400;
    }
    span {
      font-size: 0.7em;
      display: block;
    }
    input {
      margin: 5px 0px;
    }
  }
  &.DomainTypeForm {
    span {
      color: #fff;
    }
    input {
      padding: 10px 20px;
      border: none;
      &::placeholder {
        opacity: 0.7;
      }
    }
    p {
      color: #fff;
      font-weight: 300;
      line-height: 120%;
      padding: 10px 0px;
    }
  }
  input {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    width: 100%;
    padding: 15px 20px;
    font-size: 1em;
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
export const FormInput = styled.div`
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translate(-50%, -50%);
    font-size: 1.8em;
    color: #fff;
    &.rotateSvg {
      transform: translate(-50%, -50%) rotate(-30deg);
    }
  }
`;
