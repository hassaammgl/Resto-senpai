import React, { useRef, useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";

const ImageUploader = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const webcamRef = useRef<Webcam>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
			setImagePreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	const capture = () => {
		const imageSrc = webcamRef.current?.getScreenshot();
		if (imageSrc) {
			fetch(imageSrc)
				.then((res) => res.blob())
				.then((blob) => {
					const file = new File([blob], "webcam-image.jpg", {
						type: "image/jpeg",
					});
					setSelectedFile(file);
					setImagePreview(imageSrc);
				});
		}
	};

	const handleUpload = async () => {
		// if (!selectedFile) return alert("Please select or capture an image.");

		// const formData = new FormData();
		// formData.append("image", selectedFile);

		// try {
		// 	const res = await axios.post(
		// 		"http://localhost:5000/upload",
		// 		formData,
		// 		{
		// 			headers: { "Content-Type": "multipart/form-data" },
		// 		}
		// 	);
		// 	alert("Image uploaded! URL: " + res.data.url);
		// } catch (error) {
		// 	console.error(error);
		// 	alert("Upload failed.");
		// }
	};

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<h1 className="text-2xl font-bold">Upload or Capture Image</h1>

			<input type="file" accept="image/*" onChange={handleFileChange} />

			<div className="w-[300px] h-[300px] border border-gray-400">
				<Webcam
					audio={false}
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					width={300}
					height={300}
				/>
				<button
					className="mt-2 bg-blue-500 text-white p-2 rounded"
					onClick={capture}
				>
					Capture from Camera
				</button>
			</div>

			{imagePreview && (
				<img
					src={imagePreview}
					alt="Preview"
					className="w-[300px] h-[300px] object-cover"
				/>
			)}

			<button
				className="mt-4 bg-green-500 text-white p-2 rounded"
				onClick={handleUpload}
			>
				Upload Image
			</button>
		</div>
	);
};

export default ImageUploader;
