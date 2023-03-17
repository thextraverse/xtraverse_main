import styled from "@emotion/styled";
export const Dashboardsc = styled.div`
  width: 100%;
  position: relative;

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.875rem;
    color: #8a8a8e;
    font-weight: 700;
  }

  span {
    font-size: 0.75rem;
  }

  td,
  th {
    border-bottom: 1px solid #666;
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
  }

  th {
    border-bottom: unset;
    padding: 6px 16px;

    font-size: 0.75rem;
    font-weight: 400;
  }

  td,
  th {
    div {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      svg {
        margin-right: 6px;
        margin-left: 6px;
      }
    }
  }

  .table-head {
    background-color: #252525;
    border-radius: 8px 8px 0px 0px;
  }

  .percent-cont {
    background-color: #252525;
    border-radius: 4px;
    margin-left: 4px;
    padding: 2px;

    svg {
      margin: 0 2px 0 0 !important;
    }

    span {
      font-weight: 400;
      font-size: 0.75rem;
    }
  }
  @media screen and (min-width: 1536px) {
    h2 {
      font-size: 2rem;
      font-weight: 700;
    }
    span {
      font-size: 0.9rem;
    }
    p {
      font-size: 0.95rem;
      color: #8a8a8e;
      font-weight: 700;
    }
  }
`;
export const TopCardDiv = styled.div`
  width: 100%;
  /* Primary/Grey Medium */
  background: #303030;
  /* Outline/Grey */
  border: 1px solid #4f4f4f;
  border-radius: 8px;
  padding: 16px;
`;

export const EngagementsTopDiv = styled.div`
  width: 100%;
  height: 100%;
  /* Primary/Grey Medium */
  background: #252525;
  border-radius: 8px;
  padding: 16px;
`;

export const EngagementsLeftDiv = styled.div`
  width: 100%;
  height: 100%;
  /* Primary/Grey Medium */
  background: #252525;
  border-radius: 8px;
  padding: 16px;
`;

export const EngagementsRightDiv = styled.div`
  width: 100%;
  height: 100%;
  /* Primary/Grey Medium */
  background: #252525;
  border-radius: 8px;
  padding: 16px;
`;

export const CommunityDiv = styled.div`
  width: 100%;
  height: 100%;
  /* Primary/Grey Medium */
  background: #252525;
  border-radius: 8px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .spreed {
    display: flex;
    justify-content: space-between;

    div {
      width: 100%;
    }
  }

  .tx-c {
    text-align: center;
  }
`;
