import { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseData from "./CourseData";
import CourseOptions from "./CourseOptions";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import "./style.css";

function UploadCourse() {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prequisites, setPrequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "",
      links: [
        {
          title: " ",
          url: "",
        },
      ],
      suggestions: "",
    },
  ]);
  const [course, setCourse] = useState({});

  const resetData = () => {
    setCourseInfo({
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoUrl: "",
      thumbnail: "",
    });
    setBenefits([{ title: "" }]);
    setPrequisites([{ title: "" }]);
    setCourseData([
      {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "",
        links: [
          {
            title: " ",
            url: "",
          },
        ],
        suggestions: "",
      },
    ]);
  };

  const handleSetupCourse = () => {
    const data = {
      ...courseInfo,
      benefits,
      prequisites,
      courseData,
    };
    setCourse(data);
  };

  const handleCreateCourse = async () => {
    await fetch("http://localhost:8080/api/course/upload-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(course),
    });
  };

  return (
    <div className="d-flex w-100 min-vh-100">
      <div className="w-75">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prequisites={prequisites}
            setPrequisites={setPrequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseData={courseData}
            setCourseData={setCourseData}
            active={active}
            setActive={setActive}
            handleSetupCourse={handleSetupCourse}
          />
        )}
        {active === 3 && (
          <CoursePreview
            course={course}
            handleCreateCourse={handleCreateCourse}
            resetData={resetData}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-15 mt-100 vh-100 fixed top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default UploadCourse;
