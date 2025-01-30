import { useState } from "react";

import { Navbar } from "@/components/commons/Navbar";
import OrgBanner from "@/components/layouts/org_page/OrgBanner";
import OrgHighlights from "@/components/layouts/org_page/OrgHighlights";
import OrgDescription from "@/components/layouts/org_page/OrgDescription";
import OrgDetails from "@/components/layouts/org_page/OrgDetails";
import OrgHeads from "@/components/layouts/org_page/OrgHeads";
import { ProfilePictureButton } from "@/components/layouts/org_page/ProfilePictureButton";

import { EventModal } from "@/components/layouts/settings/EventModal";

const mockData = {
  name: "Sample Organization",
  bannerImageUrl: "https://via.placeholder.com/1920x1080",
  imageUrl: "https://via.placeholder.com/100",
  followersCount: 1204,
  status: "Accredited",
  upcomingEvents: [
    {
      title: "League Finals 2024",
      date: "January 20, 2025 | 7:00 PM",
      description: "Join us for the exciting finals of League 2024!",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Tech Meetup",
      date: "February 10, 2025 | 10:00 AM",
      description: "A networking event for tech enthusiasts and professionals.",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Charity Run",
      date: "March 15, 2025 | 6:00 AM",
      description: "Run for a cause and make a difference in the community.",
      image: "https://via.placeholder.com/100",
    },
    {
      title: "Workshop on AI",
      date: "April 25, 2025 | 9:00 AM",
      description: "Hands-on workshop exploring the basics of AI technology.",
      image: "https://via.placeholder.com/100",
    },
  ],
  highlights: [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/300x400",
      title: "Event Name 1",
      description: "A brief description of Event 1 goes here.",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/300x400",
      title: "Event Name 2",
      description: "A brief description of Event 2 goes here.",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/300x400",
      title: "Event Name 3",
      description: "A brief description of Event 3 goes here.",
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
      id: 1,
      name: "John Doe",
      imageUrl: "https://via.placeholder.com/100",
      role: "President",
    },
    {
      id: 2,
      name: "Jane Smithy",
      imageUrl: "https://via.placeholder.com/100",
      role: "Vice President",
    },
    {
      id: 3,
      name: "Sam Wilson",
      imageUrl: "https://via.placeholder.com/100",
      role: "Secretary",
    },
  ],
  pastEvents: [
    {
      title: "Tech Conference 2024",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      title: "Leadership Summit",
      imageUrl: "https://via.placeholder.com/100",
    },
  ],
};

const OrgPageAdmin = () => {
  const [orgData, setOrgData] = useState(mockData);

  // Export this to a component
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (formData: {
    eventName: string;
    when: string;
    where: "online" | "onsite";
    platform?: string;
    location?: string;
    participantsCount: "limited" | "free";
    eventDetails: string;
    topic: string;
    exclusivity: "uniwide" | "college";
    picture: File | null;
    organizer: string;
    host: string;
    freeOrPaid: "free" | "paid";
    cost?: string;
  }) => {
    const newEvent = {
      title: formData.eventName,
      date: formData.when,
      description: formData.eventDetails,
      image: formData.picture
        ? URL.createObjectURL(formData.picture)
        : "https://via.placeholder.com/100",
    };

    setOrgData((prevData) => ({
      ...prevData,
      upcomingEvents: [newEvent, ...prevData.upcomingEvents],
    }));

    handleCloseModal();
  };
  // Until this part

  // For Updating Highlights
  const handleUpdateHighlights = (newHighlights: any) => {
    setOrgData({
      ...orgData,
      highlights: newHighlights,
    });

    // Here you would typically make an API call to update the backend
    // Example:
    // await updateOrgHighlights(orgId, newHighlights);
  };

  // For Updating Description
  const handleUpdateDescription = (newDescription: string) => {
    setOrgData({
      ...orgData,
      orgdescription: newDescription,
    });
  };

  // For Updating Org Details Part 1
  const handleUpdateOrgDetails = (details: {
    organization: string;
    college: string;
    email: string;
  }) => {
    setOrgData({
      ...orgData,
      orgDetails: {
        ...orgData.orgDetails,
        ...details,
      },
    });
  };

  // For Updating Org Details Part 2
  const handleUpdateSocials = (socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => {
    setOrgData({
      ...orgData,
      orgDetails: {
        ...orgData.orgDetails,
        ...socials,
      },
    });
  };

  const handleSavePictures = (profilePic: string, headerPic: string) => {
    setOrgData((prevData) => ({
      ...prevData,
      imageUrl: profilePic,
      bannerImageUrl: headerPic,
    }));
  };

  const handleUpdateOrgHeads = (newOrgHeads) => {
    setOrgData({
      ...orgData,
      orgHeads: newOrgHeads,
    });
  };

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
                  {/* Profile Picture Button Component */}
                  <ProfilePictureButton
                    imageUrl={orgData.imageUrl}
                    bannerImageUrl={orgData.bannerImageUrl}
                    onSavePictures={handleSavePictures}
                  />

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

                <div className="flex items-center justify-start space-x-4">
                  <button
                    onClick={handleOpenModal}
                    className="px-6 py-2 bg-amber-600 text-white text-l font-museo rounded-lg shadow-md hover:bg-amber-800"
                  >
                    Create Event
                  </button>
                  <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>

              {/* Highlights */}
              <OrgHighlights
                highlights={orgData.highlights}
                onUpdateHighlights={handleUpdateHighlights}
                isAdmin={true}
              />

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
                            src={
                              event.image || "https://via.placeholder.com/100"
                            }
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
              <OrgDescription
                description={orgData.orgdescription}
                onUpdateDescription={handleUpdateDescription}
                isAdmin={true}
              />

              {/* Org Details */}
              <OrgDetails
                orgDetails={orgData.orgDetails}
                onUpdateDetails={handleUpdateOrgDetails}
                onUpdateSocials={handleUpdateSocials}
                isAdmin={true}
              />

              <OrgHeads
                orgHeads={orgData.orgHeads}
                onUpdateOrgHeads={handleUpdateOrgHeads}
                isAdmin={true}
              />

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
                            src={
                              event.imageUrl ||
                              "https://via.placeholder.com/100"
                            }
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

export default OrgPageAdmin;
