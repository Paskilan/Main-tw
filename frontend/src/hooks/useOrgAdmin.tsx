import { useState, useEffect } from 'react';
import { OrganizationDTO, EventDTO, AdminDTO, HighlightDTO,  EventCreateDTO } from '@/types/orgAdmin';
import OrgAdminService from '../Wrapper/orgAdminService';
import { useParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useOrgAdmin() {
    const { orgId } = useParams<{ orgId: string }>();
    const [orgData, setOrgData] = useState<OrganizationDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const parsedOrgId = orgId ? parseInt(orgId, 10) : null;

    const loadOrganizationData = useCallback(async () => {
        if (!parsedOrgId) {
            setError("Invalid organization ID");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const data = await OrgAdminService.getOrganizationDetails(parsedOrgId);
            if (data && data.data) {
                setOrgData(data.data);
            } else {
                setOrgData(null);
            }
            setError(null);
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : "Failed to load organization data";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [parsedOrgId, setError, setIsLoading, setOrgData]);

    const updateDescription = async (description: string) => {
        if (!parsedOrgId) {
            throw new Error("Invalid organization ID");
        }

        try {
            await OrgAdminService.updateDescription(parsedOrgId, description);
            setOrgData(prev => prev ? { ...prev, description } : null);
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : "Failed to update description";
            throw new Error(errorMessage);
        }
    };

    const updateLogo = async (logoUrl: string) => {
        if (!parsedOrgId) {
            throw new Error("Invalid organization ID");
        }
        try {
            await OrgAdminService.uploadImage(parsedOrgId, 'logo', logoUrl);
            await loadOrganizationData();
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : "Failed to update logo";
            throw new Error(errorMessage);
        }
    };

    const updateHeader = async (headerImageUrl: string) => {
        if (!parsedOrgId) {
            throw new Error("Invalid organization ID");
        }
        try {
            await OrgAdminService.uploadImage(parsedOrgId, 'header', headerImageUrl);
            await loadOrganizationData();
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : "Failed to update header";
            throw new Error(errorMessage);
        }
    };

    const updateHighlights = async (highlights: HighlightDTO[]) => {
        if (!parsedOrgId) {
            throw new Error("Invalid organization ID");
        }
        try {
            await OrgAdminService.updateHighlights(parsedOrgId, highlights);
            await loadOrganizationData();
            setOrgData(prev => prev ? { ...prev, highlights } : null);
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to update highlights");
        }
    };

    const createEvent = async (eventData: EventDTO) => {
        if (!parsedOrgId) {
            throw new Error("Invalid organization ID");
        }
        try {
            const eventCreateData: EventCreateDTO = {
                ...eventData,
                eventName: eventData.eventName,
                when: eventData.when,
                where: eventData.where === 'onsite' || eventData.where === 'online' ? eventData.where : 'onsite',
                platform: eventData.platform,
                imageUrl: eventData.imageUrl, 
            };
            await OrgAdminService.createEvent(parsedOrgId, eventCreateData);
            loadOrganizationData();
        } catch (err) {
            throw err instanceof Error ? err : new Error("Failed to create event");
        }
    };
        const updateAdmins = async (admins: AdminDTO[]) => {
            if (!parsedOrgId) {
                throw new Error("Invalid organization ID");
            }
            try {
                await OrgAdminService.updateAdmins(parsedOrgId, admins);
                await loadOrganizationData();
                setOrgData(prev => prev ? { ...prev, admins } : null);
            } catch (err) {
                throw err instanceof Error ? err : new Error("Failed to update admins");
            }
        }

            useEffect(() => {
                loadOrganizationData();
            }, [parsedOrgId, loadOrganizationData]);

        return {
            orgData,
            isLoading,
            error,
            updateDescription,
            updateLogo,
            updateHeader,
            updateHighlights,
            createEvent,
            updateAdmins,
        };
    }
