import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SubmitAssignment from '../student/SubmitAssignment';
import AddAssignment from '../teacher/AddAssignment';
const { Header, Content, Sider } = Layout;

export default function AssignmentList({ user }) {
  const [list, setList] = useState([]);
  const data = [
    {
      id: 1,
      assignment_title: 'homework',
      description: 'workbook ch 2',
      release_time: '10/8/2020',
      due_date: '10/10/2020',
      created_at: '10/6/2020',
    },
    {
      id: 2,
      assignment_title: 'project2',
      description: 'something',
      release_time: '10/8/2020',
      due_date: '10/10/2020',
      created_at: '10/6/2020',
    },
  ];
  const grabData = () => data;

  const fetchData = async () => {
    const result = await grabData();
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
        {user === 'student' && <SubmitAssignment />}
        {user === 'teacher' && <AddAssignment />}
        {list.length > 0
        && (
        <ul>
          All assignment
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
AssignmentList.propTypes = {
  user: PropTypes.string,
};

AssignmentList.defaultProps = {
  user: '',
};
