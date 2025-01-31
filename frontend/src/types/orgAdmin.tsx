

export interface OrganizationDTO {
    orgId: number;
    orgDetails: {
        name: string;
        email: string;
        collegeName: string;
        socials: {
            facebook?: string;
            instagram?: string;
            linkedin?: string;
        };
    }
    name: string;
    description: string;
    email: string;
    classification: string;
    collegeId?: number;
    controlNumber?: string;
    isVerified: boolean;
    imageUrl: string;
    headerImageUrl?: string;
    followerCount: number;
    collegeName: string;
    socials: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    };
    upcomingEvents: EventDTO[];
    pastEvents: EventDTO[];
    highlights: OrgHighlightDTO[];
    orgHeads: OrgHeadDTO[];
    admins: AdminDTO[];
}

export interface EventCreateDTO {
    eventName: string;
    when: string;  // ISO date string
    platform: string;
    location: string;
    participantsCount: string;
    eventDetails: string;
    topic: string;
    exclusivity: 'uniwide' | 'college';
    picture: File | null;
    organizer: string;
    host: string;
    freeOrPaid: 'free' | 'paid';
    cost?: string;
}

export interface ImageUploadResponse {
    imageUrl: string;
    message: string;
}

export interface ApiResponse<T> {
    data?: T;
    message: string;
    error?: string;
}
export interface EventDTO {
    eventId: number;
    title: string;
    description: string;
    date: string;
    mode: string;
    location: string;
    host: string;
    imageUrl: string;
    rsvpCount: number;
    registration: string;
}

export interface OrgHighlightDTO {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface OrgHeadDTO {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
}

export interface AdminDTO {
    studentId: number;
    name: string;
    email: string;
}

export const transformEventData = (formData: EventCreateDTO) => ({
    EventName: formData.eventName,
    When: formData.when,
    Platform: formData.platform,
    Location: formData.location,
    ParticipantsCount: formData.participantsCount,
    EventDetails: formData.eventDetails,
    Topic: formData.topic,
    Exclusivity: formData.exclusivity,
    Host: formData.host,
    FreeOrPaid: formData.freeOrPaid,
    Cost: formData.cost
});
