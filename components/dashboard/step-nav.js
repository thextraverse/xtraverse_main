import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { Button, message, Steps, theme } from "antd";
const StepBar = styled.div`
  background: #303030;
  width: 100%;
  position: fixed;
  top: 65px;
  z-index: 9;
  left: 0px;
  padding: 10px;
  .ant-steps.ant-steps-horizontal.css-dev-only-do-not-override-1me4733.ant-steps-label-horizontal {
    width: calc(100% - 300px);
    margin: auto;
  }
  .ant-steps-item-icon {
    background: #fff !important;
    border-color: #fff !important;
  }
  .ant-steps-item-title {
    color: #fff !important;
    &::after {
      background: #8a8a8e !important;
    }
  }
  .ant-steps-item.ant-steps-item-process.ant-steps-item-active {
    .ant-steps-item-icon {
      background: #04fcbc !important;
      border-color: #04fcbc !important;
      .ant-steps-icon {
        color: #303030 !important;
        font-weight: 600 !important;
      }
    }
    .ant-steps-item-title {
      color: #04fcbc !important;
      &::after {
        background: #04fcbc !important;
      }
    }
  }
  .ant-steps-item.ant-steps-item-finish {
    .ant-steps-item-title {
      color: #04fcbc !important;
      &::after {
        background: #04fcbc !important;
      }
    }
    .ant-steps-item-icon {
      border-color: #04fcbc !important;
      background: #04fcbc !important;
    }
    .ant-steps-icon {
      color: #fff;
    }
  }
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
  //   href: [
  //     "/project/editMarketplace/marketplaceSalespage",
  //     "/project/editMarketplace/thankyouPage",
  //   ],
  //   label: " Edit Marketplace ",
  //   key: "01",
  // },

  // {
  //
  //   label: " Edit Website ",
  //   key: "02",
  // },
  // {
  //
  //   label: " Launch",
  //   key: "03",
  // },
  const steps = [
    {
      title: "Edit Marketplace",
      content: "Edit Marketplace",
      href: [
        "/project/editMarketplace/marketplaceSalespage",
        "/project/editMarketplace/thankyouPage",
      ],
    },
    {
      title: "Edit Website",
      content: "Second-content",
      href: ["/project/editWebsite"],
    },
    {
      title: "Launch",
      content: "Last-content",
      href: ["/project/launch"],
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
    const nextStep = steps[current + 1];
    const currentRoute = router.route;
    const nextRoute =
      currentRoute === nextStep.href[0] ? nextStep.href[1] : nextStep.href[0];
    router.push(nextRoute);
  };
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      router.push(steps[current - 1].href[0]);
    }
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  useEffect(() => {
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      setCurrent(parseInt(storedStep, 10));
    }
    const handleRouteChange = (url) => {
      const matchingStep = steps.findIndex((step) => step.href.includes(url));
      if (matchingStep !== -1) {
        setCurrent(matchingStep);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StepBar
      sx={{
        padding: "100px 200px",
      }}
    >
      <Steps current={current} items={items} />
      {/* <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div> */}
    </StepBar>
  );
}
export default Stepnav;
