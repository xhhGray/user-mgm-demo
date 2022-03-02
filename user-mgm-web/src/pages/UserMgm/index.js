import React, { useReducer } from "react";
import { Layout, Button, Table, Row, Col, Select, message, Modal } from "antd";
import reducerManager from "../../utils/reducerManage";
import { UserContext } from "../../utils/contextManager";
import CreateModal from "./component/CreateModal";
import { useFindUser } from "./hooks";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteUser } from "../../services/userMgm/userApi";

const { Header, Content } = Layout;
export default function UserMgm() {
  const initState = {
    userParams: {
      limit: 10,
      offset: 0,
    },
    loading: true,
    current: 1,
    pageSize: 10,
    options: [
      {
        label: "普通用户",
        value: "1",
      },
      {
        label: "VIP用户",
        value: "2",
      },
      {
        label: "管理员",
        value: "0",
      },
    ],
  };
  const [state, dispatch] = useReducer(reducerManager, initState);
  const {
    userParams,
    modalVisible,
    userList,
    loading,
    current,
    pageSize,
    options,
  } = state;

  const Role = {
    1: "普通用户",
    2: "VIP用户",
    0: "管理员",
  };

  // 查找用户list
  useFindUser(userParams, dispatch);

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      render: (_) => Role[_],
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      render: (_) => moment(_).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() =>
              dispatch({
                type: "update",
                payload: {
                  modalVisible: true,
                  modalType: "modify",
                  currentUser: record,
                },
              })
            }
          >
            编辑
          </Button>
          <Button type="link" onClick={() => toDelete(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  const onSelect = (val) => {
    dispatch({
      type: "update",
      payload: {
        userParams: {
          limit: 10,
          offset: 0,
          role: val,
        },
        current: 1,
        pageSize: 10,
      },
    });
  };

  const toDelete = (id) => {
    Modal.confirm({
      title: "您确定要删除该用户吗？",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        deleteUser({ id }).then((res) => {
          if (res) {
            dispatch({
              type: "update",
              payload: {
                userParams: {
                  ...userParams,
                },
              },
            });
            message.success(res.message ? res.message : "删除成功！");
          } else {
            message.error(res.message);
          }
        });
      },
    });
  };

  const onPageChange = (page, pageSize) => {
    dispatch({
      type: "update",
      payload: {
        userParams: {
          ...userParams,
          limit: pageSize,
          offset: pageSize * (page - 1),
        },
        current: page,
        pageSize,
      },
    });
  };

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Header style={{ background: "#fff", lineHeight: "64px" }}>
        用户管理
      </Header>
      <div style={{ padding: "10px 16px" }}>
        <Row>
          <Col span={18}>
            <Button
              type="primary"
              onClick={() =>
                dispatch({
                  type: "update",
                  payload: {
                    modalVisible: true,
                    modalType: "add",
                    currentUser: undefined,
                  },
                })
              }
            >
              新增用户
            </Button>
          </Col>
          <Col span={6}>
            <Select
              placeholder="请选择用户角色查询"
              options={options}
              onSelect={onSelect}
              style={{ width: "100%" }}
              allowClear
              onClear={onSelect}
            />
          </Col>
        </Row>
      </div>
      <Content style={{ margin: "0 16px 0", background: "#fff" }}>
        <Table
          size="small"
          columns={columns}
          dataSource={userList?.rows}
          rowKey={(record) => record.id}
          loading={loading}
          pagination={{
            total: userList?.count,
            showSizeChanger: true,
            showQuickJumper: true,
            current,
            pageSize,
            pageSizeOptions: ["5", "10", "20", "50", "100"],
            showTotal: (total) => `共${total}条`,
            onChange: onPageChange,
          }}
        />
      </Content>
      {modalVisible ? <CreateModal /> : null}
    </UserContext.Provider>
  );
}
