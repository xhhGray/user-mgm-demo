import { Form, Input, message, Modal, Select } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../../../utils/contextManager";
import { createUser, updateUser } from "../../../../services/userMgm/userApi";

export default function CreateModal() {
  const { state, dispatch } = useContext(UserContext);
  const { modalVisible, modalType, currentUser, userParams, options } = state;
  const [form] = Form.useForm();
  const onModify = () => {
    form.validateFields().then((values) => {
      let modifyRun;
      if (modalType === "add") {
        modifyRun = createUser(values);
      } else {
        modifyRun = updateUser({ ...values, id: currentUser.id });
      }
      modifyRun.then((res) => {
        if (res) {
          dispatch({
            type: "update",
            payload: {
              modalVisible: false,
              userParams: {
                ...userParams,
              },
            },
          });
          message.success(
            res.message
              ? res.message
              : modalType === "add"
              ? "新增成功！"
              : "修改成功！"
          );
        } else {
          message.error(res.message);
        }
      });
    });
  };
  return (
    <Modal
      visible={modalVisible}
      title={`${modalType === "add" ? "新增" : "修改"}用户`}
      onCancel={() =>
        dispatch({ type: "update", payload: { modalVisible: false } })
      }
      onOk={onModify}
      afterClose={() => form.resetFields()}
    >
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        colon={false}
        form={form}
        initialValues={
          currentUser
            ? { ...currentUser, role: String(currentUser.role) }
            : undefined
        }
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: "请输入姓名！" }]}
        >
          <Input placeholder="请输入姓名" allowClear />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            {
              required: true,
              message: "请输入手机号！",
            },
            {
              pattern: /^1[3-9]\d{9}$/,
              message: "请输入正确的手机号码！",
            },
          ]}
        >
          <Input placeholder="请输入手机号" allowClear />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱！",
            },
            {
              pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              message: "请输入正确的邮箱格式！",
            },
          ]}
        >
          <Input placeholder="请输入邮箱" allowClear />
        </Form.Item>
        <Form.Item
          label="角色"
          name="role"
          rules={[
            {
              required: true,
              message: "请选择角色！",
            },
          ]}
        >
          <Select placeholder="请选择角色" allowClear options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
