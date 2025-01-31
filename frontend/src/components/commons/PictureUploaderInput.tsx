import { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import { ImagePlus, X, ZoomIn, ZoomOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type PixelCrop = {

    x: number
    y: number
    width: number
    height: number
}
interface PictureUploaderInputProps {
    onChange?: (file: File | null) => void
}

export const PictureUploaderInput = ({ onChange }: PictureUploaderInputProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isCropModalOpen, setCropModalOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setCropModalOpen(true);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    
    const getCroppedImage = (
        imageSrc: string,
        croppedAreaPixels: PixelCrop
    ): Promise<string> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('No 2d context'));
                    return;
                }

                canvas.width = croppedAreaPixels.width;
                canvas.height = croppedAreaPixels.height;

                ctx.drawImage(
                    image,
                    croppedAreaPixels.x,
                    croppedAreaPixels.y,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height,
                    0,
                    0,
                    croppedAreaPixels.width,
                    croppedAreaPixels.height
                );

                resolve(canvas.toDataURL('image/jpeg'));
            });

            image.addEventListener('error', () => reject(new Error('Image load error')));
            image.src = imageSrc;
        });
    };

    const handleCropConfirm = async () => {
        if (!selectedImage || !croppedAreaPixels) return;

        try {
            const croppedDataUrl = await getCroppedImage(selectedImage, croppedAreaPixels);
            const blob = await fetch(croppedDataUrl).then((r) => r.blob());
            const file = new File([blob], "profile.jpg", { type: "image/jpeg" });

            setCroppedImage(croppedDataUrl);
            setCropModalOpen(false);
            onChange?.(file);
        } catch (error) {
            console.error("Cropping failed:", error);
            onChange?.(null);
        }
    };

    return (
        <div className="w-full max-w-xs text-center">
            <div className="relative w-48 h-48 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {croppedImage ? (
                    <div className="relative w-full h-full">
                        <img
                            src={croppedImage}
                            alt="Cropped preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={() => {
                                setCroppedImage(null);
                                onChange?.(null); // Clear the image in parent
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-500 flex flex-col items-center">
                        <ImagePlus size={48} />
                        <span className="mt-2 text-sm font-medium">Upload your photo</span>
                    </div>
                )}
                <input
                    aria-label="Upload profile picture"
                    ref={fileInputRef}
                    type="file"
                    name="profilePicture" // Added for form handling
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer z-0"
                    onChange={handleImageChange}
                />
            </div>

            <Dialog open={isCropModalOpen} onOpenChange={setCropModalOpen}>
                <DialogContent className="w-full max-w-md">
                    <DialogHeader>
                        <DialogTitle>Crop Your Photo</DialogTitle>
                    </DialogHeader>
                    <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                        {selectedImage && (
                            <Cropper
                                image={selectedImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="rect"
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(croppedArea, croppedAreaPixels) => {
                                    setCroppedAreaPixels(croppedAreaPixels);
                                }}
                            />
                        )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => setZoom((prev) => Math.max(prev - 0.1, 1))}
                                disabled={zoom <= 1}
                            >
                                <ZoomOut size={16} />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setZoom((prev) => Math.min(prev + 0.1, 3))}
                                disabled={zoom >= 3}
                            >
                                <ZoomIn size={16} />
                            </Button>
                            <span className="text-sm text-gray-500">Zoom: {zoom.toFixed(1)}x</span>
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" onClick={() => setCropModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button className="bg-pup-maroon2 hover:bg-pup-maroon1" onClick={handleCropConfirm}>
                                Crop
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};