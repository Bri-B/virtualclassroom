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
        <Title className="classSlide" style={{ color: 'white', 'background-color': 'f0f2f5' }} level={3}>Class List</Title>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <ClassList />
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}
//   return (
//     <div>
//       <h1>
//         Hello
//         {' '}
//         {name}
//       </h1>
//       <AnnouncementList />
//       <AssignmentList user={user} />
//       <ClassList />
//     </div>
//   );
// }
// StudSplashScreen.propTypes = {
//   name: PropTypes.string,
//   user: PropTypes.string,
// };

// StudSplashScreen.defaultProps = {
//   name: '',
//   user: '',
// };
