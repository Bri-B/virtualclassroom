import React, { useState, useEffect } from 'react';
import {
  List, Typography, Skeleton, Row, Col,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import AddAnnouncement from '../teacher/AddAnnouncement';
import { STUDENT_ROUTES, TEACHER_ROUTES } from '../../constants/routes';

const { Title } = Typography;

export default function AnnouncementList({ data, user, classList }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const grabAll = () => {
    const url = `${STUDENT_ROUTES.GET_ALL_ANNOUNCE_BY_STUDID}${data.id}`;
    axios.get(url)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.error(err));
  };
  
  // Not working 500 error
  // const deleteAnn = (e) => {
  //   // id, announcement_title, description, release_time, expiration_date, id_class,
  //   const value = JSON.parse(e.name);
  //   axios.delete('/teacher/delete/announcement', value)
  //     .then(() => grabAll())
  //     .catch(err => console.error(err));
  // };

  useEffect(() => {
    grabAll();
  }, []);

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <Title className="list" style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '32px' }} level={3}>Announcement List</Title>
        </Col>
        {user === 'teacher' && <Col style={{ textAlign: 'right' }} span={12}><AddAnnouncement classList={classList} grabAll={grabAll} /></Col>}
        <Col span={24}>
          {user === 'teacher'
            ? (
              <List
                className="demo-loadmore-list"
                // loading={loading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item
                    // actions={[<a key="list-loadmore-delete" name={JSON.stringify(item)} onClick={(e) => deleteAnn(e.target)}>delete</a>]}
                  >
                    {/* <Skeleton title={false} loading={loading} active avatar> */}
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
                    {/* </Skeleton> */}
                  </List.Item>
                )}
              />
            )
            : (
              <List
                className="demo-loadmore-list"
                // loading={loading}
                itemLayout="horizontal"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item>
                    {/* <Skeleton title={false} loading={loading} active avatar> */}
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
                    {/* </Skeleton> */}
                  </List.Item>
                )}
              />
            )}
        </Col>
      </Row>
    </>
  );
}

AnnouncementList.propTypes = {
  user: PropTypes.string,
  data: PropTypes.object,
  classList: PropTypes.array,
};

AnnouncementList.defaultProps = {
  user: '',
  data: {},
  classList: [],
};
