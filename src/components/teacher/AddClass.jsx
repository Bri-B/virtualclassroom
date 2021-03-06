import React, { useState } from 'react';
import DOMPurify from 'dompurify';

import {
  Form, DatePicker, TimePicker, Button, Input,
} from 'antd';

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

export default function AddClass() {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    alert('canceled');
    setShowForm(false);
  };

  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const values = {
      ...fieldsValue,
      // class_name,
      start_time: fieldsValue.start_time.format('HH:mm:ss'),
      end_time: fieldsValue.end_time.format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
    alert('submitted');
    setShowForm(false);
  };

  return (
    <div>
      { showForm
        ? (
          <Form
            name="time_related_controls"
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="Class Name"
              name="class_name"
              rules={[{ required: true, message: 'Please input the class name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Period"
              name="period"
              rules={[{ required: true, message: 'Please input the class name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="start_time" label="Start Time" {...config}>
              <TimePicker use12Hours format="h:mm:ss A" />
            </Form.Item>
            <Form.Item name="end_time" label="End Time" {...config}>
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
        )
        : (<Button type="primary" htmlType="submit" onClick={() => setShowForm(true)}> Add Class </Button>)}
    </div>
  );
}
