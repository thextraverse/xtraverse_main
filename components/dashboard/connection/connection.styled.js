import styled from "@emotion/styled";

export const Connectionsec = styled.div`
  width: 670px;
  margin: auto;
  h1 {
    text-align: center;
    margin: 5px 0px 20px;
    color: #fff;
  }
  .img {
    width: 60px;
  }
  .cntpara {
    display: flex;
    align-items: center;
    height: 100%;
    p {
      color: #514f4f;
      font-weight: 600;
      font-size: 1.2em;
      span {
        color: #888787;
        font-size: 0.9em;
      }
    }
  }
  .process {
    padding: 15px 20px;
    background: #fff;
    color: #000;
    display: grid;
    gap: 10px;
    grid-template-columns: 15% auto 15%;
    border-bottom: 2px solid #bdc7d3;

    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      border-bottom: none;
    }
  }
`;
export const Button = styled.div`
  background: #38a169;
  width: 100%;
  height: 45px;
  display: grid;
  place-content: center;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover {
    background: #212121;
    color: #fff;
  }
`;
export const Btn = styled.div`
  background: #38a169;
  width: 100%;
  height: 55px;
  display: grid;
  place-content: center;
  font-weight: 600;
  margin: 20px 0px;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    color: #000;
  }
`;
