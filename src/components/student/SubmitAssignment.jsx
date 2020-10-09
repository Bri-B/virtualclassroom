import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import _ from 'lodash';

import {
  Form,
  Input,
  Button,
  Row,
  Col
} from 'antd';

export default function SubmitAssignment() {
  const [showForm, setShowForm] = useState(false);

  const submitAssignment = (values) => {
    // post request to server to add assignment
    // console.log(assignment);
    _.each(values, (value) => DOMPurify.sanitize(value))
    console.log(values);
    alert('submitted');
    setShowForm(false);
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  return (
    <div>
      { showForm
        ? (
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            onFinish={submitAssignment}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Assignment"
              name="Assignment"
              rules={[{ required: true, message: 'Please input your link!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )
        : (<Button type="button" onClick={() => setShowForm(true)}>Submit Assignment</Button>)}
    </div>
  );
}
