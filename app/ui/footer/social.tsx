// React component for social media links
'use client';

import { 
    FaFacebook, 
    FaInstagram, 
    FaYoutube, 
    FaTwitter, 
    FaLinkedin,
    FaTiktok
} from 'react-icons/fa';

export const enumPlatforms = {
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube",
    twitter: "twitter",  // Added for future use
    linkedin: "linkedin", // Added for future use
    tiktok: "tiktok"      // Added for future use
};

interface SocialProps {
    platform: keyof typeof enumPlatforms;
    username: string;
    size?: number;
    className?: string;
}

export default function Social({ platform, username, size = 24, className = "" }: SocialProps) {
    // Generate the correct URL based on the platform
    const getUrl = () => {
        switch(platform) {
            case 'youtube':
                return `https://www.youtube.com/${username}`;
            default:
                return `https://www.${platform}.com/${username}`;
        }
    };

    // Select the appropriate icon based on the platform
    const renderIcon = () => {
        switch(platform) {
            case 'facebook':
                return <FaFacebook size={size} />;
            case 'instagram':
                return <FaInstagram size={size} />;
            case 'youtube':
                return <FaYoutube size={size} />;
            case 'twitter':
                return <FaTwitter size={size} />;
            case 'linkedin':
                return <FaLinkedin size={size} />;
            case 'tiktok':
                return <FaTiktok size={size} />;
            default:
                return null;
        }
    };

    return (
        <a
            href={getUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-creoSkin-100 hover:text-creoSkin-300 transition-colors ${className}`}
            aria-label={`Visit Creolitos on ${platform}`}
        >
            {renderIcon()}
            {/* <span className="capitalize">{platform}</span> */}
        </a>
    );
}
