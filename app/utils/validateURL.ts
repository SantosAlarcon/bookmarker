export const validateURL = (url: string) => {
    const regex =
        "(http|https)://((www.)?(.[a-zA-Z0-9-]+)(/[a-zA-Z0-9-_\\?\\.\\+=&%]+)*)";

    if (url.match(regex)) {
        return true;
    }
    return false;
};
