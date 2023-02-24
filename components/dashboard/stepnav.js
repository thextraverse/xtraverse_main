import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
const Ul = styled.ul`
  width: 540px;
  display: flex;
  list-style: none;
  justify-content: space-between;
  margin: 100px auto 25px;
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
      href: "/dashboard/createproject",
      label: "Template /",
    },
    {
      href: "/dashboard/createproject/uploadnfts",
      label: "Upload NFTs /",
    },
    {
      href: "/dashboard/createproject/edithomepage",
      label: "Edit Homepage /",
    },
    {
      href: "/dashboard/createproject/connection",
      label: "Connection /",
    },
    {
      href: "/dashboard/createproject/domain",
      label: "Domain",
    },
  ];
  return (
    <>
      <Ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <a className={router.pathname === item.href ? "active" : ""}>
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </Ul>
    </>
  );
}
export default Stepnav;
