import React from "react";

const AboutTheProject = () => {
  return (
    <div className="bg-green-50 py-16 px-8 sm:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-green-800">
          About the BioExplorer Project
        </h2>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          BioExplorer is an innovative platform developed to showcase and
          explore the diverse species found in Davao Oriental. It provides a
          comprehensive database of species, offering detailed information about
          their characteristics, habitats, and conservation status. The project
          is designed to bring awareness to the rich biodiversity of the region
          and encourage collaboration between citizens, researchers, and
          environmentalists in preserving and protecting local species.
        </p>

        <div className="mt-14 space-y-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-green-700">
              Project Goals:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
              <li>
                <strong>Raise Awareness:</strong> Educate the public on the
                importance of local biodiversity and its conservation.
              </li>
              <li>
                <strong>Explore Biodiversity:</strong> Provide users with a
                platform to explore various species native to Davao Oriental
                through an easy-to-use interface.
              </li>
              <li>
                <strong>Contribute to Conservation:</strong> Enable users to
                contribute to the database by submitting species they discover,
                with a review and approval system in place.
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-green-700">
              How It Works:
            </h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
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
            <h3 className="text-3xl font-semibold text-green-700">
              Why It Matters:
            </h3>
            <p className="text-lg text-gray-700">
              Biodiversity is critical to the health of our ecosystems, and by
              preserving and sharing knowledge about local species, BioExplorer
              hopes to foster a greater understanding of the natural world and
              inspire action towards environmental protection. This project
              brings together people from different backgrounds, creating a
              collaborative effort to document and protect the species of Davao
              Oriental.
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-3xl font-semibold text-green-700">Features:</h3>
            <ul className="list-disc list-inside text-lg text-gray-700">
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

        <div className="mt-16 flex justify-center">
          <img
            src="https://example.com/nature-sign.jpg"
            alt="Nature Signage"
            className="w-full sm:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutTheProject;
