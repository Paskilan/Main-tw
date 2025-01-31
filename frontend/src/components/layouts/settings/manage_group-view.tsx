import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupModal from "@/components/layouts/settings/CreateGroupModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface Group {
    id: number;
    name: string;
    imageUrl: string;
}

export default function ManageGroup() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/orgs/orgDisplay`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    const handleNewGroup = (newGroup: Group) => {
        setGroups(prevGroups => [...prevGroups, newGroup]);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        setIsDialogOpen(false);
    };

    const handleOrgClick = (orgId: number) => {
        navigate(`/org/AdminView/${orgId}`);
    };

    return (
        <div>
            <div className='flex flex-col gap-8 mb-8'>
                <h1 className='text-5xl font-extrabold text-pup-maroon2 tracking-tight'>
                    Create a Group?
                </h1>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="font-bold text-xl w-48 py-3 rounded-lg bg-pup-maroon2 hover:bg-pup-maroon2 transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
                            Click Here
                        </Button>
                    </DialogTrigger>
                    <CreateGroupModal onNewGroup={handleNewGroup} />
                </Dialog>
            </div>

            <h1 className='text-4xl font-semibold text-pup-maroon2 tracking-tight mb-6'>
                Your Groups
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groups.map(group => (
                    <button
                        key={group.id}
                        onClick={() => handleOrgClick(group.id)}
                        className="p-4 bg-white rounded-lg shadow-md text-left flex flex-col items-center gap-4 w-full h-full transform transition-transform hover:scale-105 hover:shadow-xl"
                    >
                        <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-pup-maroon2">
                            <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center">
                            <h2 className="text-2xl font-bold text-pup-maroon2 truncate">{group.name}</h2>
                        </div>
                    </button>
                ))}
            </div>

            {showNotification && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Alert variant="default" className="bg-white w-64">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Group created successfully!</AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}