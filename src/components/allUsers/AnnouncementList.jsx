import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import PropTypes from 'prop-types';
import AddAnnouncement from '../teacher/AddAnnouncement';
const { Header, Content, Sider } = Layout;

export default function AnnouncementList({ user }) {
  const [list, setList] = useState([]);
  const data = [
    {
      id: 1,
      announcement_title: 'test',
      description: 'math final assessment',
      release_time: '10/8/2020',
      expiration_date: '10/10/2020',
      created_at: '10/6/2020',
    },
    {
      id: 2,
      announcement_title: 'test2',
      description: 'math final assessment2',
      release_time: '10/8/2020',
      expiration_date: '10/10/2020',
      created_at: '10/6/2020',
    },
  ];
  const grabData = () => data;

  const fetchData = async () => {
    const result = await grabData();
    // console.log(result);
    setList(result);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        margin: 0,
        minHeight: 280,
      }}
    >
      <div>
        {user === 'teacher' && <AddAnnouncement />}
        {list.length > 0
        && (
        <ul>
          All Announcement
          {list.map((obj, key1) => (
            <li key={key1}>
              {_.map(obj, (item, key2) => <p key={key2}>{item}</p>)}
            </li>
          ))}
        </ul>
        )}
      </div>

    </Content>
  );
}
AnnouncementList.propTypes = {
  user: PropTypes.string,
};

AnnouncementList.defaultProps = {
  user: '',
};
