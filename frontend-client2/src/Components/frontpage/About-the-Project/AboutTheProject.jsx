import React from "react";

const AboutTheProject = () => {
  return (
    <div className="py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-emerald-800 bg-emerald-200 py-3 px-8 rounded-md shadow-md inline-block">
          About the Project
        </h2>
        <p className="mt-6 text-xl text-gray-800 max-w-3xl mx-auto text-justify bg-green-50 py-6 px-4 rounded-lg shadow-md">
          BioExplorer is an innovative platform developed to showcase and
          explore the diverse species found in Davao Oriental. It provides a
          comprehensive database of species, offering detailed information about
          their characteristics, habitats, and conservation status. The project
          is designed to bring awareness to the rich biodiversity of the region
          and encourage collaboration between citizens, researchers, and
          environmentalists in preserving and protecting local species.
        </p>

        <div className="mt-14 space-y-10">
          {/* Other sections remain unchanged */}

          <div className="mt-10 space-y-6 bg-emerald-100 py-6 px-6 rounded-lg shadow-lg">
            <h3 className="text-3xl font-semibold text-emerald-700 bg-emerald-300 py-2 px-6 rounded-md shadow-lg inline-block">
              Features:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-8 max-w-2xl mx-auto text-justify">
              <li className="flex items-start space-x-4">
                <img
                  src="/path-to-your-image1.jpg"
                  alt="Search and Filter"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <span>
                  <strong>Search and Filter:</strong> Easily search and filter
                  species based on names, categories, or locations.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <img
                  src="/path-to-your-image2.jpg"
                  alt="User Contributions"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <span>
                  <strong>User Contributions:</strong> Submit and share new
                  species discoveries for review.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <img
                  src="/path-to-your-image3.jpg"
                  alt="Admin Approval System"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <span>
                  <strong>Admin Approval System:</strong> Ensures the accuracy
                  and reliability of the information added.
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <img
                  src="/path-to-your-image4.jpg"
                  alt="Real-Time Notifications"
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
                <span>
                  <strong>Real-Time Notifications:</strong> Contributors receive
                  notifications when their species submissions are approved or
                  rejected.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheProject;
