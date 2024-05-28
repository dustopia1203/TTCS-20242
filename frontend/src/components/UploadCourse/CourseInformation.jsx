import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function CourseInformation({ courseInfo, setCourseInfo, active, setActive }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-auto mt-2">
      <Form onSubmit={handleSubmit} className="form-signin">
        <Form.Group className="mb-3" controlId="course-name">
          <Form.Label>Course name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter course name"
            value={courseInfo.name}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="course-description">
          <Form.Label>Course description</Form.Label>
          <Form.Control
            as="textarea"
            cols="30"
            rows="10"
            required
            placeholder="Enter course description"
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Form.Group
            className=" mb-3"
            controlId="course-price"
            style={{ width: "45%" }}
          >
            <Form.Label>Course price</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="0"
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            className=" mb-3"
            controlId="course-estimated-price"
            style={{ width: "45%" }}
          >
            <Form.Label>Course estimated price</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Enter estimated price"
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="course-tags">
          <Form.Label>Course tags</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter course tags"
            value={courseInfo.tags}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Form.Group
            className=" mb-3"
            controlId="course-level"
            style={{ width: "45%" }}
          >
            <Form.Label>Course level</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter course level"
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            className=" mb-3"
            controlId="course-demo-url"
            style={{ width: "45%" }}
          >
            <Form.Label>Course demo URL</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Enter course demo URL"
              value={courseInfo.demoUrl}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="course-thumbnail">
          <Form.Label>Course thumbnail</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            required
            placeholder="Enter course tags"
            onChange={handleFileChange}
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CourseInformation;
