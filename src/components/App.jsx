import React, { useState, useEffect } from 'react';
import {
  Typography, Row, Col, Button,
  Layout, Space,
} from 'antd';
import axios from 'axios';
import TeachSplashScreen from './TeachSplashScreen';
import StudSplashScreen from './StudSplashScreen';
import { AUTH_ROUTES } from '../constants/routes';

const { Header } = Layout;
const { Title } = Typography;

export default function App() {
  const [view, setView] = useState('logout');
  const [data, setData] = useState(null);

  // const grabData = () => new Promise((resolve) => {
  //   // console.log('grabData');
  //   const result = {
  //     user: 'teacher',
  //     id: 123,
  //     fullName: 'John Doe',
  //     idSchool: 1,
  //     email: 'johndone@fake.news',
  //     created_at: new Date(),
  //   };
  //   resolve(result);
  // });

  const handleLogInClick = () => {
    console.log('login');
    console.log(AUTH_ROUTES.GOOGLE);
    // fetch(AUTH_ROUTES.GOOGLE)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));
  };

  useEffect(() => {});
  return (
    <div>
      <Layout>
        <Header className="header">
          <Row>
            <Col span={20}>
              <Space align="center">
                <Title className="logo" style={{ color: 'white', textAlign: 'left' }} level={3}>Virtual Classroom</Title>
              </Space>
            </Col>
            <Col span={4}>
              {view === 'logout' ? (
                <Button
                  className="login"
                  type="primary"
                  size="large"
                  href="/auth/google"
                >
                  login
                </Button>
              )
                : (
                  <Button
                    className="logout"
                    type="primary"
                    size="large"
                    onClick={() => setView('logout')}
                  >
                    logout
                  </Button>
                )}
            </Col>
          </Row>
        </Header>
        {view === 'teacher' && <TeachSplashScreen name={data.fullName} user={data.user} />}
        {view === 'student' && <StudSplashScreen name={data.fullName} user={data.user} />}
      </Layout>
    </div>
  );
}
