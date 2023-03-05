import styled from "@emotion/styled";

export const HomepagePreview = styled.div`
  background: #fff;
  padding: 0px;
  border-radius: 5px;
  height: 100%;
  position: relative;
  overflow: hidden;
  svg {
    position: absolute;
    width: 100%;
    top: -15%;
    z-index: 1;
  }
  .homesec {
    position: relative;
    z-index: 2;
    height: 100%;
    display: grid;
    place-content: center;
  }
  .headersc {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    position: absolute;
    width: 100%;
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
        font-size: 0.65em;
        font-weight: 600;
        margin: 0px 5px;
        &:last-child {
          color: #fff;
          background: #000;
        }
      }
    }
  }
  .herosec {
    display: grid;
    width: 90%;
    margin: auto;
    padding: 25px 0px 10px;
    h3 {
      font-size: 1.1em;
      background-image: linear-gradient(to left, #3e7aee, #786dff, #f66069 80%);
      -webkit-background-size: 100%;
      background-size: 100%;
      background-repeat: repeat;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text; /* for Safari/Chrome */
      text-fill-color: transparent;
    }
    h1,
    p,
    span {
      color: #000;
      font-weight: 600;
    }
    h1 {
      font-size: 1.5em;
      font-weight: 800;
      @media screen and (max-width: 1400px) {
        font-size: 1.3em;
      }
    }
    p {
      font-size: 0.8em;
      color: rgba(0, 0, 0, 0.65);
      @media screen and (max-width: 1400px) {
        font-size: 0.6em;
      }
    }
    button {
      color: #000;
      margin: 10px 0px;
      border: 2px solid #000;
      font-size: 0.65em;
      padding: 6px 30px;
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
      object-fit: cover;
      @media screen and (max-width: 1200px) {
        width: 120px;
        height: 150px;
      }
    }
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
