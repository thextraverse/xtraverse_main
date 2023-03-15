import styled from "@emotion/styled";
export const Wrapper = styled.div`
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
