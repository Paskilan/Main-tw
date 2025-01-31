import axios from 'axios';

const api = axios.create({
    baseURL: '/api/orgs',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const OrgAPI = {
    getAdminOrgs: async () => {
        const response = await api.get('/orgDisplay');
        return response.data;
    },

    getOrgDetails: async (orgId: number) => {
        const response = await api.get(`/${orgId}`);
        return response.data;
    },

    createOrg: async (createOrgDto: CreateOrgDto) => {
        const response = await api.post('/create', createOrgDto);
        return response.data;
    },
};

type CreateOrgDto = {
    OrgName: string;
    Description: string;
    CollegeId: number;
    Email: string;
    ImageBase64: string;
    Classification: string;
    Verified: boolean;
    ControlNumber?: string;
};