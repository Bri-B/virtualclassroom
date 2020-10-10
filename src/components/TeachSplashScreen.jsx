import {
  Layout, Typography, Row, Col, Divider,
} from 'antd';

import React from 'react';
import PropTypes from 'prop-types';
import AnnouncementList from './allUsers/AnnouncementList';
import AssignmentList from './allUsers/AssignmentList';
import ClassList from './allUsers/ClassList';
import StudentList from './teacher/StudentList';
import AddClass from './teacher/AddClass';
import AddStudent from './teacher/AddStudent';

const { Content, Sider, Footer } = Layout;
const { Title } = Typography;

export default function TeachSplashScreen({ data, user }) {
  return (
    <Layout>
      <Sider
        width={200}
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
            <AddClass />
          </Col>
        </Row>
        <ClassList user={user} />
      </Sider>
      <Layout>
        <Sider
          width={200}
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
              <AddStudent />
            </Col>
          </Row>
          <StudentList />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: 'auto', overflow: 'initial' }}>
            <Title className="nameTeacher" style={{ color: 'rgba(0, 0, 0, 0.85)' }} level={1}>{data.full_name}</Title>
            <Divider />
            <AnnouncementList user={user} />
            <AssignmentList user={user} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Virtual Classroom ~ 2020 Created by VS Rock</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

TeachSplashScreen.propTypes = {
  name: PropTypes.object,
  user: PropTypes.string,
};

TeachSplashScreen.defaultProps = {
  name: {},
  user: '',
};
