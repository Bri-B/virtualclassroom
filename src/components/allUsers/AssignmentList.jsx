import React, { useState, useEffect } from 'react';
import {
  List, Typography, Skeleton, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import SubmitAssignment from '../student/SubmitAssignment';
import AddAssignment from '../teacher/AddAssignment';

const { Title } = Typography;

export default function AssignmentList({ user }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row>
        <Col span={6}>
          <Title className="list" style={{ color: 'rgba(0, 0, 0, 0.85)', textAlign: 'center' }} level={3}>Assignment List</Title>
        </Col>
        {user === 'teacher' ? <Col span={18}><AddAssignment /></Col> : <Col span={18}><SubmitAssignment /></Col>}
      </Row>
      {user === 'teacher'
        ? (
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-delete">delete</a>]}
              >
                <Skeleton title={false} loading={loading} active avatar>
                  <List.Item.Meta
                    title={<a href="#">{item.Assignment_title}</a>}
                    description={item.description}
                  />
                  <span>
                    {' '}
                    Released at:
                    {' '}
                    {moment(list.release_time).format('llll')}
                  </span>
                </Skeleton>
              </List.Item>
            )}
          />
        )
        : (
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Skeleton title={false} loading={loading} active avatar>
                  <List.Item.Meta
                    title={<a href="#">{item.Assignment_title}</a>}
                    description={item.description}
                  />
                  <span>
                    {' '}
                    Released at:
                    {' '}
                    {moment(list.release_time).format('llll')}
                  </span>
                </Skeleton>
              </List.Item>
            )}
          />
        )}
    </div>
  );
}
AssignmentList.propTypes = {
  user: PropTypes.string,
};

AssignmentList.defaultProps = {
  user: '',
};
