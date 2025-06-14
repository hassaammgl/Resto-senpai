import { FileUpload } from "@/components/ui/file-upload";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import React, { useState, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { UploadIcon, WebcamIcon, RefreshCw } from "lucide-react";
import Webcam from "react-webcam";

const ImageUploader = () => {
	const [useCamera, setUseCamera] = useState(false);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);

	const handleFileChange = (files: File[]) => {
		setImageFile(files && files.length > 0 ? files[0] : null);
	};

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!imageFile) {
			alert("Please select an image first");
			return;
		}
		// Upload logic here
		console.log("Uploading file:", imageFile);
		// Reset after upload
		setImageFile(null);
		setIsCapturing(false);
	};

	const toggleUseCamera = () => {
		setImageFile(null);
		setIsCapturing(false);
		setUseCamera((prev) => !prev);
	};

	return (
		<Card className="max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Upload Image</CardTitle>
				<CardDescription>
					Upload an image from your device or use your webcam
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<UploadIcon
							className={
								!useCamera ? "text-primary" : "text-muted"
							}
						/>
						<Switch
							checked={useCamera}
							onCheckedChange={toggleUseCamera}
							id="upload-mode"
						/>
						<WebcamIcon
							className={
								useCamera ? "text-primary" : "text-muted"
							}
						/>
					</div>
					<Label htmlFor="upload-mode">
						{useCamera ? "Camera" : "File Upload"}
					</Label>
				</div>

				<div className="min-h-[300px] border rounded-md flex flex-col items-center justify-center p-4">
					{useCamera ? (
						<WebcamUpload
							onCapture={setImageFile}
							isCapturing={isCapturing}
							setIsCapturing={setIsCapturing}
						/>
					) : (
						<FileUpload onChange={handleFileChange} />
					)}

					{imageFile && (
						<div className="mt-4 text-center">
							<p className="text-sm text-muted-foreground">
								Selected: {imageFile.name}
							</p>
							<img
								src={URL.createObjectURL(imageFile)}
								alt="Preview"
								className="mt-2 max-h-40 object-contain"
							/>
						</div>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button
					variant="outline"
					onClick={() => {
						setImageFile(null);
						setIsCapturing(false);
					}}
					disabled={!imageFile}
				>
					Clear
				</Button>
				<Button onClick={handleUpload} disabled={!imageFile}>
					Upload
				</Button>
			</CardFooter>
		</Card>
	);
};

interface WebcamUploadProps {
	onCapture: (file: File) => void;
	isCapturing: boolean;
	setIsCapturing: (state: boolean) => void;
}

const WebcamUpload = ({
	onCapture,
	isCapturing,
	setIsCapturing,
}: WebcamUploadProps) => {
	const webcamRef = useRef<Webcam>(null);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			setCapturedImage(imageSrc);
			setIsCapturing(false);

			// Convert data URL to File object
			const byteString = atob(imageSrc.split(",")[1]);
			const mimeString = imageSrc
				.split(",")[0]
				.split(":")[1]
				.split(";")[0];
			const ab = new ArrayBuffer(byteString.length);
			const ia = new Uint8Array(ab);
			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			const blob = new Blob([ab], { type: mimeString });
			const file = new File([blob], `webcam-capture-${Date.now()}.jpg`, {
				type: mimeString,
			});

			onCapture(file);
		}
	}, [onCapture, setIsCapturing]);

	const retake = () => {
		setCapturedImage(null);
		setIsCapturing(true);
	};

	return (
		<div className="w-full flex flex-col items-center">
			{capturedImage ? (
				<div className="flex flex-col items-center">
					<img
						src={capturedImage}
						alt="Captured"
						className="max-h-64 object-contain rounded-md"
					/>
					<Button onClick={retake} className="mt-4" variant="outline">
						<RefreshCw className="mr-2 h-4 w-4" />
						Retake Photo
					</Button>
				</div>
			) : (
				<div className="flex flex-col items-center">
					<div className="relative">
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/jpeg"
							width={320}
							height={240}
							videoConstraints={{ facingMode: "user" }}
							mirrored={true}
							className="rounded-md border"
						/>
						{!isCapturing && (
							<div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
								<Button onClick={() => setIsCapturing(true)}>
									Start Camera
								</Button>
							</div>
						)}
					</div>

					{isCapturing && (
						<Button onClick={capture} className="mt-4">
							Capture Photo
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export default ImageUploader;
