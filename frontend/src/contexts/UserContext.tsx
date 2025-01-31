// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  collegeName: string;
  collegeId: number;
  profilePicture: string; // This will be a base64 string
}

// interface ApiResponse {
//   result: Record<string, unknown>;
//   value: UserProfile;
// }

interface UserContextType {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    console.log('[UserContext] Fetching user profile...');
  
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('No auth token found');
      }
  
      console.log('[UserContext] Using auth token:', authToken);
  
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/account/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
  
      console.log('[UserContext] Full API Response:', response);
      console.log('[UserContext] API Response Data:', response.data);
  
      // Fix: Use response.data.data instead of response.data.value
      if (!response.data || !response.data.data) {
        console.error('[UserContext] Unexpected API response format:', response.data);
        throw new Error('Invalid API response structure');
      }

      // Check if profile picture exists and format it correctly (base64)
      const profileData = response.data.data;
      const profileWithPicture = {
        ...profileData,
        profilePicture: profileData.profilePicture
          ? `data:image/jpeg;base64,${profileData.profilePicture}`
          : '', // Default to empty string if no profile picture
      };
  
      console.log('[UserContext] Extracted Profile Data:', profileWithPicture);
  
      setProfile(profileWithPicture); // Set the profile with formatted picture
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      setError(errorMessage);
      setProfile(null);
  
      console.error('[UserContext] Error fetching profile:', errorMessage);
    } finally {
      setLoading(false);
      console.log('[UserContext] Fetching profile completed.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refreshProfile = async () => {
    console.log('[UserContext] Refreshing profile...');
    setLoading(true);
    await fetchProfile();
  };

  return (
    <UserContext.Provider value={{ profile, loading, error, refreshProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
