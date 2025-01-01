import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import PictureUploaderInput from "@/components/commons/PictureUploaderInput"


export default function ManageGroupModal() {
    return (

        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new group</DialogTitle>
                <DialogDescription>Manage your group settings</DialogDescription>
            </DialogHeader>
            <PictureUploaderInput />
        </DialogContent>
    )
}