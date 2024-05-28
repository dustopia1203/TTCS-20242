import { Button, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

function CourseData({
  benefits,
  setBenefits,
  prequisites,
  setPrequisites,
  active,
  setActive,
}) {
  const handleBenefitsChange = (index, value) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrequisitesChange = (index, value) => {
    const updatedPrequisites = [...prequisites];
    updatedPrequisites[index].title = value;
    setPrequisites(updatedPrequisites);
  };

  const handleAddPrequisite = () => {
    setPrequisites([...prequisites, { title: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  return (
    <div className="m-auto mt-2">
      <Form onSubmit={handleSubmit} className="form-signin">
        <Form.Group className="mb-3" controlId="course-benefits">
          <Form.Label>What are the benefits of this course?</Form.Label>
          {benefits.map((benefit, index) => (
            <Form.Control
              className="mb-3"
              key={index}
              type="text"
              placeholder="Enter benefit"
              required
              value={benefit.title}
              onChange={(e) => handleBenefitsChange(index, e.target.value)}
            />
          ))}
          <Icon.PlusCircle
            style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
            onClick={handleAddBenefit}
          ></Icon.PlusCircle>
        </Form.Group>
        <Form.Group className="mb-3" controlId="course-benefits">
          <Form.Label>What are the prequisites of this course?</Form.Label>
          {prequisites.map((prequisite, index) => (
            <Form.Control
              className="mb-3"
              key={index}
              type="text"
              placeholder="Enter prequisite"
              required
              value={prequisite.title}
              onChange={(e) => handlePrequisitesChange(index, e.target.value)}
            />
          ))}
          <Icon.PlusCircle
            style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
            onClick={handleAddPrequisite}
          ></Icon.PlusCircle>
        </Form.Group>
        <div className="d-flex justify-content-between">
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

export default CourseData;
