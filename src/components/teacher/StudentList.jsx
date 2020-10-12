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
  const [classId, setClassId] = useState(null);
  const [form] = Form.useForm();

  const clickDelete = (e) => {
    setSelected(e);
    setConfirmDelete(true);
  };
  const onCancel = () => {
    // form.resetFields();
    setShowForm(false);
  };

  const deleteClass = (e) => {
    const studentId = e.slice(0, e.indexOf('.'));
    const url = `${TEACHER_ROUTES.DELETE_STUDENT_FROM_CLASS}${studentId}/${classId}`;
    axios.delete(url)
      .then(() => {
        updateList();
        setConfirmDelete(false);
      })
      .catch((err) => console.error('deleting class', err));
  };

  useEffect(() => {
    const names = classList.map((cLass) => cLass.class_name);
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
          <Menu.Item key={`${obj.id}.2`} onClick={({ key }) => clickDelete(key)}>Delete</Menu.Item>
        </SubMenu>
      ))}
      <Modal
        title="Confirm Delete"
        visible={confirmDelete}
        onOk={() => deleteClass(selected)}
        onCancel={() => setConfirmDelete(false)}
        okText="Delete"
      >
        <p>What is the ID of the class you want to remove this student from?</p>
        <Input onChange={(e) => setClassId(e.target.value)} />
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
