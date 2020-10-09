import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

import {
  Form,
  Select,
  Input,
  Button,
  Modal,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function AddStudent() {
  const [showForm, setShowForm] = useState(false);
  const [classNames, setClassNames] = useState([]);

  const grabClassList = () => new Promise((resolve) => resolve(['math', 'science']));
  const fetchClassList = async () => {
    const arrOfNames = await grabClassList();
    setClassNames(arrOfNames);
  };

  useEffect(() => {
    fetchClassList();
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    alert('submitted');
    setShowForm(false);
  };
  return (
    <div>
      { showForm
        ? (
          <Modal
            title="Modal 1000px width"
            centered
            style={{ top: 20 }}
            visible={showForm}
            onOk={onFinish}
            onCancel={() => setShowForm(false)}
            width={1000}
          >
            <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
            >
              <Form.Item name="fullName" label="Fullname" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="select-multiple"
                label="Select[multiple]"
                rules={[{ required: true, message: 'Please select at least one class', type: 'array' }]}
              >
                <Select mode="multiple" placeholder="Please select classes">
                  {classNames.map((name, index) => <Option key={index} value={name}>name</Option>)}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        )
        : (<Button type="primary" onClick={() => setShowForm(true)}>Add Student</Button>)}
    </div>
  );
}
