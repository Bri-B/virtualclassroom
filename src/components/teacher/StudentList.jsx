import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Menu } from 'antd';

const { SubMenu } = Menu;

export default function StudentList() {
  const [list, setList] = useState([]);
  const data = [
    {
      fullName: 'Jane Doe',
    },
    {
      fullName: 'Doe Jane',
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
        <Menu.Item key={key}>
          {obj.fullName}
          {/* <Menu.Item key="1" onClick={() => { console.log(obj.class_name, 'edit'); }}>{user === 'teacher' ? 'Edit' : 'Teacher'}</Menu.Item> */}
          {/* <Menu.Item key="2" onClick={() => { console.log(obj.class_name, 'delete'); }}>{user === 'teacher' ? 'Delete' : 'Period'}</Menu.Item> */}
        </Menu.Item>
      ))}
    </Menu>
  );
}
