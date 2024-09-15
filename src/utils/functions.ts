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

// const formatNumberWithCommas = (number: number, locale = "en-US") => {
//     return new Intl.NumberFormat(locale).format(number);
// }

// const formatNumberWithCommas = (number: number, locale = "en-US") => {
//     return new Intl.NumberFormat(locale, {
//         minimumFractionDigits: 4, // Minimum number of decimal places
//         maximumFractionDigits: 4  // Maximum number of decimal places
//     }).format(number);
// }

function formatNumberWithCommas(number: number) {
    if (number === undefined || number === null) {
        return "Invalid number"; // Handle undefined or null input
    }

    // Check if the input is a valid number
    if (typeof number !== 'number' || isNaN(number)) {
        return "Invalid number"; // Handle non-number types
    }

    // Check if the number is an integer
    if (Number.isInteger(number)) {
        // If the number is an integer, format with commas
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        // If the number is a float, check the decimal places
        const decimalPlaces = (number.toString().split('.')[1] || '').length;

        if (decimalPlaces < 4) {
            // If there are less than four decimal places, return it as is
            return number.toString();
        } else {
            // If there are four or more decimal places, round it to four decimal places and format with commas
            return Number(number.toFixed(4)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
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
