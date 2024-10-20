import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutUs-container">
      <div className="aboutUs-Wrapper">
        <div className="aboutUS">
          <h1>About Us</h1>
          <p>
            {" "}
            Welcome to [Your Organization/Project Name], a dedicated
            organization focused on the conservation and study of the rich
            biodiversity in Davao Oriental. Our passion is driven by the need to
            protect and preserve the unique flora and fauna found in this
            beautiful region, ensuring that future generations can enjoy the
            natural wonders we have today.
          </p>
        </div>

        <div className="out-history">
          <h2>Our Beginnings</h2>
          <p>
            Founded in [year], [Your Organization/Project Name] started as a
            small initiative by local conservationists and researchers who
            recognized the urgent need to protect endangered species in Davao
            Oriental. From our humble beginnings, we have grown into a thriving
            organization with a strong commitment to environmental preservation.
            Over the years, we have built partnerships with local communities,
            environmental agencies, and academic institutions to bolster our
            conservation efforts.
          </p>
        </div>

        <div className="mission-vission">
          <h2>Mission and Vision</h2>
          <p>
            Our mission is to maintain and enhance the biodiversity of Davao
            Oriental through education, research, and community projects. We aim
            to be a leading advocate for natural resources and to ensure the
            survival of endangered species in the region.
          </p>
        </div>

        <div className="davao-oreintal">
          <h2>Species in Davao Oriental</h2>
          <p>
            Davao Oriental is home to many unique species, including [list some
            species, e.g., Philippine Eagle, Davao Crocodile, etc.]. These
            species are crucial to the ecology and culture of the region, and we
            strive to promote their protection.
          </p>
        </div>

        <div className="davao-oreintal">
          <h2>What We Do</h2>
          <p>
            At [Your Organization/Project Name], we are committed to hands-on
            conservation efforts through several key initiatives:
          </p>
        </div>

        <div className="Contact-Us">
          <h2>Contact Us</h2>
          <p>
            If you want to learn more about our projects or participate in our
            initiatives, please contact us at [insert contact information, e.g.,
            email or phone number].
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
