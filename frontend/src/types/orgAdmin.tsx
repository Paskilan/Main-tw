export interface OrganizationDTO {
    orgId: number;
    orgDetails: OrgDetailsDTO;
    name: string;
    collegeId: number;
    email: string;
    description: string;
    classification: string;
    collegeName: string;
    socials: SocialMediaDTO;
    imageUrl: string;
    headerImageUrl: string;
    isVerified: boolean;
    followerCount: number;
    upcomingEvents: EventDTO[];
    pastEvents: EventDTO[];
    highlights: HighlightDTO[];
    admins: AdminDTO[];
}

export interface OrgDetailsDTO {
    name: string;
    email: string;
    collegeName: string;
    socials: SocialMediaDTO;
}

export interface EventCreateDTO {
    eventName: string;
    when: string;
    where: string;
    platform: string;
    location: string;
    participantsCount: string;
    eventDetails: string;
    topic: string;
    exclusivity: string;
    imageUrl: string;
    organizer: string;
    host: string;
    registrationLink: string;
    freeOrPaid: string;
    cost: string;
}

export interface SocialMediaDTO {
    facebook: string;
    instagram: string;
    linkedin: string;
}

export interface EventDTO {
    eventId: number;
    eventName: string;
    when: string;
    where: string;
    platform: string;
    location: string;
    participantsCount: string;
    eventDetails: string;
    topic: string;
    exclusivity: string;
    imageUrl: string;
    organizer: string;
    host: string;
    freeOrPaid: string;
    registrationLink: string;
    cost: string;
    rsvpCount: number;
}

export interface HighlightDTO {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface AdminDTO {
    studentId: number;
    name: string;
    email: string;
}

export interface AdminUpdateDTO {
    admins: AdminDTO[];
}

export interface HighlightUpdateDTO {
    highlights: HighlightDTO[];
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