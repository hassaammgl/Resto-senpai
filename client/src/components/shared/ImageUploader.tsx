import { FileUpload } from "@/components/ui/file-upload";
import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardContent,
	CardDescription,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UploadIcon, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";

const ImageUploader = () => {
	const [useCamera, setUseCamera] = useState(false);
	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Upload Image</CardTitle>
				<CardDescription>
					You can upload image from your device or also use your
					webcam for it.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex">
					<span>Upload via: </span>
					<span className="flex mx-4 gap-4">
						<UploadIcon
							className={
								useCamera ? "text-white/50" : `text-amber-500`
							}
						/>
						<Switch onClick={() => setUseCamera((prev) => !prev)} />
						<WebcamIcon
							className={
								useCamera ? `text-amber-500` : "text-white/50"
							}
						/>
					</span>
				</div>
				<div>
					{useCamera && <WebcamUpload />}
					{!useCamera && <FileUpload />}
				</div>
			</CardContent>
			<CardFooter>
				<Button onClick={handleUpload}>Upload</Button>
			</CardFooter>
		</Card>
	);
};

// const videoConstraints = {
// 	width: 1280,
// 	height: 720,
// 	facingMode: "user",
// };

const WebcamUpload = () => {
	const webcamRef = React.useRef(null);
	// const capture = React.useCallback(() => {
	// 	const imageSrc = webcamRef.current.getScreenshot();
	// 	console.log(imgsrc);
	// }, [webcamRef]);
	return (
		<>
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={300}
				height={300}
			/>
			<button
				className="mt-2 bg-blue-500 text-white p-2 rounded"
				// onClick={capture}
			>
				Capture from Camera
			</button>
		</>
	);
};

export default ImageUploader;
