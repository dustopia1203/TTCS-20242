import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import CoursePlayer from "../../components/UploadCourse/CoursePlayer";
import ToastComp from "../../components/ToastComp";
import * as Icon from "react-bootstrap-icons";
import "./style.css";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const purchased = user.courses.includes(id);

  useEffect(() => {
    const getCourse = async () => {
      const data = await fetch(
        `http://localhost:8080/api/course/get-course/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const response = await data.json();
      if (!course) {
        setCourse(response.course);
      }
    };
    if (!course) getCourse();
  }, []);

  const handleBuyCourse = async () => {
    // const body = { courseId: id };
    // const data = await fetch("http://localhost:8080/api/order/create-order", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(body),
    //   credentials: "include",
    // });
    // const response = await data.json();
    // if (response.success) {
    //   const newUser = response.user;
    //   localStorage.setItem("user", JSON.stringify(newUser));
    //   setLog({
    //     show: true,
    //     type: "Success",
    //     message: "Buy course success!",
    //     textType: "text-success",
    //   });
    //   setTimeout(() => {
    //     setLog({ show: false, type: "", message: "", textType: "" });
    //     window.location.reload();
    //   }, 1500);
    // } else {
    //   setLog({
    //     show: true,
    //     type: "Failed",
    //     message: response.message,
    //     textType: "text-danger",
    //   });
    //   setTimeout(() => {
    //     setLog({ show: false, type: "", message: "", textType: "" });
    //   }, 1500);
    // }
  };

  return (
    <></>
    // <Container>
    //   <ToastComp log={log} />
    //   {course ? (
    //     <div className="text-light">
    //       <h1>{course.name}</h1>
    //       <div className="d-flex justify-content-between">
    //         <div className="d-flex justify-content-between">
    //           <p>{course.rating} / 5*</p>
    //           <p className="ms-5">{course.reviews.length} reviews</p>
    //         </div>
    //         <h5>{course.purchased} students</h5>
    //       </div>
    //       <div className="d-flex">
    //         <h5 style={{ opacity: "80%" }} className="align-self-start">
    //           <s> {course.estimatedPrice + "$"} </s>
    //         </h5>
    //         <h5 className="align-self-end px-2">
    //           {course.price === 0 ? "Free" : course.price + "$"}
    //         </h5>
    //       </div>
    //       <h3>{course.tags}</h3>
    //       <h3>Course duration</h3>
    //       <p>{course.courseData.length} videos</p>
    //       <h4>Include source code and fully support from our supporters.</h4>
    //       <h3>Course level</h3>
    //       <p>{course.level}</p>

    //       <CoursePlayer videoUrl={course.demoUrl} title={course.name} />
    //       <p>{course.description}</p>
    //       <div className="d-flex">
    //         <Icon.List className="fs-4 me-1" />
    //         <p>{course.courseData.length} lectures</p>
    //       </div>
    //       {purchased ? (
    //         <Button>Enroll Course</Button>
    //       ) : (
    //         <Button onClick={handleBuyCourse}>Buy Course</Button>
    //       )}
    //     </div>
    //   ) : (
    //     <div>Loading...</div>
    //   )}
    // </Container>
  );
}

export default CourseDetail;
