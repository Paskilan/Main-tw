import { useState, useEffect } from 'react';
import { OrganizationDTO, EventDTO, AdminDTO, OrgHighlightDTO } from '@/types/orgAdmin';
import OrgAdminService from '../Wrapper/orgAdminService';

export function useOrgAdmin(orgId: number) {
    const [orgData, setOrgData] = useState<OrganizationDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrganizationData = async () => {
        try {
            setIsLoading(true);
            const data = await OrgAdminService.getOrganizationDetails(orgId);
            setOrgData(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load organization data");
        } finally {
            setIsLoading(false);
        }
    };

    const updateDescription = async (description: string) => {
        try {
            await OrgAdminService.updateDescription(orgId, description);
            setOrgData(prev => prev ? { ...prev, description } : null);
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to update description");
        }
    };

    const updateImages = async (imageData: { logo?: File; header?: File }) => {
        try {
            await OrgAdminService.updateImages(orgId, imageData);
            // Assuming backend updates image URLs in the organization data
            loadOrganizationData(); // Reload to reflect changes
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to update images");
        }
    };

    const updateHighlights = async (highlights: OrgHighlightDTO[]) => {
        try {
            await OrgAdminService.updateHighlights(orgId, highlights);
            setOrgData(prev => prev ? { ...prev, highlights } : null);
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to update highlights");
        }
    };

    const createEvent = async (eventData: EventDTO) => {
        try {
            await OrgAdminService.createEvent(orgId, eventData);
            loadOrganizationData(); // Refresh organization data after adding an event
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to create event");
        }
    };

    const updateAdmins = async (admins: AdminDTO[]) => {
        try {
            await OrgAdminService.updateAdmins(orgId, admins);
            setOrgData(prev => prev ? { ...prev, admins } : null);
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to update admins");
        }
    };

    useEffect(() => {
        loadOrganizationData();
    }, [orgId]);

    return {
        orgData,
        isLoading,
        error,
        updateDescription,
        updateImages,
        updateHighlights,
        createEvent,
        updateAdmins,
    };
}