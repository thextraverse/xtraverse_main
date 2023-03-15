import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
const StepBar = styled.div`
  background: #303030;
  width: 100%;
  position: fixed;
  top: 60px;
  z-index: 9;
  left: 0px;
`;
const Ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  padding: 15px 0px;
  width: 580px;
  margin: auto;
  .key {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: grid;
    place-items: center;
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
    background: #252525;
  }
  li {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 105%;
      transform: translate(0%, -50%);
      width: 40%;
      height: 4px;
      background: #252525;
    }
    &.active {
      /* color: rgba(255, 255, 255.1); */
      a {
        color: #04fcbc;
      }
      .key {
        background: #04fcbc;
        color: #252525;
      }
      &::after {
        background: #04fcbc;
      }
    }
    span {
      font-size: 1.5em;
    }
  }
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    padding: 5px 0px;
    display: block;
    font-size: 0.95em;
    font-weight: 600;
  }
`;

function Stepnav() {
  const router = useRouter();
  const navItems = [
    // {
    //   href: "/project/selectProject",
    //   label: "01 Select Template /",
    // },
    {
      href: [
        // "/project/editMarketplace",
        "/project/editMarketplace/marketplaceSalespage",
        "/project/editMarketplace/thankyouPage",
      ],
      label: " Edit Marketplace ",
      key: "01",
    },

    {
      href: ["/project/editWebsite"],
      label: " Edit Website ",
      key: "02",
    },
    {
      href: ["/project/launch"],
      label: " Launch",
      key: "03",
    },
  ];
  return (
    <StepBar>
      <Ul>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={
              Array.isArray(item.href) && item.href.includes(router.pathname)
                ? "active"
                : ""
            }
          >
            <span className="key">{item.key}</span>

            <Link href={Array.isArray(item.href) ? item.href[0] : item.href}>
              <a>{item.label}</a>
            </Link>
            {/* <Box sx={{ width: "100%", height: "2px" }}></Box> */}
          </li>
        ))}
      </Ul>
    </StepBar>
  );
}
export default Stepnav;
