import React, { useState } from 'react';
import DOMPurify from 'dompurify';

import {
  Form, DatePicker, TimePicker, Button, Input,
} from 'antd';

const { RangePicker } = DatePicker;

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
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

export default function AddAnnouncement() {
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    alert('canceled');
    setShowForm(false);
  };

  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
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
            form={form}
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
          >
            <Form.Item
              label="Announcement Title"
              name="announcement_title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
        : (<Button type="Button" onClick={() => setShowForm(true)}>Add Announcement</Button>)}
    </div>

  );
}
