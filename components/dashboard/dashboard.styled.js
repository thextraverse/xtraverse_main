import styled from "@emotion/styled";
export const HeaderSection = styled.div`
  position: relative;
`;
export const Aside = styled.aside`
  position: fixed;
  height: 100vh;
  top: 0vh;
  left: 20px;
  background: #303030;
  z-index: 9999;
  display: grid;
  place-content: center;
  .nav {
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    background: #252525;
    height: 97vh;
    padding: 0px;
    &.activenav {
      padding: 20px;
      .ant-menu-item.ant-menu-item-selected {
        background: #303030;
      }
    }
    .logo {
      padding: 25px 0px 15px;
      width: 100%;
      cursor: pointer;
      span {
        width: 100% !important;
        img {
          object-fit: contain;
        }
      }
    }
    .ant-menu-item {
      margin: 15px 5px;
    }
    ul.ant-menu {
      position: relative;
      height: 100%;
      background: #252525;
      border-radius: 15px;
      width: 300px;
    }
    .ant-menu.ant-menu-root.ant-menu-vertical.ant-menu-dark.ant-menu-inline-collapsed {
      width: 60px;
      /* .ant-menu-item {
        width: 30px;
      } */
    }
    .ant-menu-item.ant-menu-item-selected {
      background: transparent;
      .ant-menu-item-icon path {
        stroke: #04fcbc;
      }
      .ant-menu-title-content {
        color: #04fcbc;
      }
    }
    .ant-menu-title-content {
      font-size: 1.25em;
    }
    .ant-menu-item-icon {
      font-size: 1.8em !important;
      transform: translateX(-3px);
    }
    .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
      background: #fff !important;
      color: #000;
    }
  }
`;
export const ProfileDropdown = styled.div`
  background: #252525;
  padding: 15px 20px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #04fcbc50;
  /* display: none; */
  /* .notifyInfo{
    display: ;
  } */
  .buttonsc {
    display: inline-flex;
    gap: 10px;
    align-items: center;
  }
  .notifyInfo {
    display: grid;
    grid-template-columns: 80% auto;
    margin: 10px 0px;
    .img {
      width: 50px;
      height: 30px;
      background: #8a8a8e;
      margin-right: 10px;
    }
    p {
      font-size: 1em;
    }
    span {
      font-size: 0.8em;
    }
    .infowrap {
      display: flex;
    }
  }
  &.notifcationsbar {
    width: 350px;
    h1 {
      font-size: 1em;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #04fcbc;
      margin-top: 10px;
    }
  }
  &.cryptoDropdwonw {
    .crytpDetails {
      display: flex;
      gap: 10px;
      padding: 10px 0px;
      .image {
        width: 40px;
        span {
          width: 30px !important;
          height: 30px !important;
        }
      }
    }
    span {
      color: #e4f12e;
      font-size: 0.7em;
    }
    p {
      font-size: 1.3em;
      line-height: 100%;
    }
  }
  h1 {
    font-size: 1.3em;
    font-weight: 600;
    color: #fff;
  }
  span {
    font-size: 1.1em;
    color: #8a8a8e;
  }
  p {
    font-size: 0.9em;
    font-weight: 500;
    color: #fff;
    /* padding: 12px 0px; */
  }
`;
export const InitializeProject = styled.div`
  width: 350px;
  gap: 50px;
  text-decoration: none;
  border-radius: 10px;
  overflow: hidden;
  padding: 55px 0px;
  span {
    color: #fff;
  }
  h1 {
    color: #fff;
  }
`;
export const H1 = styled.h1`
  font-weight: 900;
  font-size: 2em;
  margin: 100px 0px 10px;
`;
export const Button = styled.button`
  font-weight: 700;
  font-size: 1.1em;
  padding: 10px 40px;
  border: none;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  margin: 30px 0px;
`;
export const Form = styled.form`
  width: 100%;
  color: rgba(255, 255, 255, 0.6);
  label {
    display: block;
    padding: 5px 0px;
    font-size: 0.75em;
    color: #fff;
    padding: 8px 0px;
    font-weight: 500;
  }
  input {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    width: 100%;
    padding: 12px 20px;
    font-size: 1.1em;
    color: #fff;
    outline: none;
    font-family: "Open Sans", sans-serif;
  }
  input[type="submit"] {
    background-color: transparent;
    color: #2f2f2f;
    border: 2px solid #fff;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    color: #fff;
    &:hover {
      background: #fff;
      color: #000;
    }
  }
`;
export const NFT_pro = styled.div`
  border: 2px solid #fff;
  padding: 35px 35px 20px 35px;
  margin: 25px;
  display: flex;
  flex-direction: column;

  .pro_title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .pro_codes {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    margin-bottom: 15px;
  }

  button {
    margin: 30px 0 10px 0;
    padding: 8px 20px;
    border: 2px solid #fff;
    background-color: unset;
    color: #fff;
    border-radius: 3.36759px;

    font-size: 1.15rem;
    cursor: pointer;
  }

  button:last-child {
    margin: 20px 0 10px 0;
  }
`;

export const Imgsc = styled.div`
  width: 100%;
  border: 2px solid #fff;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  span {
    height: 100% !important;
    width: 100% !important;
  }
  img {
    object-fit: cover;
  }
  @media screen and (min-width: 1500px) {
    height: 300px;
  }
`;

export const Ul = styled.ul`
  list-style: none;
  padding: 10px 10px;
  li {
    padding: 0px 0px;
  }
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 15px;
    border-radius: 15px;
    color: #000;
    font-weight: 500;
    color: #fff;
    transition: all 0.3s;
    font-size: 1.1em;
    .ant-menu {
      background: transparent;
    }
    .ant-menu-submenu-title {
      height: auto;
      padding: 0px !important;
      margin: 0px;
      color: #fff;
    }
    svg {
      font-size: 1.4em;
    }
    &:hover {
      background-color: #323232;
    }
  }
`;
export const SearchBox = styled.div`
  position: relative;
  width: 400px;
  outline: none;
  input {
    width: 100%;
    border: 0px;
    border-radius: 5px;
    padding: 10px 10px 10px 30px;
    background: #252525;
    color: #fff;
    font-family: "Poppins", sans-serif;
  }
  svg {
    position: absolute;
    left: 8px;
    top: 30%;
    color: #fff;
  }
`;
