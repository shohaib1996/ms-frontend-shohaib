/**
 * Format a time duration from seconds to a readable string (e.g., "3:45")
 */
export const formatDuration = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) {
        return '0:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours}:`;
        formattedTime += `${minutes < 10 ? '0' : ''}${minutes}:`;
    } else {
        formattedTime += `${minutes}:`;
    }

    formattedTime += `${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    return formattedTime;
};
