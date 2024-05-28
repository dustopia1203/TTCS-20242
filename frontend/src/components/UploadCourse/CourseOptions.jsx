import * as Icon from "react-bootstrap-icons";

const options = ["Information", "Options", "Content", "Preview"];

function CourseOptions({ active, setActive }) {
  return (
    <>
      {options.map((option, index) => (
        <div
          key={index}
          className="w-100 d-flex py-2"
          style={{ cursor: "pointer" }}
        >
          <div
            className={`rounded-full flex items-center justify-center ${
              active + 1 > index ? "text-primary" : "text-dark"
            }`}
          >
            <Icon.CheckCircle className="fs-4"></Icon.CheckCircle>
          </div>
          <h5 className={`ps-2 ${active === index ? "text-primary" : ""}`}>
            {option}
          </h5>
        </div>
      ))}
    </>
  );
}

export default CourseOptions;
