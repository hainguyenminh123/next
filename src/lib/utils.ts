import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isVideoUrl(url: string | null): boolean {
	if (!url) return false;
	
	// Check for common video file extensions
	const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.wmv', '.m4v'];
	const lowerUrl = url.toLowerCase();
	
	if (videoExtensions.some(ext => lowerUrl.endsWith(ext))) {
		return true;
	}
	
	// Check for YouTube, Vimeo, or other video hosting patterns
	const videoPatterns = [
		'youtube.com/watch',
		'youtu.be/',
		'vimeo.com/',
		'facebook.com/watch',
		'fb.watch'
	];
	
	if (videoPatterns.some(pattern => lowerUrl.includes(pattern))) {
		return true;
	}
	
	// Check for Supabase storage or other clouds that might not have extension in URL
	// but contain "video" in the path or query
	if (lowerUrl.includes('/video/') || lowerUrl.includes('type=video')) {
		return true;
	}
	
	return false;
}

export function getVideoThumbnail(url: string): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!isVideoUrl(url)) {
			reject('Not a video URL');
			return;
		}
		
		const video = document.createElement('video');
		video.src = url;
		video.preload = 'metadata';
		video.currentTime = 1; // Capture at 1 second
		video.muted = true;
		video.playsInline = true;
		
		video.onloadeddata = () => {
			try {
				const canvas = document.createElement('canvas');
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				const ctx = canvas.getContext('2d');
				ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
				const thumbnailUrl = canvas.toDataURL('image/jpeg');
				resolve(thumbnailUrl);
			} catch (e) {
				reject(e);
			}
		};
		
		video.onerror = (e) => {
			reject(e);
		};
	});
}
