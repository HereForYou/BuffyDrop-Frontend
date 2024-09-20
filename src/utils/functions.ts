import { BOT_TOKEN } from "../data";

const slicFunc = (username: string) => {
  if (username.length < 9) return username;
  return username.slice(0, 8) + "..";
};

const convertToShorthand = (number: number) => {
  if (number >= 1000000) {
    return Math.floor(number / 1000000) + "M+";
  } else if (number >= 1000) {
    return Math.floor(number / 1000) + "K+";
  } else {
    return number.toFixed(2).toString();
  }
};

function formatNumberWithCommas(number: number): string {
  // Handle undefined or null input
  if (
    number === undefined ||
    number === null ||
    typeof number !== "number" ||
    isNaN(number)
  ) {
    return "NaN"; // Return "NaN" for invalid inputs
  }
  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = number.toString().split(".");
  // Format the integer part with commas
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // If there's no decimal part, return the formatted integer
  if (!decimalPart) {
    return formattedInteger;
  }
  // Check the number of decimal places
  if (decimalPart.length < 4) {
    // Return the number with the original decimal part
    return `${formattedInteger}.${decimalPart}`;
  } else {
    // Round to four decimal places
    const roundedNumber = Number(number.toFixed(4));
    const [roundedInteger, roundedDecimal] = roundedNumber
      .toString()
      .split(".");
    return `${roundedInteger.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    )}.${roundedDecimal}`;
  }
}

async function getUserAvatarUrl(userId: string) {
  try {
    const profilePhotosResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}`
    );
    console.log("userId", userId);
    const profilePhotosData = await profilePhotosResponse.json();
    if (profilePhotosData.ok && profilePhotosData.result.total_count > 0) {
      const fileId = profilePhotosData.result.photos[0].pop().file_id;
      const fileResponse = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
      );
      const fileData = await fileResponse.json();
      if (fileData.ok) {
        const filePath = fileData.result.file_path;
        const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
        return fileUrl; // Return the photo URL
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

function formatMiningNumber(number: number): string {
  // Handle undefined or null input
  if (
    number === undefined ||
    number === null ||
    typeof number !== "number" ||
    isNaN(number)
  ) {
    return "NaN"; // Return "NaN" for invalid inputs
  }
  // round to 4 decimal places
  const roundedNumber = Number(number.toFixed(2));
  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = roundedNumber.toString().split(".");
  // If there's no decimal part, return the formatted integer
  if (!decimalPart) {
    return integerPart + ".00";
  }
  if (decimalPart.length === 1) {
    const [roundedInteger, roundedDecimal] = roundedNumber
      .toString()
      .split(".");
    return `${roundedInteger}.${roundedDecimal}0`;
  } else {
    const [roundedInteger, roundedDecimal] = roundedNumber
      .toString()
      .split(".");
    return `${roundedInteger}.${roundedDecimal}`;
  }
}

const getHours = (time: number) => {
  return Math.floor(time / 3600);
};

const getMinutes = (time: number) => {
  return Math.floor((time % 3600) / 60);
};

const getSeconds = (time: number) => {
  return time % 60;
};

export {
  slicFunc,
  convertToShorthand,
  formatNumberWithCommas,
  getUserAvatarUrl,
  getHours,
  getMinutes,
  getSeconds,
  formatMiningNumber,
};
