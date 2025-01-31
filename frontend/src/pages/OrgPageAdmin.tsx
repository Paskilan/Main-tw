import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/commons/Navbar";
import OrgBanner from "@/components/layouts/org_page/OrgBanner";
import OrgHighlights from "@/components/layouts/org_page/OrgHighlights";
import OrgDescription from "@/components/layouts/org_page/OrgDescription";
import OrgDetails from "@/components/layouts/org_page/OrgDetails";
import { ManageAdminsButton } from "@/components/layouts/org_page/ManageAdminsButton";
import { ProfilePictureButton } from "@/components/layouts/org_page/ProfilePictureButton";
import { EventModal } from "@/components/layouts/settings/EventModal";
import { OrganizationDTO } from "../types/orgAdmin";
import axios from "axios";

const OrgPageAdmin = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const [orgData, setOrgData] = useState<OrganizationDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadOrganizationData = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`
                    }
            });
            const data = await response.data();  
            if (response.status === 200) {
                setOrgData(data);
                setError(null);
            }
        } catch (error) {
            setError("Failed to load organization data");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadOrganizationData();
    }, [orgId]);
   

    const handleUpdateDescription = async (newDescription: string) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/description`,
                JSON.stringify(newDescription),
                { headers: { 'Content-Type': 'application/json' } }
            );
            setOrgData(prev => prev ? { ...prev, description: newDescription } : null);
            setError(null);
        } catch (error) {
            setError("Failed to update description");
            console.error(error);
        }
    };

    const handleUpdateSocials = async (socials: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    }) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/socials`, {
                facebook: socials.facebook || "",
                instagram: socials.instagram || "",
                linkedin: socials.linkedin || ""
            });
            setOrgData(prev => prev ? {
                ...prev,
                orgDetails: {
                    ...prev.orgDetails,
                    socials: { ...prev.orgDetails.socials, ...socials }
                }
            } : null);
            setError(null);
        } catch (error) {
            setError("Failed to update social media links");
            console.error(error);
        }
    };

    const handleSaveLogo = async (OrglogoUrl: string) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/logo`,
                { logo: OrglogoUrl }, 
                { headers: { 'Content-Type': 'application/json' } }
            );
            await loadOrganizationData();
            setError(null);
        } catch (error) {
            setError("Failed to update logo");
            console.error(error);
        }
    };

    const handleSaveHeader = async (OrgheaderUrl: string) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/header`,
                { header: OrgheaderUrl }, 
                { headers: { 'Content-Type': 'application/json' } }
            );
            await loadOrganizationData();
            setError(null);
        } catch (error) {
            setError("Failed to update header");
            console.error(error);
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleCreateEvent = async (formData: {
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
        try {
            const eventDto = {
                title: formData.eventName,
                description: formData.eventDetails,
                date: new Date(formData.when),
                mode: formData.where,
                location: formData.where === "online" ? formData.platform : formData.location,
                host: formData.host,
                header: null,
                rsvpCount: 0,
                registration: formData.freeOrPaid === "free" ? "Free" : `Paid - ${formData.cost}`
            };

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/events`, eventDto);
            await loadOrganizationData();
            setIsModalOpen(false);
            setError(null);
        } catch (error) {
            setError("Failed to create event");
            console.error(error);
        }
    };

    const handleUpdateAdmins = async (newAdmins: any[]) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/admins`,
                newAdmins,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setOrgData(prev => prev ? { ...prev, admins: newAdmins } : null);
            setError(null);
        } catch (error) {
            setError("Failed to update admins");
            console.error(error);
        }
    };

    const handleUpdateDetails = async (details: {
        organization: string;
        college: string;
        email: string;
    }) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/details`,
                details,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setOrgData(prev => prev ? {
                ...prev,
                name: details.organization,
                collegeName: details.college,
                email: details.email
            } : null);
            setError(null);
        } catch (error) {
            setError("Failed to update organization details");
            console.error(error);
        }
    };


    const handleUpdateHighlights = async (newHighlights: any[]) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/organization/${orgId}/highlights`,
                newHighlights,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setOrgData(prev => prev ? { ...prev, highlights: newHighlights } : null);
            setError(null);
        } catch (error) {
            setError("Failed to update highlights");
            console.error(error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!orgData) {
        return <div>No organization data available</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-col flex-1 overflow-y-auto gap-x-6">
                <OrgBanner imageUrl={orgData.headerImageUrl ?? ''} />

                <main className="flex flex-1 overflow-y-auto gap-x-6">
                    <section className="w-3/5 space-y-6 pl-12 pt-5 flex flex-col">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-start space-x-6">
                                <ProfilePictureButton
                                    imageUrl={orgData.imageUrl}
                                    bannerImageUrl={orgData.headerImageUrl ?? ''}
                                    onSavePictures={async (logoFile: File, headerFile: File) => {
                                        try {
                                            if (logoFile) {
                                                const logoBase64 = await convertFileToBase64(logoFile);
                                                await handleSaveLogo(logoBase64);
                                            }
                                            if (headerFile) {
                                                const headerBase64 = await convertFileToBase64(headerFile);
                                                await handleSaveHeader(headerBase64);
                                            }
                                        } catch (error) {
                                            console.error("Error uploading images:", error);
                                        }
                                    }}
                                />
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-3xl font-semibold font-museo">
                                        {orgData.name}
                                    </h2>
                                    <p className="text-l text-red-800 font-museo">
                                        {orgData.followerCount} Followers | Status: {orgData.isVerified ? "Verified" : "Unverified"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-start space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-6 py-2 bg-amber-600 text-white text-l font-museo rounded-lg shadow-md hover:bg-amber-800"
                                >
                                    Create Event
                                </button>
                                <EventModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                    onSubmit={handleCreateEvent}
                                />
                                <ManageAdminsButton
                                    orgData={orgData}
                                    onUpdateAdmins={handleUpdateAdmins}
                                />
                            </div>
                        </div>

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
                                            {/* Event details */}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No upcoming events</p>
                            )}
                        </div>
                    </section>

                    {/* Right sidebar */}
                    <section className="w-2/5 space-y-6 pr-12 pt-5">
                        <OrgDescription
                            description={orgData.description}
                            onUpdateDescription={handleUpdateDescription}
                            isAdmin={true}
                        />
                        <OrgDetails
                            orgDetails={{
                                orgType: orgData.classification,
                                college: orgData.collegeName,
                                email: orgData.email,
                                socials: orgData.socials,
                            }}
                            onUpdateDetails={handleUpdateDetails}
                            onUpdateSocials={handleUpdateSocials}
                            isAdmin={true}
                        />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default OrgPageAdmin;