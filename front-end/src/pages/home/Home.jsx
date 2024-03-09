import React, { useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Dropdown, Button } from "antd";
import "./testPage.css";
const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const categories = [
  { id: 1, catName: "Nguyên liệu chính A", chillOf: null },
  { id: 2, catName: "Nguyên liệu chính A.1", chillOf: 1 },
  { id: 3, catName: "Nguyên liệu chính A.2", chillOf: 1 },
  { id: 4, catName: "Nguyên liệu chính B", chillOf: null },
  { id: 5, catName: "Nguyên liệu chính C", chillOf: null },
  { id: 6, catName: "Nguyên liệu chính A.1.1", chillOf: 2 },
  { id: 7, catName: "Nguyên liệu chính A.1.2", chillOf: 2 },
  { id: 8, catName: "Nguyên liệu chính B.1", chillOf: 4 },
  { id: 9, catName: "Nguyên liệu chính B.2", chillOf: 4 },
  { id: 10, catName: "Nguyên liệu chính C.1", chillOf: 5 },
  { id: 11, catName: "Nguyên liệu chính C.2", chillOf: 5 },
  // Add more objects as needed
];
const categoriesTopbar = [
  { id: 1, catName: "Kho", chillOf: null },
  { id: 2, catName: "Danh mục nhập kho hàng hóa", chillOf: 1 },
  { id: 3, catName: "danh mục tạm nhập", chillOf: 1 },
  { id: 4, catName: "Vật Tư", chillOf: null },
  { id: 5, catName: "Kinh doanh", chillOf: null },
  { id: 6, catName: "Danh mục suất kho hàng hóa", chillOf: 1 },
  { id: 7, catName: "Cập nhật kiểm kê thừa thiếu", chillOf: 1 },
  { id: 8, catName: "Danh mục đơn vị tính", chillOf: 4 },
  { id: 9, catName: "Danh mục class", chillOf: 4 },
  { id: 10, catName: "Bán hàng", chillOf: 5 },
  { id: 11, catName: "Lịch sử mua hàng", chillOf: 5 },
  // Add more objects as needed
];
const buildCategoryTree = (categories, parentId = null) => {
  const filteredCategories = categories.filter(
    (category) => category.chillOf === parentId
  );

  return filteredCategories.map((category) => {
    const hasChildren = categories.some((c) => c.chillOf === category.id);
    if (hasChildren) {
      return {
        key: `sub${category.id}`,
        label: category.catName,
        // icon: <NotificationOutlined />,
        children: buildCategoryTree(categories, category.id),
      };
    } else {
      return {
        key: category.id,
        label: category.catName,
      };
    }
  });
};

const items2 = buildCategoryTree(categories);
const items3 = buildCategoryTree(categoriesTopbar);

const Home = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Thông tin
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Đổi mật khẩu
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          Đăng xuất
        </a>
      ),
    },
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    console.log(collapsed);
  };
  return (
    <Layout
      style={{
        minHeight: 100 + "vh",
        height: 100 + "%",
      }}
    >
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 150,
            color: "orange",
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          NEWSKY
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items3}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          className="ant-btn-default"
        >
          <Button>Xin chào Tùng</Button>
        </Dropdown>
      </Header>

      <Layout>
        <Sider
          width={300}
          height={900}
          collapsed={collapsed}
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              margin: 16,
              background: "orange",
            }}
          >
            {" "}
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>

          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Home;
