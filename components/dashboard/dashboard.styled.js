import styled from "@emotion/styled";

export const Aside = styled.aside`
  position: fixed;
  height: 100vh;
  top: 0vh;
  left: 20px;
  background: #303030;
  overflow: hidden;
  z-index: 9999;
  display: grid;
  place-content: center;
  .nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70px;
    border-radius: 16px;
    background: #252525;
    height: 97vh;
    overflow: hidden;
    .logo {
      padding: 25px 0px 15px;
      width: 100%;
      cursor: pointer;
      span {
        width: 100% !important;
        img {
          object-fit: cover;
        }
      }
    }
    .ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child {
      background: #fff !important;
      color: #000;
    }
    > ul {
      width: 100%;
      height: 100%;
      background: #252525;
      position: relative;
      padding: 12px 5.6px;

      .ant-menu-item-selected {
        border-radius: 12px;
        background: #323232 !important;
        path {
          stroke: #04fcbc;
        }
      }
      li {
        &:last-of-type {
          position: absolute;
          bottom: 10px;
        }
        svg {
          transform: translate(-5px, 5px);
          padding: 1px;
        }
      }
    }
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
