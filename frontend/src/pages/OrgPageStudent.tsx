// React
import { useState } from "react";

// Components
import { Navbar } from "@/components/commons/Navbar";
import OrgBanner from "@/components/layouts/org_page/OrgBanner";

// Imported Images
import OrgPicture from "@/assets/pictures/awshead.jpeg";
import OrgPicture1 from "@/assets/pictures/IMG_6893.jpeg";
import OrgPicture2 from "@/assets/pictures/IMG_7095.jpeg";
import OrgPicture3 from "@/assets/pictures/IMG_7101.jpeg";
import OrgPicture4 from "@/assets/pictures/IMG_7505.jpeg";
import pic1 from "@/assets/pictures/person1.jpg";
import pic2 from "@/assets/pictures/person2.jpg";
import pic3 from "@/assets/pictures/person3.jpg";
import pic4 from "@/assets/pictures/person4.jpg";
import pic5 from "@/assets/pictures/person5.jpg";

import HeaderPicture1 from "@/assets/pictures/women.png";
import HeaderPicture2 from "@/assets/pictures/tech.jpg";
import HeaderPicture3 from "@/assets/pictures/cisco.png";
import HeaderPicture4 from "@/assets/pictures/tft.jpg";

import Logo1 from "@/sample_data/sample_orgs/gdg_circle.png";
import Logo2 from "@/sample_data/sample_orgs/awscc_circle.png";
import Logo3 from "@/sample_data/sample_orgs/cisco_connect.jpg";
import Logo4 from "@/sample_data/sample_orgs/pup_circle.png";

// Mock Data
const mockData = {
  name: "AWS Cloud Club PUP Manila",
  bannerImageUrl: OrgPicture,
  imageUrl: Logo2,
  followersCount: 1204,
  status: "Accredited",
  upcomingEvents: [
    {
      title: "League Finals 2024",
      date: "January 20, 2025 | 7:00 PM",
      description: "Join us for the exciting finals of League 2024!",
      image: HeaderPicture4,
    },
    {
      title: "Tech Meetup",
      date: "February 10, 2025 | 10:00 AM",
      description: "A networking event for tech enthusiasts and professionals.",
      image: HeaderPicture2,
    },
    {
      title: "Charity Run",
      date: "March 15, 2025 | 6:00 AM",
      description: "Run for a cause and make a difference in the community.",
      image: HeaderPicture3,
    },
    {
      title: "Workshop on AI",
      date: "April 25, 2025 | 9:00 AM",
      description: "Hands-on workshop exploring the basics of AI technology.",
      image: HeaderPicture1,
    },
  ],
  highlights: [
    {
      id: 1,
      imageUrl: HeaderPicture1,
      title: "Charity Run 2024",
      description: "Run for a cause and make a difference in the community.",
    },
    {
      id: 2,
      imageUrl: HeaderPicture2,
      title: "Tech Meetup",
      description: "A networking event for tech enthusiasts and professionals.",
    },
    {
      id: 3,
      imageUrl: HeaderPicture3,
      title: "Workshop on AI",
      description: "Hands-on workshop exploring the basics of AI technology.",
    },
  ],
  orgdescription:
    "The AWS Cloud Club at Polytechnic University of the Philippines (PUP) is a student-led organization that aims to promote cloud technology and its impact on the community. It is part of a global initiative by Amazon Web Services (AWS) to foster learning and innovation among students. The club offers a platform for students to explore AWS technologies through hands-on workshops, seminars, and projects that develop cloud computing skills.",
  orgDetails: {
    organization: "Academic",
    college: "Uniwide",
    email: "awscloudclub.pupmnl@gmail.com",
    socials: {
      facebook: "https://facebook.com/awscloudclub",
      instagram: "https://instagram.com/awscloudclub",
      linkedin: "https://linkedin.com/awscloudclub",
    },
  },
  orgHeads: [
    {
      name: "John Doe",
      imageUrl: pic1,
      role: "President",
    },
    {
      name: "Jane Smithy",
      imageUrl: pic2,
      role: "Vice President",
    },
    {
      name: "Sam Wilson",
      imageUrl: pic3,
      role: "Secretary",
    },
  ],
  pastEvents: [
    {
      title: "Tech Conference 2024",
      imageUrl: HeaderPicture2,
    },
    {
      title: "Leadership Summit",
      imageUrl: HeaderPicture3,
    },
  ],
};

