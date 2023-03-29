import React, { useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Space } from "antd";
import MyHeader from "./Header";
import Navbar from "./sidebar/Navbar";
import { useRouter } from "next/router";

const { Header, Sider, Content } = Layout;

const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#303030",
  position: "fixed",
  height: "100vh",
  top: "0vh",
  left: "20px",
  overflow: "hidden",
  zIndex: "9999",
};

const App = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const isStarted = router.pathname && router.pathname !== "/";

  const contentStyle = {
    paddingLeft: collapsed ? "12px" : "130px",
    backgroundColor: "#303030",
  };

  const headerStyle = {
    textAlign: "center",
    height: 64,
    paddingInline: 50,
    position: "sticky",
    top: 0,
    paddingRight: "unset",
    paddingLeft: collapsed ? "108px" : "226px",
    lineHeight: "64px",
    background: "#303030",
    backdropFilter: "blur(10px)",
    borderBottom: "2px solid #252525",
    color: "#000",
    boxShadow: "0px 0px 0px transparent",
    zIndex: 999,
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const CustomTrigger = ({ collapsed }) => {
    return collapsed ? (
      <MenuUnfoldOutlined className="trigger" onClick={handleCollapse} />
    ) : (
      <MenuFoldOutlined className="trigger" onClick={handleCollapse} />
    );
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={[0, 48]}
    >
      {isStarted ? (
        <Layout>
          <Sider
            trigger={<CustomTrigger collapsed={collapsed} />}
            collapsible
            collapsed={collapsed}
            style={siderStyle}
          >
            <Navbar activeBtn={3} />
          </Sider>
          <Layout>
            <Header style={headerStyle}>
              <MyHeader />
            </Header>
            <Content style={contentStyle}>{children}</Content>
          </Layout>
        </Layout>
      ) : (
        <Layout>
          <Content>{children}</Content>
        </Layout>
      )}
    </Space>
  );
};
export default App;
