import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "./style.css";

function FAQs() {
  const [faqs, setFaqs] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const getFaqs = async () => {
      const data = await fetch("http://localhost:8080/api/layout/FAQs", {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      setFaqs(response.layout.faqs);
    };
    getFaqs();
  });

  const toggleQuestion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="text-light d-flex flex-column  align-items-center">
      <h1>Frequently Asked Question</h1>
      <hr />
      {faqs &&
        faqs.map((faq, index) => (
          <div className="w-75 my-5" key={index}>
            <div className="d-flex justify-content-between">
              <h3>{faq.question}</h3>
              {activeIndex === index ? (
                <Icon.Dash
                  className="fs-1"
                  onClick={() => toggleQuestion(index)}
                />
              ) : (
                <Icon.Plus
                  className="fs-1"
                  onClick={() => toggleQuestion(index)}
                />
              )}
            </div>
            {activeIndex === index && <h4 className="my-5">{faq.answer}</h4>}
            <hr />
          </div>
        ))}
    </div>
  );
}

export default FAQs;
