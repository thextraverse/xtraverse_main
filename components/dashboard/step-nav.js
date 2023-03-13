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
  top: 65px;
  z-index: 9;
  left: 0px;
`;
const Ul = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-between;
  padding: 10px 0px;
  width: 580px;
  margin: auto;
  li {
    display: flex;
    align-items: center;
    gap: 8px;
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
    font-weight: 500;
    &.active {
      color: rgba(255, 255, 255.1);
      font-weight: 700;
    }
  }
`;

function Stepnav() {
  const router = useRouter();
  const navItems = [
    {
      href: "/project/selectProject",
      label: "01 Select Template /",
    },
    {
      href: "/project/editMarketplace",
      label: "02 Edit Marketplace /",
    },
    {
      href: "/project/editWebsite",
      label: "03 Edit Website /",
    },
    {
      href: "/project/editWebsite",
      label: "04 Launch",
    },
  ];
  return (
    <StepBar>
      <Ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <a className={router.pathname === item.href ? "active" : ""}>
                {item.label}
              </a>
            </Link>
            {/* <Box sx={{ width: "100%", height: "2px" }}></Box> */}
          </li>
        ))}
      </Ul>
    </StepBar>
  );
}
export default Stepnav;
