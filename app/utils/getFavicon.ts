const getFavicon = async (url: string) => {
    // Only send the hostname to the third-party service — never paths or query strings
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}`;
};

export default getFavicon;
