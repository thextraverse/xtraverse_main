import styled from "@emotion/styled";

export const HomepagePreview = styled.div`
  background: #20142d;
  padding: 0px;
  border-radius: 5px;
  height: 100%;
  position: relative;
  overflow: hidden;

  .homesec {
    position: relative;
    z-index: 2;
  }
  .headersc {
    display: flex;
    justify-content: space-between;
    padding: 15px;

    .logo {
      width: 30px;
      height: 25px;
      img {
        object-fit: cover;
      }
    }
    .headerbtn {
      button {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 0.85em;
        font-weight: 600;
        margin: 0px 5px;
        color: #fff;
        &:last-child {
          color: #fff;
          background: #000;
        }
      }
    }
  }
  .herosec {
    display: grid;
    place-items: center;
    place-content: center;
    text-align: center;
    width: 75%;
    margin: auto;
    padding: 25px 0px 10px;
    h1,
    p,
    span {
      color: #000;
      font-weight: 600;
    }
    h1 {
      font-size: 3em;
      font-weight: 800;
      @media screen and (max-width: 1400px) {
        font-size: 2.5em;
      }
    }
    p {
      font-size: 1em;
      color: rgba(0, 0, 0, 0.65);
      @media screen and (max-width: 1400px) {
        font-size: 0.7em;
      }
    }
    button {
      color: #000;
      margin: 10px 0px;
      border: 2px solid #000;
      font-size: 0.75em;
      padding: 8px 40px;
    }
  }
  .heroimgs {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: 20px;
    @media screen and (max-width: 1400px) {
      margin-top: 10px;
    }
    .img {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, 10%);
      width: 160px;
      height: 220px;
      object-fit: cover;
      @media screen and (max-width: 1200px) {
        width: 120px;
        height: 150px;
      }
      &:nth-of-type(1) {
        transform: translate(-120%, 14%) rotate(-15deg);
        z-index: 2;
      }
      &:nth-of-type(2) {
        z-index: 1;
        transform: translate(-50%, 3%) rotate(-5deg);
      }
      &:nth-of-type(3) {
        transform: translate(20%, 10%) rotate(15deg);
      }
    }
  }
`;
