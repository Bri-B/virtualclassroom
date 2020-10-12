import React, { useState, useEffect } from 'react';
import {
  Menu, Modal, Button, Form, Input, Select, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import { TEACHER_ROUTES } from '../../constants/routes';

const { SubMenu } = Menu;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function StudentList({
  list, updateList, data, classList,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [match, setMatch] = useState({});
  const [classNames, setClassNames] = useState([]);
  const [form] = Form.useForm();

  const clickDelete = (e) => {
    setSelected(e);
    setConfirmDelete(true);
  };
  const onCancel = () => {
    // form.resetFields();
    setShowForm(false);
  };
  const editStudent = () => {
    const url = `${TEACHER_ROUTES.PUT_UPDATE_CLASS}${match.id}`;
    console.log('edit', url);
    // axios.put(url, values)
    //   .then(() => {
    //     console.log('put submitted');
    //     updateList();
    //   })
    //   .then(() => {
    //     form.resetFields();
    //     setShowForm(false);
    //   })
    //   .catch((err) => console.error('editing class', err));
  };
  const onFinish = (values) => {
    // Grabbing the values from the form
    // const values = {
    //   ...fieldsValue,
    //   id_school: data.id_school,
    //   id_teacher: data.id,
    // };
    console.log('Received values of form: ', values);
    // const [filtered] = list.filter((obj) => `${obj.id}` === values.id);
    // setMatch(filtered);
    // editStudent();
    setShowForm(false);
  };

  const deleteClass = (e) => {
    const id = e.slice(0, e.indexOf('.'));
    console.log('delete', id);
    setConfirmDelete(false);
    // const url = `${TEACHER_ROUTES.DELETE_CLASS}${id}`;
    // axios.delete(url)
    //   .then(() => {
    //     console.log('Delete');
    //     updateList();
    //     setConfirmDelete(false);
    //   })
    //   .catch((err) => console.error('editing class', err));
  };

  useEffect(() => {
    console.log("classlist", classList);
    const names = classList.map((cLass) => cLass.class_name);
    console.log(names);
    setClassNames(names);
  }, [classList]);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {list.length > 0 && list.map((obj, key) => (
        <SubMenu key={key} title={obj.full_name}>
          <Menu.Item key="1" onClick={() => setShowForm(true)}>Edit</Menu.Item>
          <Menu.Item key={`${obj.fullName}.2`} onClick={({ key }) => clickDelete(key)}>Delete</Menu.Item>
        </SubMenu>
      ))}
      <Modal
        title="Confirm Delete"
        visible={confirmDelete}
        onOk={() => deleteClass(selected)}
        onCancel={() => setConfirmDelete(false)}
        okText="Delete"
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
      <Modal
        title="Edit Student"
        centered
        width={750}
        style={{ top: 20 }}
        visible={showForm}
        okButtonProps={{ disabled: true, style: { display: 'none' } }}
        cancelButtonProps={{ disabled: true, style: { display: 'none' } }}
      >
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item name="fullName" label="New or Current Fullname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="New or Current Email" rules={[{ type: 'email', required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="select-multiple"
            label="New or Current Classes: Select[multiple]"
            rules={[{ message: 'Please select at least one class', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="Please select classes">
              {classNames.map((name, index) => <Option key={index} value={name}>name</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
            }}
          >
            <Button type="dotted" htmlType="cancel" onClick={onCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Menu>
  );
}

StudentList.propTypes = {
  data: PropTypes.object,
  list: PropTypes.array,
  updateList: PropTypes.func,
  classList: PropTypes.array,
};

StudentList.defaultProps = {
  data: {},
  list: [],
  updateList: '',
  classList: [],
};
