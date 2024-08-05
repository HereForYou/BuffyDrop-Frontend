export const isMobileDevice = (): boolean => {
    const userAgent: string = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Check for mobile device user agents
    if (/android/i.test(userAgent)) {
        return true;
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return true;
    }

    return false;
};
