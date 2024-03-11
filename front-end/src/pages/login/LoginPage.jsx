import { Button, Checkbox, Form, Input } from "antd";
import "./loginPage.css";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const onFinish = async (values) => {
  const { username, password } = values;
  try {
    const response = await axios
      .post("http://localhost:8080/auth/generateToken", {
        username,
        password,
      })
      .then((response) => {
        const token = response.data;
        // Store token in cookies
        Cookies.set("token", token);
        console.log(token);
      })
      .catch((err) => {
        console.log(err);
      });

    // Redirect or update UI
    // For example, redirect to dashboard page
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed:", error);
    // Handle login error, e.g., display an error message to the user
  }
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const LoginPage = () => (
  <div className="center">
    <Form
      className="flex-item"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
);
export default LoginPage;
