import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const setHeader = () => {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  };

  const fetchEnrolledCourses = () => {
    Axios.get('/user/mycourses', setHeader())
      .then((response) => {
        console.log(response);
        setEnrolledCourses(response.data.enrolledCourses);
      })
      .catch((error) => {
        console.error('Error fetching enrolled courses:', error);
      });
  };

  return (
    <div>
      <h1>Enrolled Courses</h1>
      <Row xs={1} md={3} className="g-4">
        {enrolledCourses.map((course) => (
          <Col key={course._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Link to={`/courses/detail/${course._id}`}>
                  <Button variant="primary">View Course</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
