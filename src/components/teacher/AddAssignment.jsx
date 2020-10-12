import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import axios from 'axios';
import {
  Form, Table, Button, Input, DatePicker,
} from 'antd';
import PropTypes from 'prop-types';
import { TEACHER_ROUTES } from '../../constants/routes';

const config = {
  rules: [{ type: 'object', required: true, message: 'Please select time!' }],
};

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

const columns = [
  {
    title: 'Pick which classes the Assignment should be released.',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
];

export default function AddAssignment({ classList, grabAll }) {
  const [showForm, setShowForm] = useState(false);
  const [clickedRow, setClickedRow] = useState([]);
  const [form] = Form.useForm();

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setClickedRow(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const dataArr = classList.map((classObj) => ({
    key: classObj.id,
    name: classObj.class_name,
  }));

  const onCancel = () => {
    form.resetFields();
    alert('canceled');
    setShowForm(false);
  };

  const postAssignment = (postData) => {
    const url = `${TEACHER_ROUTES.POST_ASSIGN}`;
    axios.post(url, postData)
      .then(() => {
        grabAll();
        setShowForm(false);
      })
      .catch((err) => console.error('add Assignment', err));
  };
  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      due_date: fieldsValue.due_date.format('YYYY-MM-DD HH:mm:ss'),
      release_time: 'Start of Class',
      id_class: clickedRow.map((row) => row.key),
    };
    postAssignment(values);
  };

  return (
    <div>
      { showForm
        ? (
          <Form
            form={form}
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
          >
            <Form.Item
              label="Assignment Title"
              name="assignment_name"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="due_date" label="Due Date" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <div>
              <Table
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={dataArr}
              />
            </div>
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
        )
        : (<Button type="Button" onClick={() => setShowForm(true)}>Add Assignment</Button>)}
    </div>

  );
}

AddAssignment.propTypes = {
  classList: PropTypes.array,
  grabAll: PropTypes.func,
};

AddAssignment.defaultProps = {
  classList: [],
};
