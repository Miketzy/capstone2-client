import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutUs-container bg-green-50 text-gray-800 py-8">
      <div className="aboutUs-Wrapper container mx-auto px-4 md:px-8">
        <div className="aboutUS text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700">ABOUT US</h1>
          <p className="mt-4 text-lg text-gray-600">
            We are a passionate team of biologists, developers, and
            environmentalists united by a vision to make biodiversity
            information accessible to everyone. Working alongside the Research
          </p>
        </div>

        <div className="out-history mb-12">
          <h2 className="text-2xl font-semibold text-green-600">
            OUR BEGINNINGS
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our journey began as a small initiative, formed by a team of
            dedicated researchers and developers who saw the need to make
            biodiversity information accessible to everyone. Working closely
            with the RIC, we collected and validated data on local species, with
            the vision of creating a comprehensive and interactive platform.
            Over time, this project evolved from a simple concept into a fully
            developed system that not only serves as a valuable resource but
            also engages users in learning about and protecting our environment.
          </p>
        </div>

        <div className="mission-vission mb-12">
          <h2 className="text-2xl font-semibold text-green-600">
            MISSION AND VISION
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            <strong>Mission:</strong> To empower communities and individuals
            with accessible, reliable information on biodiversity, fostering
            awareness, education, and conservation through an interactive and
            user-friendly platform.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            <strong>Vision:</strong> To be a leading resource in biodiversity
            information, connecting people with the natural world to inspire
            lasting environmental stewardship and sustainability.
          </p>
        </div>

        <div className="davao-oreintal mb-12">
          <h2 className="text-2xl font-semibold text-green-600">WHAT WE DO</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our mission is to foster awareness and understanding of biodiversity
            from ridge to reef. Through our interactive platform, we provide
            insights into local species, their ecosystems, and conservation
            efforts. We empower users with tools for species identification,
            environmental quizzes, and dynamic learning resources to enhance
            their knowledge of and appreciation for natural ecosystems.
          </p>
        </div>

        <div className="Contact-Us mb-12">
          <h2 className="text-2xl font-semibold text-green-600">CONTACT US</h2>
          <p className="mt-4 text-lg text-gray-600">
            If you want to learn more about our projects or participate in our
            initiatives, please contact us at{" "}
            <span className="font-bold text-green-700">
              michaelmargate2@gmail.com
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
