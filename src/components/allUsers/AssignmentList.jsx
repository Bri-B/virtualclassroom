import React, { useState, useEffect } from 'react';
import {
  List, Typography, Skeleton, Row, Col, Button,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import SubmitAssignment from '../student/SubmitAssignment';
import AddAssignment from '../teacher/AddAssignment';
import { STUDENT_ROUTES } from '../../constants/routes';

const { Title } = Typography;

export default function AssignmentList({ data, user }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [datasource, setDatasource] = useState([
    {
      disabled: false,
    },
  ]);

  const onClick = (id) => {
    const source = datasource.find(source => source.id === id);
    source.disabled = true;
    setDatasource(datasource);
   }

  // grab all assignments
  const getAll = () => {
    const url = `${STUDENT_ROUTES.GET_ALL_ASSIGN_BY_STUDID}${data.id}`;
    axios.get(url)
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => console.error('grab assignments', err));
  };
  // add click function for clicking name to submit per assignment
  const submitAssign = () => {
    // //id_assignment, id_student, drive_url,
    const url = STUDENT_ROUTES.PUT_SUBMIT_ASSIGN;
    axios.put(url, {
      id_assignment: 1,
      id_student: 1,
      drive_url: 'test',
    })
      .catch((err) => console.error('submit assignments', err));
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <Title className="list" style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '32px' }} level={3}>Assignment List</Title>
        </Col>
        {user === 'teacher' ? <Col style={{ textAlign: 'right' }} span={12}><AddAssignment /></Col> : <Col><SubmitAssignment /></Col>}
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
                    actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-delete">delete</a>]}
                  >
                    {/* <Skeleton title={false} loading={loading} active avatar> */}
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
                      title={<a href="#">{item.assignment_name}</a>}
                      description={item.description}
                    />
                    <span>
                      {' '}
                      Released at:
                      {' '}
                      {moment(list.release_time).format('llll')}
                    </span>
                    {/* </Skeleton> */}
                    <Button disabled={false} className="claimBom-btn" onClick={({...other}) => console.log(other)}>Claim</Button>
                  </List.Item>
                )}
              />
            )}
        </Col>
      </Row>
    </>
  );
}
AssignmentList.propTypes = {
  data: PropTypes.object,
  user: PropTypes.string,
};

AssignmentList.defaultProps = {
  data: {},
  user: '',
};
