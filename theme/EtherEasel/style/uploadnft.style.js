import styled from "@emotion/styled";

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
  &.forminput {
    .clrP {
      text-align: center;
      font-weight: 600;
      text-transform: capitalize;
    }
    .colorbox {
      width: 80%;
      margin-left: auto;
      position: relative;
      span {
        width: 100%;
        height: 50px;
        display: block;
        border: 2px solid #fff;
        border-radius: 10px;
      }
      input {
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
      }
    }
    .typslction {
      h5 {
        color: #fff;
        font-weight: 400;
      }
      button {
        text-align: left;
        border: 2px solid #fff;
        text-transform: capitalize;
        width: 90%;
        padding: 6px 15px;
        margin: 8px 0px 10px;
        justify-content: left;
        h2 {
          color: #fff;
          line-height: 100%;
          font-size: 1.3em;
        }
        p {
          font-size: 0.7em;
          padding: 5px 0px;
          u {
            font-weight: 600;
          }
        }
      }
    }

    input {
      padding: 18px 10px;
      border: 2px solid #fff;
      border-radius: 10px;
      margin: 5px 0px 20px;
      @media screen and (max-width: 1400px) {
        padding: 10px 10px;
        margin: 5px 0px 15px;
      }
    }
    span {
      color: #fff;
      font-weight: 500;
    }
    h1 {
      color: #fff;
      margin-bottom: 20px;
    }
    p {
      color: #fff;
      font-weight: 300;
      line-height: 120%;
      padding: 10px 0px;
    }
    .royalties {
      display: grid;
      grid-template-columns: 80% auto;
      gap: 8px;
      button {
        height: 50px;
        background-color: #fff;
        font-size: 1.5em;
        color: #000;
        font-weight: 600;
      }
    }
    .roayltiesinput {
      position: relative;
      input {
        height: 50px;
        margin-top: 0px;
      }
      .parcentage {
        position: absolute;
        top: 0px;
        right: 0px;
        border-left: 2px solid #fff;
        height: 50px;
        border-radius: 10px;
        width: 50px;
        display: grid;
        place-items: center;
      }
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
  .inputsc {
    position: relative;
    border: 2px solid rgba(255, 255, 255, 0.6);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-bottom: 25px;
    background: #fff;
    @media screen and (max-width: 1400px) {
      padding: 10px 10px;
      margin-bottom: 10px;
    }
    span {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #000;
      font-weight: 600;
      svg {
        font-size: 2em;
      }
    }
    input {
      border: none;
      padding: 0px;
      margin: 0px;
      position: absolute;
      top: 0px;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: cell;
    }
  }
  textarea {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    width: 100%;
    padding: 15px 10px;
    font-size: 1em;
    color: #fff;
    resize: none;
    height: 100px;
  }
`;
// DomainType
export const PreviewBox = styled.div`
  border: 2px solid #fff;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 10px;
  .Preivewgrid {
    height: 100%;
    width: 100%;
    align-items: center;
    display: grid;
    grid-template-columns: 50% auto;
  }
  .videowrap {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
    align-items: center;
    padding: 0px 50px;
    h1 {
      font-size: 2em;
      text-align: center;
    }
    video {
      height: 100%;
      width: 100%;
      background: #212121;
    }
    p {
      text-align: center;
      margin: auto;
      width: 90%;
      padding: 0px 0px;
    }
  }
  .imgwrap {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img {
      object-fit: cover;
    }
    span {
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .imgbox {
      width: 100%;
      height: 400px;
      background: #212121;
      @media screen and (max-width: 1400px) {
        height: 300px;
      }
      span {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
  h1,
  p,
  span {
    color: #212121;
    line-height: 120%;
    margin: 5px 0px;
  }
  h1 {
    font-size: 3.5em;
  }
  span {
    font-weight: 700;
  }
  p {
    font-size: 0.9em;
    width: 75%;
    @media screen and (max-width: 1400px) {
      font-size: 0.7em;
      width: 85%;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
  .DlrSpan {
    font-size: 1.6em;
    strong {
    }
  }
`;
