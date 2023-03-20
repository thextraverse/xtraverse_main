import styled from "@emotion/styled";
export const Main = styled.main`
  margin-top: 82px;
  /* 252525 */
  /* 303030 */
  /* padding: 30px; */
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
  .hero-type {
    border: 2px solid #4f4f4f;
    border-radius: 10px;
    overflow: hidden;
    margin: 5px;
    cursor: pointer;
    height: 140px;
    span {
      width: 100% !important;
      height: 100% !important;
      img {
        width: 100% !important;
        object-fit: cover;
      }
    }
    &.active {
      border: 2px solid #04fcbc;
    }
  }
  .header-type {
    width: 100%;
    border: 2px solid #4f4f4f;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    height: 50px;
    &.active {
      border: 2px solid #04fcbc;
    }
    span {
      width: 100% !important;
      img {
        width: 100% !important;
      }
    }
  }
  .BtnLinksc {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    button {
      width: 100%;
      background: #252525;
      padding: 15px 0px;
      border-radius: 15px;
      &.active {
        border: 2px solid #04fcbc;
      }
      svg {
        transform: scale(1.6);
      }
    }
  }
  &.forminput {
    .previewimages {
      width: 70px;
      img {
        object-fit: contain;
      }
    }
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
    input,
    textarea {
      padding: 15px 15px;
      border: none;
      border-radius: 10px;
      margin: 5px 0px 20px;
      background: #252525;
      outline: none;
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
  .grndBrdr {
    width: 100%;
    padding: 15px;
    background: #252525;
    border-radius: 10px;
    color: #fff;
    border: 2px solid #04fcbc;
    margin-bottom: 18px;
  }
  .selectColorType {
    position: relative;
    .picColor {
      position: fixed;
      top: 50%;
      left: 45%;
      transform: translate(-50%, -50%);
      z-index: 9;
      background: #fff;
      padding: 10px;
      border-radius: 10px;
      input {
        padding: 0;
        margin: 0px;
        background: #fff !important;
      }
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
    &.btninputsc {
      padding: 0px;
      margin-bottom: 5px;
    }
    button {
      border: none;
      color: #fff;
      font-weight: 400;
      display: flex;
      gap: 5px;
      padding: 0px;
      width: 100%;
      cursor: pointer;
      padding: 15px 20px;

      svg {
        font-size: 2em;
      }
    }
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
  .colorPallete {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    background: #252525;
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    margin: 5px 0px;
    .dflex {
      display: flex;
      align-items: center;
      gap: 10px;
      .pastecolor {
        padding: 0;
        margin: 0;
      }
    }
    .selectColor {
      position: relative;
      input {
        width: 20px;
        height: 20px;
        top: 0px;
        position: absolute;
        background: transparent;
        opacity: 0;
        cursor: pointer;
        padding: 0;
        margin: 0;
      }
    }
  }
  .royalties {
    display: grid;
    grid-template-columns: 90% auto;
    gap: 8px;
    margin-top: 7px;
    button {
      height: 50px;
      font-size: 1.5em;
      color: #000;
      font-weight: 600;
      svg {
        transform: scale(1.4);
      }
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
      top: 15%;
      right: 10px;
      height: 30px;
      width: 30px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      border: 2px solid #fff;
      svg {
        font-size: 1em;
        font-weight: 800;
        color: #fff;
      }
    }
  }
`;
export const EditorInputSec = styled.div`
  position: fixed;
  width: 580px;
  height: calc(100vh - 60px);
  z-index: 9;
  background: #303030;
  padding: 0px 20px 20px 20px;
  overflow-x: hidden;
  padding-left: 100px;
  left: 0px;

  @media screen and (min-width: 1200px) {
    width: 450px;
    margin: auto;
  }
  @media screen and (min-width: 1536px) {
    width: 502px;
    margin: auto;
    left: 0px;
  }
  @media screen and (min-width: 1640px) {
    width: 550px;
    margin: auto;
    padding-left: 100px;
    left: 0px;
    /* left: inherit; */
  }
  @media screen and (min-width: 1840px) {
    width: 640px;
    margin: auto;
    padding-left: 120px;
    left: 0px;
    /* left: inherit; */
  }

  @media screen and (min-width: 1940px) {
    width: 700px;
    margin: auto;
    padding-left: 100px;
    left: 0px;
    /* left: inherit; */
  }
  /* border-right: 1px solid #fff; */
`;

