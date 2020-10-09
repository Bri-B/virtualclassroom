import {
  Layout, Typography,
} from 'antd';

import React from 'react';
import PropTypes from 'prop-types';
import AnnouncementList from './allUsers/AnnouncementList';
import AssignmentList from './allUsers/AssignmentList';
import ClassList from './allUsers/ClassList';

const { Content, Sider } = Layout;
const { Title } = Typography;

export default function StudSplashScreen({ name, user }) {
  return (
    <Layout>
      <Sider width={200} className="site-layout-background" style={{ backgroundColor: '#1890ff' }}>
        <Title className="classSlide" style={{ color: 'white' }} level={3}>Class List</Title>
        <ClassList />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content>
          <Title className="nameStudent" style={{ color: 'rgba(0, 0, 0, 0.85)' }} level={3}>{name}</Title>
          <AnnouncementList />
          <AssignmentList user={user} />
        </Content>
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
