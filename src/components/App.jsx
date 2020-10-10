import React, { useState, useEffect } from 'react';
import {
  Typography, Row, Col, Button,
  Layout, Space,
} from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import TeachSplashScreen from './TeachSplashScreen';
import StudSplashScreen from './StudSplashScreen';
import { AUTH_ROUTES } from '../constants/routes';

const { Header } = Layout;
const { Title } = Typography;

export default function App() {
  const [view, setView] = useState('logout');
  const [data, setData] = useState(null);

  const handleLogInClick = () => {
    console.log('login');
    console.log(AUTH_ROUTES.GOOGLE);
    // setData(grabData);
    // setView('teacher');
    // fetch(AUTH_ROUTES.GOOGLE)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.error(error));
  };

  useEffect(() => {});
  return (
    <Router>
      <Layout>
        <Header className="header">
          <Row>
            <Col span={20}>
              <Space align="center">
                <Title className="logo" style={{ color: 'white', textAlign: 'left' }} level={3}>Virtual Classroom</Title>
              </Space>
            </Col>
            <Col span={4}>
              { view === 'logout'
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
                    Login
                  </Button>
                )}
            </Col>
          </Row>
        </Header>
        <Switch>
          <Route path="/tuser/">
            <TeachSplashScreen />
          </Route>
          <Route path="/suser/">
            <StudSplashScreen />
          </Route>
          <Route path="/" />
        </Switch>
      </Layout>
    </Router>
  );
}
