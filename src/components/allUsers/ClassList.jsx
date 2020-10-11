import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Menu, Modal, Form, TimePicker, Button, Input,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import { TEACHER_ROUTES } from '../../constants/routes';

const { SubMenu } = Menu;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

export default function ClassList({ data }) {
  const [list, setList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [form] = Form.useForm();
  // const
  const updateList = () => {
    const url = `${TEACHER_ROUTES.GET_ALL_CLASSES}${data.id}`;
    console.log('updateList', url);
    axios.get(url)
      .then((res) => {
        console.log('list get', res.data);
        setList(res.data);
      })
      .catch((err) => console.error('get add classes', err));
  };
  const onFinish = (fieldsValue) => {
    // Grabbing the values from the form
    const values = {
      ...fieldsValue,
      id_school: data.id_school,
      id_teacher: data.id_teacher,
      start_time: fieldsValue.start_time.format('HH:mm:ss'),
      end_time: fieldsValue.end_time.format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
    const [match] = list.filter((obj) => `${obj.id}` === values.id);
    const url = `${TEACHER_ROUTES.PUT_UPDATE_CLASS}${match.id}`;
    axios.put(url, values)
      .then(() => {
        console.log('put submitted');
        updateList();
      })
      .then(() => {
        form.resetFields();
        setShowForm(false);
      })
      .catch((err) => console.error('editing class', err));
  };
  const onCancel = () => {
    form.resetFields();
    setShowForm(false);
  };

  useEffect(() => {
    updateList();
  }, []);

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {list && (list.map((obj, key) => (
        <SubMenu key={key} title={obj.class_name}>
          <Menu.Item key="1">{`ID: ${obj.id}`}</Menu.Item>
          <Menu.Item key="2">{`Period: ${obj.period}`}</Menu.Item>
          <Menu.Item key="3">{`Start Time: ${obj.start_time}`}</Menu.Item>
          <Menu.Item key="4">{`End Time: ${obj.end_time}`}</Menu.Item>
          <Menu.Item key="5" onClick={() => { setShowForm(true); }}>{data.user === 'teacher' ? 'Edit' : 'Teacher'}</Menu.Item>
          <Menu.Item key="6" onClick={() => { console.log(obj.class_name, 'delete'); }}>{data.user === 'teacher' ? 'Delete' : 'Period'}</Menu.Item>
        </SubMenu>
      )))}
      <Modal
        title="Edit Class"
        centered
        width={750}
        style={{ top: 20 }}
        visible={showForm}
        onOk={onFinish}
        onCancel={() => setShowForm(false)}
        okButtonProps={{ disabled: true, style: { display: 'none' } }}
        cancelButtonProps={{ disabled: true, style: { display: 'none' } }}
      >
        <p>Not sure? Check the drop down on the right.</p>
        <Form
          name="validate_other"
          {...formItemLayout}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="New or Current Class ID"
            name="id"
            rules={[{ required: true, message: 'Please input the class id!' }]}
          >
            <Input
              placeholder="Whole Number Example: 1 or 12"
            />
          </Form.Item>
          <Form.Item
            label="New or Current Class Name"
            name="class_name"
            rules={[{ required: true, message: 'Please input the class id!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="New or Current New Period"
            name="period"
            rules={[{ required: true, message: 'Please input the class name!' }]}
          >
            <Input
              placeholder="Whole Number Example: 1 or 12"
            />
          </Form.Item>
          <Form.Item name="start_time" label="New or Current Start Time" {...config}>
            <TimePicker use12Hours format="h:mm:ss A" />
          </Form.Item>
          <Form.Item name="end_time" label="New or Current End Time" {...config}>
            <TimePicker use12Hours format="h:mm:ss A" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
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
ClassList.propTypes = {
  data: PropTypes.object,
  user: PropTypes.string,
};

ClassList.defaultProps = {
  data: {},
  user: '',
};
