import React, { useState, useEffect } from 'react';
import {
  Typography, Row, Col, Button,
  Layout, Space,
} from 'antd';
import TeachSplashScreen from './TeachSplashScreen';
import StudSplashScreen from './StudSplashScreen';

const { Header } = Layout;
const { Title } = Typography;

export default function App() {
  const [view, setView] = useState('logout');
  const [data, setData] = useState(null);

  const grabData = () => new Promise((resolve) => {
    // console.log('grabData');
    const result = {
      user: 'teacher',
      id: 123,
      fullName: 'John Doe',
      idSchool: 1,
      email: 'johndone@fake.news',
      created_at: new Date(),
    };
    resolve(result);
  });

  const handleLogInClick = () => {
    // console.log('login');
    const fetchData = async () => {
      const obj = await grabData();
      setData(obj);
      setView(obj.user);
      // setTimeout(() => console.log("view", view, "data", data), 5000);
    };
    fetchData();
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
                  onClick={handleLogInClick}
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
