import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;

export default function ClassList({ user }) {
  const [list, setList] = useState([]);
  const data = [
    {
      id: 1,
      class_name: 'math',
      period: 1,
      start_time: '10:00 am',
      end_time: '11:00 am',
      id_school: 1,
      id_teacher: 1,
      created_at: '10/7/2020',
    },
    {
      id: 2,
      class_name: 'english',
      period: 2,
      start_time: '10:00 am',
      end_time: '11:00 am',
      id_school: 1,
      id_teacher: 1,
      created_at: '10/7/2020',
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
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {list.map((obj, key) => (
        <SubMenu key={key} title={obj.class_name}>
          <Menu.Item key="1" onClick={() => { console.log(obj.class_name, 'edit'); }}>{user === 'teacher' ? 'Edit' : 'Teacher'}</Menu.Item>
          <Menu.Item key="2" onClick={() => { console.log(obj.class_name, 'delete'); }}>{user === 'teacher' ? 'Delete' : 'Period'}</Menu.Item>
        </SubMenu>
      ))}
    </Menu>
  );
}
ClassList.propTypes = {
  user: PropTypes.string,
};

ClassList.defaultProps = {
  user: '',
};
