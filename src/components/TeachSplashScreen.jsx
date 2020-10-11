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
        console.log("studentList", studentList)
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
      <Sider
        width={250}
        className="site-layout-background"
        style={{
          backgroundColor: '#1890ff',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Row>
          <Col>
            <Title className="classSlide" style={{ color: 'white' }} level={3}>Class List</Title>
          </Col>
          <Col>
            <AddClass data={data} updateList={updateClassList} />
          </Col>
        </Row>
        <ClassList data={data} updateList={updateClassList} list={classList} />
      </Sider>
      <Layout>
        <Sider
          width={250}
          className="site-layout-background"
          style={{
            backgroundColor: '#1890ff',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            right: 0,
          }}
        >
          <Row>
            <Col>
              <Title className="studentSide" style={{ color: 'white' }} level={3}>Student List</Title>
            </Col>
            <Col>
              <AddStudent data={data} user={user} updateList={updateStudentList} classList={classList} />
            </Col>
          </Row>
          <StudentList data={data} list={studentList} updateList={updateStudentList} classList={classList} />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: 'auto', overflow: 'initial' }}>
            <Title className="nameTeacher" style={{ color: 'rgba(0, 0, 0, 0.85)' }} level={1}>{data.full_name}</Title>
            <Divider />
            <AnnouncementList data={data} user={user} />
            <AssignmentList data={data} user={user} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Virtual Classroom ~ 2020 Created by VS Rock</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

TeachSplashScreen.propTypes = {
  data: PropTypes.object,
  user: PropTypes.string,
};

TeachSplashScreen.defaultProps = {
  data: {},
  user: '',
};
