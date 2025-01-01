
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateGroupModal from "@/components/layouts/settings/CreateGroupModal";

export default function ManageGroup() {
    return (
        <div>
            <div className='flex flex-col gap-3'>
                <h1 className='flex-1 font-semibold text-3xl text-shadow-sm shadow-gray-900 text-pup-maroon2 tracking-tighter'
                >
                    Create a Group?
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="
                    font-bold text-3xl w-[198px] h-[63px] rounded-3xl
                    bg-pup-maroon2 hover:bg-pup-maroon2
                "
                        >Click Here</Button>
                    </DialogTrigger>
                    <CreateGroupModal />
                </Dialog>
            </div>

            <h1 className='font-semibold text-3xl text-shadow-sm shadow-gray-900 text-pup-maroon2 tracking-tighter'
            >
                Your Groups
            </h1>
        </div>
    );
}