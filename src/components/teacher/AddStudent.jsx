import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import axios from 'axios';

import {
  Form,
  Select,
  Input,
  Button,
  Modal,
} from 'antd';
import { TEACHER_ROUTES } from '../../constants/routes';

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function AddStudent({
  list, updateList, data, classList,
}) {
  const [showForm, setShowForm] = useState(false);
  const [classNames, setClassNames] = useState([]);
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();
    alert('canceled');
    setShowForm(false);
  };

  const newStudent = (sID, cID) => {
    // add student called for each class
    const url = `${TEACHER_ROUTES.PUT_ADD_STUDENT_TO_CLASS}${sID}/${cID}`;
    axios.put(url)
      .then(() => {
        setShowForm(false);
        alert(`Class Id: ${cID} added`);
      });
  };

  const grabAllSelectedClasses = (selectedClasses, sID) => {
    selectedClasses.forEach((classObj) => {
      const course = classList.filter((item) => item.class_name === classObj);
      const courseID = course[0].id;
      newStudent(sID, courseID);
    });
  };

  useEffect(() => {
    const names = classList.map((cLass) => cLass.class_name);
    setClassNames(names);
  }, [classList]);

  const onFinish = (values) => {
    grabAllSelectedClasses(values.selectMultiple, values.studentID);
  };
  return (
    <div>
      { showForm
        ? (
          <Modal
            title="Add Student"
            centered
            style={{ top: 20 }}
            visible={showForm}
            okButtonProps={{ disabled: true, style: { display: 'none' } }}
            cancelButtonProps={{ disabled: true, style: { display: 'none' } }}
            width={1000}
          >
            <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
              form={form}
            >
              <Form.Item name="studentID" label="Student ID">
                <Input />
              </Form.Item>
              <Form.Item
                name="selectMultiple"
                label="Select Multiple"
                rules={[{ message: 'Please select at least one class', type: 'array' }]}
              >
                <Select mode="multiple" placeholder="Please select classes">
                  {classNames.map((name, index) => <Option key={index} value={name}>{name}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  s: { span: 16, offset: 8 },
                  xs: { span: 24, offset: 0 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  s: { span: 16, offset: 8 },
                  xs: { span: 24, offset: 0 },
                }}
              >
                <Button type="dotted" htmlType="cancel" onCancel={onCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )
        : (<Button type="primary" onClick={() => setShowForm(true)}>Enroll Student in Class</Button>)}
    </div>
  );
}

AddStudent.propTypes = {
  data: PropTypes.object,
  list: PropTypes.array,
  updateList: PropTypes.func,
  classList: PropTypes.array,
};

AddStudent.defaultProps = {
  data: {},
  list: [],
  updateList: '',
  classList: [],
};
