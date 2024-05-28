import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import ToastComp from "../../components/ToastComp";
import { Modal, Button, Form } from "react-bootstrap";
import "./style.css";

function GetAllCourses() {
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState(null);
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [level, setLevel] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      const data = await fetch(
        "http://localhost:8080/api/course/get-all-courses",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await data.json();
      const courses = response.courses;
      setCourses(courses);
    };
    if (!courses) {
      getCourses();
    }
  }, [courses]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = async () => {
    const data = await fetch(
      `http://localhost:8080/api/course/edit-course/${id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          level,
          tags,
        }),
      }
    );
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "Course updated!",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
        setCourses(null);
        handleClose();
      }, 1500);
    } else {
      setLog({
        show: true,
        type: "Failed",
        message: "Error occurred!",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    }
  };

  const handleDelete = async (id) => {
    const data = await fetch(`http://localhost:8080/api/course/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const response = await data.json();
    if (response.success) {
      setLog({
        show: true,
        type: "Success",
        message: "Course deleted!",
        textType: "text-success",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
        setCourses(null);
      }, 1500);
    } else {
      setLog({
        show: true,
        type: "Failed",
        message: "Error occurred!",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    }
  };

  return (
    <>
      <ToastComp log={log} />
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="course-name">
              <Form.Label>Course name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="course-description">
              <Form.Label>Course description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex">
              <Form.Group className="w-50 me-1 mb-3" controlId="course-price">
                <Form.Label>Course price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="w-50 ms-1 mb-3" controlId="course-level">
                <Form.Label>Course level</Form.Label>
                <Form.Control
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="course-tags">
              <Form.Label>Course tags</Form.Label>
              <Form.Control
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <table className="w-100 text-center mx-auto table" data-bs-theme="dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Course name</th>
            <th scope="col">Rating</th>
            <th scope="col">Price</th>
            <th scope="col">Purchased</th>
            <th scope="col">Created at</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {courses?.map((course, index) => (
          <tbody key={course._id}>
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{course.name}</td>
              <td>{course.rating}</td>
              <td>{course.price}</td>
              <td>{course.purchased}</td>
              <td>{course.createdAt}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Icon.PencilFill
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setId(course._id);
                      setName(course.name);
                      setDescription(course.description);
                      setPrice(course.price);
                      setLevel(course.level);
                      setTags(course.tags);
                      handleShow();
                    }}
                  />
                  <Icon.Trash2Fill
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(course._id)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
}

export default GetAllCourses;
