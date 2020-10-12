import {
  Layout, Typography,
} from 'antd';

import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AnnouncementList from './allUsers/AnnouncementList';
import AssignmentList from './allUsers/AssignmentList';
import ClassList from './allUsers/ClassList';
import { TEACHER_ROUTES, STUDENT_ROUTES } from '../constants/routes';

const { Content, Sider } = Layout;
const { Title } = Typography;

export default function StudSplashScreen({ data, user }) {
  const [classList, setClassList] = useState([]);

  const updateClassList = () => {
    const url = `${STUDENT_ROUTES.GET_ALL_CLASSES_BY_STUD}${data.id}`;
    axios.get(url)
      .then((res) => {
        setClassList(res.data);
      })
      .catch((err) => console.error('updateClassList', err));
  };

  useEffect(() => {
    updateClassList();
  }, []);

  return (
    <Layout>
      <Sider width={200} className="site-layout-background" style={{ backgroundColor: '#1890ff' }}>
        <Title className="classSlide" style={{ color: 'white' }} level={3}>Class List</Title>
        <ClassList list={classList} updateList={updateClassList} />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content>
          <Title className="nameStudent" style={{ color: 'rgba(0, 0, 0, 0.85)' }} level={3}>{data.full_name}</Title>
          <AnnouncementList data={data} user={user} />
          <AssignmentList data={data} user={user} />
        </Content>
      </Layout>
    </Layout>
  );
}

StudSplashScreen.propTypes = {
  data: PropTypes.object,
  user: PropTypes.string,
};

StudSplashScreen.defaultProps = {
  data: {},
  user: '',
};