export const PageEditorFrom = styled.div`
  background: #303030;
  border-radius: 16px;
  margin: 42px 0px 10px;
  .editorform {
    border: 2px solid #4f4f4f;
    border-radius: 16px;
  }
  .theme {
    border: 2px solid #4f4f4f;
    border-radius: 16px;
    margin: 0px 0px 20px 0px;
  }
  .page-editor-form {
    position: relative;
    height: auto;
    border-bottom: 2px solid #4f4f4f;
    transition: 0.2s;

    &.active {
      .page-editor-form-btn {
        background: #04fcbc;
        color: #303030;
        border-radius: 0px;
      }
      &:first-of-type {
        .page-editor-form-btn {
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
      }
      .visibility {
        svg {
          color: #303030;
        }
      }
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
  .page-editor-heading-btn {
    background-color: #303030;
    cursor: pointer;
    padding: 15px;
  }
  .page-editor-content-input {
    background-color: #303030;
    max-height: 0;
    overflow: hidden;
    border-radius: 10px;
    transition: max-height 0.3s ease-in-out;
    li {
      padding: 10px 20px;
    }
  }

  .page-editor-form.active {
    transition: max-height 0.5s ease-in-out;

    .page-editor-content-input {
      transition: max-height 0.5s ease-in-out;

      max-height: 300vh; /* or whatever max height you want to set */
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
      display: none;
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
  .typslction {
    button {
      background: #252525;
      text-align: left;
      padding: 10px;
      display: block;
      margin: 0px;
      border-radius: 10px;
      &.active {
        border: 2px solid #04fcbc;
      }
    }

    h2 {
      color: #fff;
    }
    p {
      font-weight: 500;
      text-transform: capitalize;
    }
  }
  label {
    font-weight: 500;
    font-size: 1rem;
    /* identical to box height */

    color: #b1b1b1;
  }
`;
export const HomepagePreview = styled.div`
  width: 90%;
  margin: 10px;
  margin-left: auto;
  height: 100%;
  position: relative;
  overflow: hidden;
  .partnersPrviewImg {
    display: flex;
    width: 80px;
    img {
      object-fit: contain;
    }
  }
  &.templatePreview {
    width: 100%;
    margin: 0px;
    overflow-x: inherit;
    .homesec {
      aspect-ratio: inherit;
      height: 100vh;
      .herotxt {
        text-align: center;
      }
      .herosec {
        height: 80%;
      }
    }
  }
  .homesec {
    position: relative;
    aspect-ratio: 16/9;
    &:hover {
      .deletesc {
        visibility: visible;
        opacity: 1;
      }
    }
    &.parternsc {
      aspect-ratio: 25/9;
      background: #20142d;
    }
    &.descriptionsc {
      .herosec {
      }
      span {
        background: linear-gradient(to bottom, #ff00ea, #2600fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        display: block;
      }
      p {
        font-size: 0.9em;
        color: #7b7583;
      }
      h5 {
        font-weight: 600;
        text-align: left;
      }
      .herosec.destype1 {
        text-align: right;
        h5 {
          text-align: right;
        }
      }
    }
    .GrdntBox {
      width: 40px;
      height: 40px;
      background: linear-gradient(25deg, #2600fc 0%, #ff00ea 100%);
      border-radius: 9.675px;
      margin: 0px 10px;
    }
    .deletesc {
      border: 2px solid #71dd37;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      visibility: hidden;
      opacity: 0;
    }
  }
  .overlaybg {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
  .bgimage {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    span {
      width: 100% !important;
      height: 100% !important;
      img {
        object-fit: cover;
      }
    }
  }
  .headersc {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    position: relative;
    z-index: 4;
  }
  .headerbtn {
    display: flex;
    align-items: center;
    gap: 20px;
    ul {
      a {
        color: #fff;
      }
      li {
        display: inline-block;
        padding: 10px 10px;
      }
    }
    button {
      border: none;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: 600;
      margin: 0px 5px;
      padding: 7px 15px;
      border-radius: 50px;
      color: #fff;
      text-transform: capitalize;
    }
    .waitLstBtn {
      text-transform: capitalize;
      /* background: linear-gradient(25deg, #2600fc 0%, #ff00ea 100%); */
    }
  }
  .waitLstBtn {
    border: none;
    cursor: pointer;
    font-size: 0.85em;
    font-weight: 600;
    padding: 7px 15px;
    border-radius: 50px;
    margin: 0px 5px;
    color: #fff;
    text-transform: capitalize;

    /* background: linear-gradient(25deg, #2600fc 0%, #ff00ea 100%); */
  }
  .logo {
    width: 30px;
    height: 25px;
    img {
      object-fit: cover;
    }
  }
  .herosec {
    margin: auto;
    padding: 25px 0px 10px;
    position: relative;
    z-index: 4;
    width: 100%;
    color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .MuiGrid-container {
      height: 100%;
    }
    .grdntsc {
      display: flex;
      align-items: center;
      padding: 10px 0px;
    }

    &.hero3,
    &.destype3 {
      padding: 0px 210px;
      display: grid;
      place-content: center;
      h1 {
        font-size: 4em;
        line-height: 120%;
      }
      p {
        padding: 20px 0px;
      }
    }
    &.destype1,
    &.destype2 {
      .heroImg {
        padding: 50px 30px;
      }
    }
    &.hero1 {
      h1 {
        font-size: 2.5em;
      }

      p {
        font-size: 0.8em;
        padding: 15px 0px;
      }
    }
    &.hero2 {
      h1 {
        font-size: 2.5em;
      }

      p {
        font-size: 0.8em;
        padding: 15px 0px;
      }
    }
    &.hero2,
    &.destype2 {
      display: grid;
      grid-template-columns: 50% auto;
      width: 85%;
      margin: auto;
      .herotxt {
        text-align: start;
      }
    }
    &.hero1,
    &.destype1 {
      display: grid;
      grid-template-columns: 50% auto;
      direction: rtl;
      width: 90%;
      margin: auto;
      .herotxt {
        h1,
        p {
          text-align: right;
        }
      }
    }
    h1,
    p,
    span {
      font-weight: 600;
    }
    h1 {
      font-size: 3em;
      line-height: 120%;
      font-weight: 800;
      @media screen and (max-width: 1400px) {
        font-size: 2.5em;
      }
    }
    p {
      font-size: 1em;
      @media screen and (max-width: 1400px) {
        font-size: 0.7em;
      }
    }
    button {
      color: #000;
      margin: 10px 0px;
      padding: 8px 40px;
      padding: 7px 15px;
      border-radius: 50px;
      margin: 0px 5px;
      text-transform: capitalize;
      color: #fff;
      /* background: linear-gradient(25deg, #2600fc 0%, #ff00ea 100%); */
    }
  }

  .herotxt {
    height: 100%;
    display: grid;
    place-content: center;
  }
  .heroImg {
    height: 100%;
    display: grid;
    padding: 50px 0px;
  }
`;
export const LaucnhWrapper = styled.div`
  width: 90%;
  margin: auto;
`;
export const Step = styled.div`
  text-align: center;
  color: #fff;
  h1 {
    font-weight: 600;
    color: #fff;
    font-size: 2.2em;
    padding: 15px 0px;
  }
`;

