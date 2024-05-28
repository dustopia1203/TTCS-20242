import { Button, Form } from "react-bootstrap";
import ToastComp from "../ToastComp";
import CoursePlayer from "./CoursePlayer";
import { useState } from "react";

function CoursePreview({
  course,
  handleCreateCourse,
  resetData,
  active,
  setActive,
}) {
  const discountPercentage = Math.round(
    (1 - course.price / course.estimatedPrice) * 100
  );
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });

  const handleConfirm = () => {
    handleCreateCourse();
    setLog({
      show: true,
      type: "Success",
      message: "Course uploaded successfully",
      textType: "text-success",
    });
    setTimeout(() => {
      setLog({
        show: false,
        type: "",
        message: "",
        textType: "",
      });
      resetData();
      setActive(0);
    }, 1500);
  };

  return (
    <div
      className="w-75 m-auto p-2"
      style={{ border: "1px solid white", borderRadius: "10px" }}
    >
      <ToastComp log={log} />
      <div className="w-100 position-relative text-light">
        <CoursePlayer videoUrl={course.demoUrl} title={course.name} />
        <div className="d-flex">
          <h1 className="pe-2 align-self-end">
            {course.price === 0 ? "Free" : course.price + "$"}
          </h1>
          <h5 style={{ opacity: "80%" }} className="px-2 align-self-start">
            <s> {course.estimatedPrice + "$"} </s>
          </h5>
          <h4 className="px-2 align-self-end">{discountPercentage} % Off</h4>
        </div>
        <h3>{course.tags}</h3>
        <h3>Course duration</h3>
        <p>{course.courseData.length} videos</p>
        <h4>Include source code and fully support from our supporters.</h4>
        <h3>Course level</h3>
        <p>{course.level}</p>
        <h3>What will you learn from this course?</h3>
        {course.benefits.map((benefit, index) => (
          <li key={index}>{benefit.title}</li>
        ))}
        <h3>Prequisites</h3>
        {course.prequisites.map((prequisite, index) => (
          <li key={index}>{prequisite.title}</li>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="danger" onClick={() => setActive(active - 1)}>
          Prev
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default CoursePreview;
