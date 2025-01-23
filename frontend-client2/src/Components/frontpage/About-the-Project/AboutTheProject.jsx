import React from "react";

const AboutTheProject = () => {
  return (
    <div className="bg-gradient-to-b from-green-100 to-white py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-green-800 bg-green-200 py-2 px-6 rounded-md shadow-lg inline-block">
          About the Project
        </h2>
        <p className="mt-6 text-xl text-gray-700 max-w-3xl mx-auto">
          BioExplorer is an innovative platform developed to showcase and
          explore the diverse species found in Davao Oriental. It provides a
          comprehensive database of species, offering detailed information about
          their characteristics, habitats, and conservation status. The project
          is designed to bring awareness to the rich biodiversity of the region
          and encourage collaboration between citizens, researchers, and
          environmentalists in preserving and protecting local species.
        </p>

        <div className="mt-14 space-y-10">
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-green-700 bg-green-200 py-2 px-6 rounded-md shadow-lg inline-block">
              Project Goals:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4 max-w-2xl mx-auto">
              <li>
                Raise Awareness: Educate the public on the importance of local
                biodiversity and its conservation.
              </li>
              <li>
                Explore Biodiversity: Provide users with a platform to explore
                various species native to Davao Oriental through an easy-to-use
                interface.
              </li>
              <li>
                Contribute to Conservation: Enable users to contribute to the
                database by submitting species they discover, with a review and
                approval system in place.
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-green-700 bg-green-200 py-2 px-6 rounded-md shadow-lg inline-block">
              How It Works:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4 max-w-2xl mx-auto">
              <li>
                <strong>Species Database:</strong> Users can search for species
                based on their common name, scientific name, or classification.
                Each species entry provides detailed information, including
                images, habitat, and conservation status.
              </li>
              <li>
                <strong>Contribute and Approve:</strong> Contributors can add
                new species, which are then reviewed and approved by admins
                before being added to the main database.
              </li>
              <li>
                <strong>Interactive Map:</strong> The platform includes a map
                feature, allowing users to see the geographical distribution of
                species in Davao Oriental.
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-green-700 bg-green-200 py-2 px-6 rounded-md shadow-lg inline-block">
              Why It Matters:
            </h3>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Biodiversity is critical to the health of our ecosystems, and by
              preserving and sharing knowledge about local species, BioExplorer
              hopes to foster a greater understanding of the natural world and
              inspire action towards environmental protection. This project
              brings together people from different backgrounds, creating a
              collaborative effort to document and protect the species of Davao
              Oriental.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <h3 className="text-3xl font-semibold text-green-700 bg-green-200 py-2 px-6 rounded-md shadow-lg inline-block">
              Features:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4 max-w-2xl mx-auto">
              <li>
                <strong>Search and Filter:</strong> Easily search and filter
                species based on names, categories, or locations.
              </li>
              <li>
                <strong>User Contributions:</strong> Submit and share new
                species discoveries for review.
              </li>
              <li>
                <strong>Admin Approval System:</strong> Ensures the accuracy and
                reliability of the information added.
              </li>
              <li>
                <strong>Real-Time Notifications:</strong> Contributors receive
                notifications when their species submissions are approved or
                rejected.
              </li>
              <li>
                <strong>Map Visualization:</strong> View species locations on an
                interactive map.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTheProject;
