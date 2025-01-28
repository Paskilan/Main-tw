export interface BaseProfileProps {
    firstName: string;
    lastName: string;
    email?: string;
}

export interface ProfileSettingsViewProps extends BaseProfileProps {
    onEdit: () => void;
    college?: string;
    profilePicture?: string;
}

export interface RegisterViewProps extends BaseProfileProps {
    onSubmit: (data: RegisterFormData) => void;
    colleges: CollegeOption[];
}

export interface CollegeOption {
    value: string;
    label: string;
}

export interface RegisterFormData extends BaseProfileProps {
    collegeId: string;
    password: string;
}