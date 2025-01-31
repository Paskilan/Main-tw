import axios, { AxiosError } from 'axios';
import {
    EventCreateDTO,
    ApiResponse,
    ImageUploadResponse,
    transformEventData,
    OrganizationDTO,
    AdminDTO,
    HighlightDTO
} from '../types/orgAdmin';

class OrgAdminService {
    private readonly baseUrl: string;
    private readonly maxRetries = 3;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }

    private getHeaders(isMultipart = false) {
        const token = localStorage.getItem("authToken");
        const headers: Record<string, string> = {
            Authorization: `Bearer ${token || ''}`
        };

        if (!isMultipart) {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    private async request<T>(
        method: string,
        endpoint: string,
        data?: any,
        isMultipart = false,
        retryCount = 0
    ): Promise<ApiResponse<T>> {
        try {
            const response = await axios({
                method,
                url: `${this.baseUrl}${endpoint}`,
                data,
                headers: this.getHeaders(isMultipart)
            });

            return {
                data: response.data,
                message: 'Success'
            };
        } catch (error) {
            if (error instanceof AxiosError && retryCount < this.maxRetries) {
                return this.request(method, endpoint, data, isMultipart, retryCount + 1);
            }

            return {
                message: 'Error',
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }

    async getOrganizationDetails(orgId: number): Promise<ApiResponse<OrganizationDTO>> {
        return this.request('GET', `api/Admin/${orgId}`);
    }

    async uploadImage(
        orgId: number,
        type: 'logo' | 'header',
        file: string
    ): Promise<ApiResponse<ImageUploadResponse>> {
        const formData = new FormData();
        formData.append('file', file);

        return this.request(
            'PUT',
            `/api/Admin/${orgId}/${type}`,
            formData,
            true
        );
    }

    async createEvent(
        orgId: number,
        eventData: EventCreateDTO
    ): Promise<ApiResponse<void>> {
        const transformedData = transformEventData(eventData);
        const formData = new FormData();

        if (eventData.imageUrl) {
            formData.append('picture', eventData.imageUrl);
        }

        Object.entries(transformedData).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        return this.request(
            'POST',
            `/api/Admin/${orgId}/events`,
            formData,
            true
        );
    }

    async updateDescription(
        orgId: number,
        description: string
    ): Promise<ApiResponse<void>> {
        return this.request(
            'PUT',
            `/api/Admin/${orgId}/description`,
            { description }
        );
    }

    async updateImages(
        orgId: number,
        imageData: { logo?: File; header?: File }
    ): Promise<ApiResponse<void>> {
        const formData = new FormData();

        if (imageData.logo) {
            formData.append('logo', imageData.logo);
        }

        if (imageData.header) {
            formData.append('header', imageData.header);
        }

        return this.request(
            'PUT',
            `/api/Admin/${orgId}/images`,
            formData,
            true
        );
    }

    async updateHighlights(
        orgId: number,
        highlights: HighlightDTO[]
    ): Promise<ApiResponse<void>> {
        return this.request(
            'PUT',
            `/api/Admin/${orgId}/highlights`,
            { highlights }
        );
    }

    async updateAdmins(
        orgId: number,
        admins: AdminDTO[]
    ): Promise<ApiResponse<void>> {
        return this.request(
            'PUT',
            `/api/Admin/${orgId}/admins`,
            { admins }
        );
    }
}

export default new OrgAdminService();