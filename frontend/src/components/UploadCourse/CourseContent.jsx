import { Fragment, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ToastComp from "../ToastComp";
import * as Icon from "react-bootstrap-icons";

function CourseContent({
  courseData,
  setCourseData,
  active,
  setActive,
  handleSetupCourse,
}) {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const [log, setLog] = useState({
    show: false,
    type: "",
    message: "",
    textType: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      courseData[courseData.length - 1].title === "" ||
      courseData[courseData.length - 1].videoUrl === "" ||
      courseData[courseData.length - 1].description === "" ||
      courseData[courseData.length - 1].links[0].title === "" ||
      courseData[courseData.length - 1].links[0].url === ""
    ) {
      setLog({
        show: true,
        type: "Error",
        message: "Please fill the current content",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    } else {
      setActive(active + 1);
      handleSetupCourse();
    }
  };

  const handleCollapseToggle = (index) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...courseData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseData(updatedData);
  };

  const handleNewContent = (item) => {
    if (
      item.title === "" ||
      item.videoUrl === "" ||
      item.description === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      setLog({
        show: true,
        type: "Error",
        message: "Please fill the current content",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    } else {
      let newVideoSection = "";
      if (courseData.length > 0) {
        const lastVideoSection = courseData[courseData.length - 1].videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseData([...courseData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseData[courseData.length - 1].title === "" ||
      courseData[courseData.length - 1].videoUrl === "" ||
      courseData[courseData.length - 1].description === "" ||
      courseData[courseData.length - 1].links[0].title === "" ||
      courseData[courseData.length - 1].links[0].url === ""
    ) {
      setLog({
        show: true,
        type: "Error",
        message: "Please fill the current content",
        textType: "text-danger",
      });
      setTimeout(() => {
        setLog({ show: false, type: "", message: "", textType: "" });
      }, 1500);
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [
          {
            title: "",
            url: "",
          },
        ],
      };
      setCourseData([...courseData, newContent]);
    }
  };

  return (
    <div className="m-auto mt-2">
      <ToastComp log={log} />
      <Form onSubmit={handleSubmit} className="form-signin">
        {courseData.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseData[index - 1].videoSection;
          return (
            <div key={index}>
              {showSectionInput && (
                <Form.Group className="mb-3" controlId="video-section">
                  <Form.Control
                    type="text"
                    placeholder="Untitled Section"
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseData(updatedData);
                    }}
                  />
                </Form.Group>
              )}
              <div className="d-flex w-100 align-items-center justify-content-between">
                {isCollapsed[index] ? (
                  <>
                    {item.title ? (
                      <p>
                        {index + 1}. {item.title}
                      </p>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <div></div>
                )}
                <div className="d-lex align-items-center">
                  <Icon.Trash
                    style={{
                      cursor: `${index > 0 ? "pointer" : "not-allowed"}`,
                    }}
                    onClick={() => {
                      if (index > 0) {
                        const updateData = [...courseData];
                        updateData.splice(index, 1);
                        setCourseData(updateData);
                      }
                    }}
                  />
                  <Icon.ArrowDown
                    style={{
                      transform: isCollapsed[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg",
                    }}
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>
              <div>
                {!isCollapsed[index] && (
                  <>
                    <Form>
                      <Form.Group className="mb-3" controlId="video-title">
                        <Form.Label>Video title</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter video title"
                          value={item.title}
                          onChange={(e) => {
                            const updatedData = [...courseData];
                            updatedData[index].title = e.target.value;
                            setCourseData(updatedData);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="video-url">
                        <Form.Label>Video Url</Form.Label>
                        <Form.Control
                          type="text"
                          required
                          placeholder="Enter video URL"
                          value={item.videoUrl}
                          onChange={(e) => {
                            const updatedData = [...courseData];
                            updatedData[index].videoUrl = e.target.value;
                            setCourseData(updatedData);
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="video-description"
                      >
                        <Form.Label>Video description</Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          placeholder="Enter video description"
                          value={item.description}
                          onChange={(e) => {
                            const updatedData = [...courseData];
                            updatedData[index].description = e.target.value;
                            setCourseData(updatedData);
                          }}
                        />
                      </Form.Group>
                      <div>
                        {item?.links.map((link, linkIndex) => (
                          <div key={linkIndex}>
                            <Form.Group className=" d-flex justify-content-between">
                              <Form.Label>Link {linkIndex + 1}</Form.Label>
                              <Icon.Trash
                                style={{
                                  cursor: `${
                                    linkIndex === 0 ? "not-allowed" : "pointer"
                                  }`,
                                }}
                                onClick={() =>
                                  linkIndex === 0
                                    ? null
                                    : handleRemoveLink(index, linkIndex)
                                }
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="link-title">
                              <Form.Control
                                type="text"
                                placeholder="Enter link title"
                                value={link.title}
                                onChange={(e) => {
                                  const updatedData = [...courseData];
                                  updatedData[index].links[linkIndex].title =
                                    e.target.value;
                                  setCourseData(updatedData);
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="link-url">
                              <Form.Control
                                type="text"
                                placeholder="Enter link URL"
                                value={link.url}
                                onChange={(e) => {
                                  const updatedData = [...courseData];
                                  updatedData[index].links[linkIndex].url =
                                    e.target.value;
                                  setCourseData(updatedData);
                                }}
                              />
                            </Form.Group>
                          </div>
                        ))}
                        <div style={{ cursor: "pointer" }}>
                          <span onClick={() => handleAddLink(index)}>
                            <Icon.Link45deg className="me-2" />
                            Add link
                          </span>
                        </div>
                      </div>
                    </Form>
                  </>
                )}
                <hr />
                {index === courseData.length - 1 && (
                  <div style={{ cursor: "pointer" }}>
                    <span onClick={() => handleNewContent(item)}>
                      <Icon.PlusCircle className="me-2" />
                      Add course content
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <hr />
        <div style={{ cursor: "pointer" }}>
          <span onClick={() => addNewSection()}>
            <Icon.SignIntersection className="me-2" />
            Add new section
          </span>
        </div>
        <hr />
        <div className="mt-3 d-flex justify-content-between">
          <Button variant="danger" onClick={() => setActive(active - 1)}>
            Prev
          </Button>
          <Button variant="primary" type="submit">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CourseContent;
