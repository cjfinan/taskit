import React from 'react'
import { Card, Col, Row } from "react-bootstrap";
import { DropdownMenu } from '../../components/DropdownMenu';
import { Link, useHistory } from 'react-router-dom';
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../components/context/CurrentUserContext';
import styles from '../../styles/Task.module.css'

const Task = (props) => {
    const {
      id,
      owner,
      profile_id,
      title,
      description,
      start_date,
      end_date,
      update_at,
      status,
      priority,
      taskPage,
      TaskPage,
      board,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleDelete = async () => {
      try {
        axiosRes.delete(`/tasks/${id}/`);
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    };

    const handleEdit = () => {
      history.push(`/tasks/${id}/edit`);
    };

  return (
    <Card className={`justify-content-center ${styles.TaskCard}`}>
      <Row>
        <Col xs={6} sm={4}>
          {title && <Card.Title> {title}</Card.Title>}
        </Col>
        {status && (
          <Col sm={2} className="d-none d-sm-block">
            {status}
          </Col>
        )}
        {priority && (
          <Col sm={2} className="d-none d-sm-block">
            {priority}
          </Col>
        )}
        {end_date && (
          <Col xs={4} sm={2}>
            {end_date}
          </Col>
        )}
        {is_owner && (
          <Col xs={1} sm={2}>
            <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />
          </Col>
        )}
      </Row>
    </Card>
  );
}

export default Task