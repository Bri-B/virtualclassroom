import React, { useState } from 'react';
import axios from 'axios';
import { STUDENT_ROUTES } from '../../constants/routes';

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
    //get all the assignments for that class
    // select the assignment to grab the assignment id

    // post request to server to add assignment
    // console.log(assignment);
    // const url = PUT_SUBMIT_ASSIGN 
    // //id_assignment, id_student, drive_url,
    // axios.put(url)
    // .then(() => {

    // })
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