export const LuanchForm = styled.form`
  &.manageDomain {
    input,
    textarea {
      text-align: center;
    }
    p,
    h1 {
      text-align: center;
    }
  }
  input,
  textarea {
    padding: 15px 15px;
    border: none;
    width: 100%;
    border-radius: 10px;
    background: #252525;
    outline: none;
    color: #fff;
    font-size: 1em;
  }
  span {
    color: #fff;
    font-weight: 400;
    font-size: 0.9em;
  }
  h5 {
    font-size: 1.1em;
  }
  p {
    color: #fff;
    font-weight: 400;
    padding: 5px 0px;
    &.instruction {
      line-height: 150%;
      font-size: 1.05em;
    }
    &.allset {
      line-height: 160%;
    }
  }
  @media screen and (max-width: 1400px) {
    input,
    textarea {
      font-size: 0.9em;
    }
    p {
      &.instruction {
        font-size: 1em;
      }
      &.allset {
        line-height: 150%;
      }
    }
  }
`;
export const ActiveDot = styled.div`
  padding: 10px 0px;
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
        border: 2px solid #04fcbc;

        background: #04fcbc;
      }
    }
  }
`;

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
      color: #6c6c6c;
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
    background: #252525;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    margin: 10px 0px;
    border-radius: 10px;
    button {
      width: 150px;
      svg {
        font-size: 1.5em;
        color: #04fcbc;
      }
    }
  }
`;
