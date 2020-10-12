import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography, Row, Col, Button,
  Layout, Space,
} from 'antd';
import TeachSplashScreen from './TeachSplashScreen';
import StudSplashScreen from './StudSplashScreen';

const { Header } = Layout;
const { Title } = Typography;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/login')
      .then((res) => {
        const { data } = res;
        if (data) {
          const { user } = data;
          setLoggedIn(true);
          setData(data);
          setView(user);
        }
      })
      .catch((err) => console.error('onPageLoad', err));
  }, []);

  return (
    <Layout>
      <Header className="header">
        <Row>
          <Col span={20}>
            <Space align="center">
              <Title className="logo" style={{ color: 'white', textAlign: 'left' }} level={3}>Virtual Classroom</Title>
            </Space>
          </Col>
          <Col style={{ textAlign: 'right' }} span={4}>
            { !loggedIn
              ? (
                <Button
                  className="login"
                  type="primary"
                  size="large"
                  href="/auth/google"
                >
                  Login
                </Button>
              )
              : (
                <Button
                  className="logout"
                  type="primary"
                  size="large"
                  href="/logout"
                >
                  Logout
                </Button>
              )}
          </Col>
        </Row>
      </Header>
      {
        view === 'teacher' && <TeachSplashScreen user={view} data={data} />
      }
      {
        view === 'student' && <StudSplashScreen user={view} data={data} />
      }
    </Layout>
  );
}
