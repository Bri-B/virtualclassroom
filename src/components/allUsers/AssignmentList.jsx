import React, { useState, useEffect } from 'react';
import {
  List, Typography, Form, Row, Col, Modal, Input, Button,
} from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import AddAssignment from '../teacher/AddAssignment';
import { STUDENT_ROUTES } from '../../constants/routes';

const { Title } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function AssignmentList({ data, user, classList }) {
  const [list, setList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [form] = Form.useForm();
  const [formAssignID, setFromAssignID] = useState('');


  const onFinish = (values) => {
    const subData = {
      id_assignment: formAssignID,
      id_student: data.id,
      drive_url: values.assignmentURL,
    };
    const url = STUDENT_ROUTES.PUT_SUBMIT_ASSIGN;
    axios.put(url, subData)
      .then(() => {
        setSubmit(false);
        alert('Success!');
      })
      .catch((err) => console.error('submit assignments', err));
  };

  const grabAll = () => {
    const url = `${STUDENT_ROUTES.GET_ALL_ASSIGN_BY_STUDID}${data.id}`;
    axios.get(url)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => console.error('grab assignments', err));
  };
  const submitAssign = (e) => {
    // //id_assignment, id_student, drive_url,
    setSubmit(true);
    const value = JSON.parse(e.name);
    setFromAssignID(value.id);
  };

  useEffect(() => {
    grabAll();
  }, []);

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={12}>
          <Title className="list" style={{ color: 'rgba(0, 0, 0, 0.85)', marginRight: '32px' }} level={3}>Assignment List</Title>
        </Col>
        {user === 'teacher' && <Col style={{ textAlign: 'right' }} span={12}><AddAssignment classList={classList} grabAll={grabAll} /></Col>}
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
                    // actions={[<a key="list-loadmore-delete">delete</a>]}
                  >
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
                  <List.Item
                    actions={[<a key="list-loadmore-submit" name={JSON.stringify(item)} onClick={(e) => submitAssign(e.target)}>submit</a>]}
                  >
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
                    <Modal
                      title="Submit Assignment"
                      centered
                      style={{ top: 20 }}
                      visible={submit}
                      okButtonProps={{ disabled: true, style: { display: 'none' } }}
                      cancelButtonProps={{ disabled: true, style: { display: 'none' } }}
                      width={1000}
                    >
                      <Form
                        name="submit-assignment"
                        {...formItemLayout}
                        onFinish={onFinish}
                        form={form}
                      >
                        <Form.Item
                          name="assignmentURL"
                          label="Assignment URL"
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                      </Form>
                    </Modal>
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
  user: PropTypes.string,
  data: PropTypes.object,
  classList: PropTypes.array,
};

AssignmentList.defaultProps = {
  user: '',
  data: {},
  classList: [],
};
