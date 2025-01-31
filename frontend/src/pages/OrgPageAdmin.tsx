import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/commons/Navbar";
import OrgBanner from "@/components/layouts/org_page/OrgBanner";
import OrgHighlights from "@/components/layouts/org_page/OrgHighlights";
import OrgDescription from "@/components/layouts/org_page/OrgDescription";
import OrgDetails from "@/components/layouts/org_page/OrgDetails";
import { ManageAdminsButton } from "@/components/layouts/org_page/ManageAdminsButton";
import { ProfilePictureButton } from "@/components/layouts/org_page/ProfilePictureButton";
import { EventModal } from "@/components/layouts/settings/EventModal";
import {  OrganizationDTO, HighlightDTO } from "../types/orgAdmin";


interface FileUploadResponse {
    success: boolean;
    base64Data?: string;
    error?: string;
}

const OrgPageAdmin = () => {
    const { orgId } = useParams<{ orgId: string }>();
    const [orgData, setOrgData] = useState<OrganizationDTO>({
        orgId: 0,
        orgDetails: {
            name: '',
            email: '',
            collegeName: '',
            socials: {
                facebook: '',
                instagram: '',
                linkedin: ''
            }
        },
        name: '',
        collegeId: 0,
        email: '',
        description: '',
        classification: '',
        collegeName: '',
        socials: {
            facebook: '',
            instagram: '',
            linkedin: ''
        },
        imageUrl: '',
        headerImageUrl: '',
        isVerified: false,
        followerCount: 0,
        upcomingEvents: [],
        pastEvents: [],
        highlights: [],
        admins: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadOrganizationData = useCallback(async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("Authentication required. Please log in.");
            return;
        }
        try {
            setIsLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();

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
    }, [orgId]);

    useEffect(() => {
        loadOrganizationData();
    }, [loadOrganizationData]);

    const handleUpdateDescription = async (newDescription: string) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/description`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDescription),
                }
            );

            if (response.ok) {
                setOrgData(prev => prev ? { ...prev, description: newDescription } : prev);
                setError(null);
            }
        } catch (error) {
            setError("Failed to update description");
            console.error(error);
        }
    };

    const handleUpdateSocials = async (socials: {
        facebook?: string,
        instagram?: string,
        linkedin?: string
    }) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/socials`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([{ 
                        facebook: socials.facebook || "",
                        instagram: socials.instagram || "",
                        linkedin: socials.linkedin || ""
                    }])
                }
            );

            if (response.ok) {
                setOrgData(prev => prev ? {
                    ...prev,
                    orgDetails: {
                        ...prev.orgDetails,
                        socials: { ...prev.orgDetails.socials, ...socials }
                    }
                } : prev);
                setError(null);
            }
        } catch (error) {
            setError("Failed to update social media links");
            console.error(error);
        }
    };

    const handleSaveLogo = async (base64String: string) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/logo`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image: base64String }),
                }
            );

            if (response.ok) await loadOrganizationData();
        } catch (error) {
            setError("Failed to update logo");
        }
    };

    const handleSaveHeader = async (base64String: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/header`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      }
    );

    if (response.ok) await loadOrganizationData();
  } catch (error) {
    setError("Failed to update header");
  }
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
            const form = new FormData();

             Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'picture' && value !== null && value !== undefined) {
                form.append(key, value.toString());
            }
        });

        // Handle file separately
        if (formData.picture) {
            form.append('Picture', formData.picture);
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/events`,
            {
                method: "POST",
                body: form
            }
        );

        if (response.ok) {
            await loadOrganizationData();
            setIsModalOpen(false);
            setError(null);
        }
    } catch (error) {
        setError("Failed to create event");
        console.error(error);
    }
};

    const handleUpdateAdmins = async (newAdmins: any[]) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/admins`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newAdmins),
                }
            );

            if (response.ok) {
                setOrgData(prev => prev ? { ...prev, admins: newAdmins } : prev);
                setError(null);
            }
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
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/details`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(details),
                }
            );

            if (response.ok) {
                setOrgData(prev => prev ? {
                    ...prev,
                    name: details.organization,
                    collegeName: details.college,
                    email: details.email
                } : prev);
                setError(null);
            }
        } catch (error) {
            setError("Failed to update organization details");
            console.error(error);
        }
    };

    const handleUpdateHighlights = async (highlightsData: HighlightDTO[]) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Admin/${orgId}/highlights`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(highlightsData),
                },
            );

            if (response.ok) {
                const data = await response.json();
                console.log('Update successful:', data);
            }
        } catch (error) {
            console.error('Failed to update highlights:', error);
        }
    };

    const convertFileToBase64 = async (file: File | null): Promise<FileUploadResponse> => {
        if (!file) {
            return {
                success: false,
                error: "No file provided"
            };
        }

        try {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                return {
                    success: false,
                    error: "File must be an image"
                };
            }

            return new Promise((resolve) => {
                const reader = new FileReader();

                reader.onload = () => {
                    if (typeof reader.result === "string") {
                        // Extract only the Base64 data part
                        const base64Data = reader.result.split(",")[1];
                        resolve({
                            success: true,
                            base64Data
                        });
                    } else {
                        resolve({
                            success: false,
                            error: "Failed to read file as Base64"
                        });
                    }
                };

                reader.onerror = () => {
                    resolve({
                        success: false,
                        error: "Error reading file"
                    });
                };

                reader.readAsDataURL(file);
            });
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred"
            };
        }
    };
    const handleSavePictures = async (logoFile: File | null, headerFile: File | null) => {
        try {
            if (logoFile) {
                const logoResult = await convertFileToBase64(logoFile);
                if (logoResult.success && logoResult.base64Data) {
                    await handleSaveLogo(logoResult.base64Data);
                } else {
                    console.error("Logo upload failed:", logoResult.error);
                    // Consider setting the error state here
                    setError(`Logo upload failed: ${logoResult.error}`);
                }
            }

            if (headerFile) {
                const headerResult = await convertFileToBase64(headerFile);
                if (headerResult.success && headerResult.base64Data) {
                    await handleSaveHeader(headerResult.base64Data);
                } else {
                    console.error("Header upload failed:", headerResult.error);
                    // Consider setting the error state here
                    setError(`Header upload failed: ${headerResult.error}`);
                }
            }

            await loadOrganizationData(); // Refresh the data after successful upload
            return true;
        } catch (error) {
            console.error("Error uploading images:", error);
            setError("Failed to upload images. Please try again.");
            return false;
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
                                    onSavePictures={handleSavePictures}
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
                                orgData.upcomingEvents.map((event) => (
                                    <div className="flex items-center space-x-4" key={event.eventId}>
                                        <img
                                            src={event.imageUrl}
                                            alt={event.eventName}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{event.eventName}</h3>
                                            <p>{event.eventDetails}</p>
                                            <p>When: {event.when}</p>
                                            <p>Where: {event.platform} - {event.location}</p>
                                            <p>RSVPs: {event.rsvpCount}</p>
                                        </div>
                                    </div>
                                ))) : (
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
                                socials: orgData.socials
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