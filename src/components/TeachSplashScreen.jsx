import {
  Layout, Typography, Row, Col, Divider,
} from 'antd';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AnnouncementList from './allUsers/AnnouncementList';
import AssignmentList from './allUsers/AssignmentList';
import ClassList from './allUsers/ClassList';
import StudentList from './teacher/StudentList';
import AddClass from './teacher/AddClass';
import AddStudent from './teacher/AddStudent';
import { TEACHER_ROUTES, STUDENT_ROUTES } from '../constants/routes';

const { Content, Sider, Footer } = Layout;
const { Title } = Typography;

export default function TeachSplashScreen({ data, user }) {
  const [classList, setClassList] = useState([]);
  const [studentList, setStudentList] = useState([]);

  const updateStudentList = () => {
    const url = `${STUDENT_ROUTES.GET_ALL_STUDENTS}`;
    axios.get(url)
      .then((res) => {
        setStudentList(res.data);
      })
      .catch((err) => console.error('get add classes', err));
  };

  const updateClassList = () => {
    const url = `${TEACHER_ROUTES.GET_ALL_CLASSES}${data.id}`;
    axios.get(url)
      .then((res) => {
        setClassList(res.data);
      })
      .catch((err) => console.error('get add classes', err));
  };

  useEffect(() => {
    updateClassList();
    updateStudentList();
  }, []);

  return (
    <Layout>
      <Layout>
        <Sider
          className="site-layout-background"
          style={{
            backgroundColor: '#1890ff',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Row>
            <Col span={24}>
              <Title className="classSlide" style={{ color: 'white', paddingLeft: '16px', paddingTop: '16px' }} level={3}>Class List</Title>
            </Col>
            <Col span={24}>
              <AddClass data={data} updateList={updateClassList} />
            </Col>
          </Row>
          <ClassList data={data} updateList={updateClassList} list={classList} />
        </Sider>
        <Content style={{ padding: '32px' }}>
          <Row>
            <Title className="nameTeacher" style={{ color: 'rgba(0, 0, 0, 0.85)' }} level={1}>{data.full_name}</Title>
            <Divider />
            <AnnouncementList data={data} user={user} classList={classList} />
          </Row>
          <Divider />
          <Row>
            <AssignmentList data={data} user={user} />
          </Row>
        </Content>
        <Sider
          className="site-layout-background"
          style={{
            backgroundColor: '#1890ff',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Row>
            <Col span={24}>
              <Title className="studentSide" style={{ color: 'white', paddingLeft: '16px', paddingTop: '16px' }} level={3}>Student List</Title>
            </Col>
            <Col span={24}>
              <AddStudent data={data} user={user} list={studentList} updateList={updateStudentList} classList={classList} />
            </Col>
          </Row>
          <StudentList data={data} list={studentList} updateList={updateStudentList} classList={classList} />
        </Sider>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>Virtual Classroom ~ 2020 Created by VS Rock</Footer>
    </Layout>
  );
}

TeachSplashScreen.propTypes = {
  data: PropTypes.object || PropTypes.array,
  user: PropTypes.string,
};

TeachSplashScreen.defaultProps = {
  data: {},
  user: '',
};
