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

  // post to add student and class
  // reload student list again

  const newStudent = (sID, cID) => {
    // add student called for each class
    const url = `${TEACHER_ROUTES.PUT_ADD_STUDENT_TO_CLASS}${sID}/${cID}`;
    axios.put(url)
      .then(() => {
        setShowForm(false);
      });
  };

  const grabAllSelectedClasses = (selectedClasses, sID) => {
    selectedClasses.forEach((cLass) => {
      const course = classList.filter((item) => item.class_name === cLass);
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
            >
              <Form.Item name="studentID" label="Student ID" required={true}>
                <Input />
              </Form.Item>
              <Form.Item
                name="selectMultiple"
                label="Select Multiple"
                rules={[{ required: true, message: 'Please select at least one class', type: 'array' }]}
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
                <Button type="dotted" htmlType="cancel" onCancel={() => setShowForm(false)}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )
        : (<Button type="primary" onClick={() => setShowForm(true)}>Add Student</Button>)}
    </div>
  );
}

AddStudent.propTypes = {
  data: PropTypes.object,
  list: PropTypes.object,
  updateList: PropTypes.func,
  classList: PropTypes.array,
};

AddStudent.defaultProps = {
  data: {},
  list: {},
  updateList: '',
  classList: [],
};
