import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState(null); // Initialize as null

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
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Enrolled Courses</h1>
      {enrolledCourses === null ? ( // Condition to check if data hasn't been fetched yet
        <p>Loading...</p>
      ) : enrolledCourses.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffcccc', padding: '20px' }}>
          <p>You are not enrolled in any course yet!</p>
        </div>
      ) : (
        <Row className="justify-content-center">
          {enrolledCourses.map((course) => (
            <Col key={course._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ width: '18rem', height: '300px' }} className="h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                  </div>
                  <div className="text-center">
                    <Link to={`/courses/detail/${course._id}`}>
                      <Button variant="primary">View Course</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
