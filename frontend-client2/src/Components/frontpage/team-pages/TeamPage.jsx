import React from "react";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Jane Doe",
      position: "Project Manager",
      bio: "Jane is an environmental scientist with a passion for biodiversity conservation. She leads the BioExplorer team, ensuring the project stays on track and serves its mission of protecting local species.",
      photo: "path/to/jane-photo.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/jane-doe",
        twitter: "https://twitter.com/jane_doe",
      },
    },
    {
      name: "John Smith",
      position: "Lead Developer",
      bio: "John is a software engineer who specializes in creating user-friendly platforms. His technical expertise powers the BioExplorer interface, ensuring an engaging and smooth user experience.",
      photo: "path/to/john-photo.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/john-smith",
        twitter: "https://twitter.com/john_smith",
      },
    },
    {
      name: "Emily Johnson",
      position: "Conservation Specialist",
      bio: "Emily brings her expertise in conservation and ecology to the team. She helps ensure that the species data in BioExplorer is accurate and meaningful, contributing to the preservation of local biodiversity.",
      photo: "path/to/emily-photo.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/emily-johnson",
        twitter: "https://twitter.com/emily_johnson",
      },
    },
  ];

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-emerald-800 bg-emerald-200 py-3 px-8 rounded-md shadow-md inline-block">
          Meet Our Team
        </h2>
        <p className="mt-6 text-xl text-gray-800 max-w-3xl mx-auto text-justify bg-green-50 py-6 px-4 rounded-lg shadow-md">
          Our team is a diverse group of passionate individuals dedicated to
          preserving the rich biodiversity of Davao Oriental. We bring together
          expertise from various fields, from conservation to technology, all
          united in our mission to protect and share the wonders of local
          species.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-emerald-100 p-6 rounded-lg shadow-lg"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-emerald-700">
                {member.name}
              </h3>
              <p className="text-lg text-gray-700 italic">{member.position}</p>
              <p className="text-gray-700 mt-4 text-justify">{member.bio}</p>
              <div className="mt-4 flex justify-center space-x-6">
                <a
                  href={member.socialLinks.linkedin}
                  className="text-emerald-600 hover:text-emerald-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin-in text-2xl"></i>
                </a>
                <a
                  href={member.socialLinks.twitter}
                  className="text-emerald-600 hover:text-emerald-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