// Function Component
const OrgPageStudent = () => {
  const [orgData, setOrgData] = useState(mockData);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Workaround to prevent the banner from sticking to the navbar */}
        <div className="flex-col flex-1 overflow-y-auto gap-x-6">
          <OrgBanner imageUrl={orgData?.bannerImageUrl} />

          {/* Main Content */}
          <main className="flex flex-1 overflow-y-auto gap-x-6">
            {/* Left Main Content */}
            <section className="w-3/5 space-y-6 pl-12 pt-5 flex flex-col">
              {/* Icons, Name, Buttons */}
              <div className="flex items-center justify-between w-full">
                {/* Icons and Name */}
                <div className="flex items-center justify-start space-x-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center relative">
                    <img
                      src={orgData?.imageUrl} // Use dynamic or fallback image
                      alt="Org Icon"
                      className="w-40 h-40 rounded-full object-cover z-10 shadow-xl"
                      draggable="false"
                    />
                  </div>

                  {/* Name and Followers Status */}
                  <div className="flex flex-col justify-center">
                    <h2
                      className="text-3xl font-semibold font-museo"
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
                    Follow
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="w-full h-auto bg-white shadow-xl rounded-lg p-3">
                {/* Label */}
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md mb-4">
                  Highlights of the Organization
                </div>

                {/* Pictures with event details */}
                <div className="grid grid-cols-3 gap-4">
                  {orgData.highlights.map((highlight) => (
                    <div
                      key={highlight.id}
                      className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md"
                    >
                      {/* Image with blur effect */}
                      <img
                        src={highlight.imageUrl}
                        alt={highlight.title}
                        className="w-full h-64 object-cover filter blur-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-white">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="w-full h-full bg-white shadow-xl rounded-lg p-3 overflow-y-auto">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md mb-4">
                  Upcoming Events
                </div>
                {orgData?.upcomingEvents?.length ? (
                  <div className="space-y-4">
                    {orgData.upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white shadow-lg rounded-lg p-1"
                      >
                        {/* Event Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        </div>
                        {/* Event Details */}
                        <div className="flex-grow ml-4">
                          <h3 className="text-lg font-bold">{event.title}</h3>
                          <p className="text-sm text-gray-600">{event.date}</p>
                          <p className="text-sm text-gray-800 mt-2 line-clamp-2">
                            {event.description}
                          </p>
                        </div>
                        {/* Buttons */}
                        <div className="flex flex-col items-center ml-4 space-y-2">
                          <button
                            className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-md"
                            onClick={() =>
                              console.log(`Star clicked for ${event.title}`)
                            }
                          >
                            ★
                          </button>
                          <button
                            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-md"
                            onClick={() =>
                              console.log(`Share clicked for ${event.title}`)
                            }
                          >
                            ↗
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center">
                    No upcoming events available.
                  </p>
                )}
              </div>
            </section>

            {/* Right Main Content */}
            <section className="w-2/5 space-y-6 pr-10 pt-6 flex flex-col">
              {/* Description */}
              <div className="w-full h-64 bg-white shadow-xl rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Description
                </div>
                <p className="mt-4 text-sm text-poppins text-justify">
                  {orgData?.orgdescription}
                </p>
              </div>

              {/* Org Details */}
              <div className="w-full h-64 bg-white shadow-xl rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Org Details
                </div>

                {/* Organization Info */}
                <div className="mt-4">
                  <div className="flex justify-start space-x-4">
                    <span className="font-museo text-red-800 font-bold text-base">
                      Organization:
                    </span>
                    <span className="font-poppins text-base">
                      {orgData?.orgDetails?.organization || "Not specified"}
                    </span>
                  </div>

                  <div className="flex justify-start space-x-4 mt-2">
                    <span className="font-museo text-red-800 font-bold text-base">
                      College:
                    </span>
                    <span className="font-poppins text-base">
                      {orgData?.orgDetails?.college || "Not specified"}
                    </span>
                  </div>

                  <div className="flex justify-start space-x-4 mt-2">
                    <span className="font-museo text-red-800 font-bold text-base">
                      Email:
                    </span>
                    <span className="font-poppins text-base">
                      {orgData?.orgDetails?.email || "Not specified"}
                    </span>
                  </div>

                  {/* Socials */}
                  <div className="flex flex-col justify-start mt-4">
                    <span className="font-museo text-red-800 font-bold text-base">
                      Socials:
                    </span>
                    <div className="flex space-x-6 mt-2 justify-start">
                      {orgData?.orgDetails?.socials ? (
                        Object.entries(orgData.orgDetails.socials).map(
                          ([platform, link], index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={`https://www.vectorlogo.zone/logos/${platform}/${platform}-icon.svg`} // Dynamic logo based on the platform
                                alt={platform}
                                className="w-12 h-12 rounded-full border-2 border-yellow-400" // Larger icons
                              />
                            </a>
                          )
                        )
                      ) : (
                        <span className="font-poppins text-base text-gray-600">
                          No socials available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Org Heads */}
              <div className="w-full h-64 bg-white shadow-xl rounded-lg p-3">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
                  Org Heads
                </div>

                {/* Horizontal Scrollable Container for Org Heads */}
                <div className="flex justify-center space-x-4 mt-4 overflow-x-auto">
                  {orgData?.orgHeads?.length ? (
                    orgData.orgHeads.map((head, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 flex flex-col items-center text-center"
                      >
                        <img
                          src={head.imageUrl}
                          alt={head.name}
                          className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover"
                        />
                        <div className="mt-2 font-poppins text-base font-bold text-red-800">
                          {head.name}
                        </div>
                        <div className="mt-1 font-poppins text-sm text-gray-600">
                          {head.role || "Role not available"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="font-poppins text-base text-gray-600">
                      No org heads available
                    </span>
                  )}
                </div>
              </div>

              {/* Past Events */}
              <div className="w-full h-full bg-white shadow-xl rounded-lg p-3 overflow-y-auto">
                <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md mb-4">
                  Past Events
                </div>

                {orgData?.pastEvents?.length ? (
                  <div className="space-y-4">
                    {orgData.pastEvents.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white shadow-lg rounded-lg p-1 mb-1"
                      >
                        {/* Event Image */}
                        <div className="flex-shrink-0 mr-4">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                        </div>

                        {/* Event Name */}
                        <div className="flex-grow">
                          <h3 className="text-sm font-semibold">
                            {event.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center">
                    No past events available.
                  </p>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrgPageStudent;
