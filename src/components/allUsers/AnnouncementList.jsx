import React, { useState, useEffect } from 'react';
import {
  List, Typography, Skeleton, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddAnnouncement from '../teacher/AddAnnouncement';

const { Title } = Typography;

export default function AnnouncementList({ user }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <Title className="list" style={{ color: 'rgba(0, 0, 0, 0.85)', textAlign: 'center' }} level={3}>Announcement List</Title>
        </Col>
        {user === 'teacher' && <Col><AddAnnouncement /></Col>}
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
                    title={<a href="#">{item.announcement_title}</a>}
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
                    title={<a href="#">{item.announcement_title}</a>}
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

AnnouncementList.propTypes = {
  user: PropTypes.string,
};

AnnouncementList.defaultProps = {
  user: '',
};
