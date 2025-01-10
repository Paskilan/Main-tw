// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import { Navbar } from "@/components/commons/Navbar";
import OrgBanner from "@/components/layouts/org_page/OrgBanner";

// Test Components
import awsccIcon from "@/sample_data/sample_orgs/awscc_circle.png";

// Function Component
const OrgPageStudent = ({ bannerImageUrl }) => {
  const { orgId } = useParams(); // Assuming the orgId is part of the route
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Fetch organization data from the API using the orgId
    const fetchOrgData = async () => {
      try {
        const response = await fetch(`/api/organizations/${orgId}`); // Replace with your actual API URL
        if (!response.ok) throw new Error("Failed to fetch organization data.");
        const data = await response.json();
        setOrgData(data);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, [orgId]);

  // if (loading) return <div>Loading...</div>;                   (Disregard for now. Only implement if connected to backend already)

  // if (!orgData) return <div>Organization not found.</div>;     (Disregard for now. Only implement if connected to backend already)

  // Banner image URL
  // bannerImageUrl = "https://via.placeholder.com/1920x1080";

  //List of things that would be dependent on output of fetchOrgData:
  // - orgData.bannerImageUrl
  // - orgData.imageUrl
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Workaround to prevent the banner from sticking to the navbar */}
        <div className="flex-col flex-1 overflow-y-auto gap-x-6">
          <OrgBanner
            imageUrl={orgData?.bannerImageUrl || bannerImageUrl}
            className="z-0"
          />

          {/* Main Content */}
          <main className="flex flex-1 overflow-y-auto gap-x-6">
            {/* Left Main Content */}
            <section className="w-3/5 space-y-6 pl-12 pt-5">
              {/* Icons, Name, Buttons */}
              <div className="flex items-center justify-between w-full">
                {/* Icons and Name */}
                <div className="flex items-center justify-start space-x-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center relative">
                    <img
                      src={orgData?.imageUrl || awsccIcon} // Use dynamic or fallback image
                      alt="Organization Icon"
                      className="w-40 h-40 rounded-full object-cover z-10 shadow-xl"
                      draggable="false"
                    />
                  </div>

                  {/* Name and Followers Status */}
                  <div className="flex flex-col justify-center">
                    <h2
                      className="text-4xl font-semibold font-museo"
                      style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)" }}
                    >
                      {orgData?.name || "Club Name"}{" "}
                      {/* Fetched organization name */}
                    </h2>

                    <p className="text-l text-red-800 font-museo">
                      {orgData?.followersCount || 0} Followers | Status:{" "}
                      {orgData?.status || "Not Accredited"}{" "}
                      {/* Fetched follower count and status */}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-start space-x-4">
                  <button className="px-5 py-2 bg-red-900 text-white text-l font-museo rounded-lg shadow-md hover:bg-red-700">
                    Ask me!
                  </button>
                  <button className="px-5 py-2 bg-red-900 text-white text-l font-museo rounded-lg shadow-md hover:bg-red-700">
                    Follow
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="w-full h-64 bg-gray-200 rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Highlights of the Organization
                </div>
                <div></div>
              </div>

              {/* Upcoming Events */}
              <div className="w-full h-64 bg-gray-200 rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Upcoming Events
                </div>
              </div>
            </section>

            {/* Right Main Content */}
            <section className="w-2/5 space-y-6 pr-7 pt-6">
              {/* Description */}
              <div className="w-full h-64 bg-gray-200 rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Description
                </div>
              </div>

              {/* Org Details */}
              <div className="w-full h-64 bg-gray-200 rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Org Details
                </div>
              </div>

              {/* Org Heads */}
              <div className="w-full h-64 bg-gray-200 rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Org Heads
                </div>
              </div>

              {/* Past Events */}
              <div className="w-full h-64 bg-gray-200 rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Past Events
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrgPageStudent;
