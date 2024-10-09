
const useHosting = () => {
    const hostingKey = import.meta.env.VITE_HOSTING_API_KEY;
    const hostingUrl = `https://api.imgbb.com/1/upload?key=${hostingKey}`;
    return hostingUrl;
}
export default useHosting;