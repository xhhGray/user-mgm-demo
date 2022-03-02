import React from "react";
import { ConfigProvider, Layout, Menu, Typography } from "antd";
import UserMgm from "./pages/UserMgm";
import zhCN from "../node_modules/antd/es/locale/zh_CN";

const { Sider } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{ width: "200px" }}>
        <Title
          level={4}
          style={{
            height: "50px",
            lineHeight: "60px",
            padding: "0 20px",
            color: "#fff",
          }}
        >
          user-mgm-demo
        </Title>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">用户管理</Menu.Item>
        </Menu>
      </Sider>
      <ConfigProvider locale={zhCN}>
        <Layout>
          <UserMgm />
        </Layout>
      </ConfigProvider>
    </Layout>
  );
}

export default App;
