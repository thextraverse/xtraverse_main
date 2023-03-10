import styled from "@emotion/styled";
import React from "react";
export const Main = styled.main`
  background: #303030;
  padding: 30px;
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
export const Form = styled.form`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  padding: 35px;
  .header-type {
    width: 100%;
    border: 2px solid #4f4f4f;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    height: 50px;
    &.active {
      border: 2px solid #71dd37;
    }
    span {
      width: 100% !important;
      img {
        width: 100% !important;
      }
    }
  }

  &.forminput {
    .dltBtn {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      border: none;
      background: transparent;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: #fff;
        color: #000;
      }
    }
    input {
      padding: 15px 15px;
      border: none;
      border-radius: 10px;
      margin: 5px 0px 20px;
      background: #252525;
      @media screen and (max-width: 1400px) {
        padding: 10px 10px;
        margin: 5px 0px 15px;
      }
    }
    span {
      color: #fff;
      font-weight: 400;
      font-size: 0.9em;
    }
    p {
      color: #fff;
      font-weight: 300;
      line-height: 120%;
      padding: 10px 0px;
    }
  }
  .inputsc {
    position: relative;
    border: 2px dashed #4f4f4f;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-bottom: 20px;
    background: #252525;
    @media screen and (max-width: 1400px) {
      padding: 10px 10px;
      margin-bottom: 10px;
    }
    span {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #000;
      font-weight: 500;
      color: #fff;
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
export const PageEditorFrom = styled.div`
  background: #303030;
  border: 2px solid #4f4f4f;
  border-radius: 16px;
  height: 85vh;
  overflow-x: hidden;
  .page-editor-form {
    position: relative;
    height: auto;
    border-bottom: 2px solid #4f4f4f;
  }
  .page-editor-heading-btn {
    background-color: #303030;
    cursor: pointer;
    padding: 15px;
  }
  .page-editor-content-input {
    background-color: #303030;
    max-height: 0;
    overflow-x: hidden;
    transition: max-height 0.3s ease-in-out;
    border-radius: 10px;
    li {
      padding: 10px 20px;
    }
  }
  .activesvg {
    transition: all 0.3s;
  }
  .page-editor-form.active {
    transition: all 0.3s;
    .page-editor-content-input {
      max-height: 100vh; /* or whatever max height you want to set */
      transition: max-height 0.3s ease-in-out;
    }

    .activesvg {
      transform: rotate(180deg);
    }
  }
  .btn-flex {
    display: flex;
    position: relative;
    .visibility {
      position: absolute;
      right: 50px;
      top: 25%;
      cursor: pointer;
    }
  }
  .dropdown-menu-item {
    list-style: none;
    padding: 8px 0;
    cursor: pointer;
  }

  .dropdown-menu-item:hover {
    background-color: #f2f2f2;
  }
`;
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
