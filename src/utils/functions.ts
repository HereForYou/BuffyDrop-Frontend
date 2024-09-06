import { BOT_TOKEN } from "../data";

const slicFunc = (username: string) => {
    if (username.length < 9) return username;
    return (username.slice(0, 8) + '..');
}

const convertToShorthand = (number: number) => {
    if (number >= 1000000) {
        return Math.floor(number / 1000000) + 'M+';
    }
    else if (number >= 1000) {
        return Math.floor(number / 1000) + 'K+';
    }
    else {
        return (number.toFixed(2)).toString();
    }
}

const formatNumberWithCommas = (number: number, locale = "en-US") => {
    return new Intl.NumberFormat(locale).format(number);
}

async function getUserAvatarUrl(userId: string) {
    try {
        const profilePhotosResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}`);
        const profilePhotosData = await profilePhotosResponse.json();
        if (profilePhotosData.ok && profilePhotosData.result.total_count > 0) {
            const fileId = profilePhotosData.result.photos[0].pop().file_id;
            const fileResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
            const fileData = await fileResponse.json();
            if (fileData.ok) {
                const filePath = fileData.result.file_path;
                const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
                return fileUrl;  // Return the photo URL
            } else {
                return null;
            }
        } else {
            // throw new Error('User has no profile photos.');
            return null;
        }
    } catch (error) {
        console.error("Error fetching user's avatar URL:", error);
        return null;
    }
}

export { slicFunc, convertToShorthand, formatNumberWithCommas, getUserAvatarUrl };
