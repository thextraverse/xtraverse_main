import styled from "@emotion/styled";
export const HeaderSection = styled.div`
  position: relative;
`;
export const Aside = styled.aside`

  height: 100vh;
  background: "#252525";
  // border-radius: "20px";
  // margin: "10px 20px";



  .nav {
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    //width: 15vw;
    // border-radius: 16px;
    
    margin-top: 1.5vh;
    border-radius: 25px;
    background: #252525;
    height: 100vh;
    // overflow: hidden;
    .logo {
      padding: 25px 0px 15px;
      width: 100%;
      line-height: 0px !important;
      cursor: pointer;
      span {
        width: 100% !important;
        img {
          object-fit: cover;
        }
      }
    }

    .ant-menu-dark .ant-menu-item-selected {
      background-color: #424242;
    }

    .ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
      background: #252525;
    }

    .ant-menu-item {
      margin: 15px 5px;
    }
    .ant-menu-item-icon {
      font-size: 1.8em !important;
    }
    .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
      background: #fff !important;
      color: #000;
    }
  
    a {
      color: inherit !important;
    }
    
    > ul {
      width: 100%;
      height: 100%;
      background: #252525;
      position: relative;

      .ant-menu-item-selected {
        border-radius: 12px;
        background: #323232 !important;
        color: #04fcbc !important;
        path {
          stroke: #04fcbc;
        }
        
      }
      :where(.css-dev-only-do-not-override-1me4733).ant-menu-dark .ant-menu-submenu-selected >.ant-menu-submenu-title {
        color: #04fcbc;
        path {
          stroke: #04fcbc;
        }
    }
      :where(.css-dev-only-do-not-override-1me4733).ant-menu-submenu-popup .ant-menu-item-selected {
        background: #04fcbc !important;
        }
        
        :where(.css-dev-only-do-not-override-1me4733).ant-menu-inline-collapsed >.ant-menu-item, :where(.css-dev-only-do-not-override-1me4733).ant-menu-inline-collapsed >.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-item, :where(.css-dev-only-do-not-override-1me4733).ant-menu-inline-collapsed >.ant-menu-item-group>.ant-menu-item-group-list>.ant-menu-submenu>.ant-menu-submenu-title, :where(.css-dev-only-do-not-override-1me4733).ant-menu-inline-collapsed >.ant-menu-submenu>.ant-menu-submenu-title {
        padding-top: 5px !important;
        inset-inline-start: 0;
        padding-inline: calc(50% - 18px) !important;
        text-overflow: clip;
        }  
        :where(.css-dev-only-do-not-override-1me4733).ant-menu-inline.ant-menu-root .ant-menu-item >.ant-menu-title-content, :where(.css-dev-only-do-not-override-1me4733).ant-menu-inline.ant-menu-root .ant-menu-submenu-title >.ant-menu-title-content{
          text-align: start;

        }
      }
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
    top: 40%;
    color: #fff;
  }
`;
