import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import React from 'react';
import PropTypes from 'prop-types';
import AnnouncementList from './allUsers/AnnouncementList';
import AssignmentList from './allUsers/AssignmentList';
import ClassList from './allUsers/ClassList';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const {Title}= Typography;

export default function StudSplashScreen({ name, user }) {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Title className="classSlide" style={{ color: 'white', backgroundColor: 'F0F2F5' }} level={3}>Class List</Title>
        <ClassList />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <AnnouncementList />
        <AssignmentList user={user} />
      </Layout>
    </Layout>
  );
}

StudSplashScreen.propTypes = {
  name: PropTypes.string,
  user: PropTypes.string,
};

StudSplashScreen.defaultProps = {
  name: '',
  user: '',
};
