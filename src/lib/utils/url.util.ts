/**
 * Check if we are using localhost
 * @param hostname
 * @returns
 */
export function isLocalNetwork(
  hostname = typeof window !== 'undefined' ? window.location.hostname : '',
) {
  return (
    ['localhost', '127.0.0.1', '', '::1'].includes(hostname) ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.0.') ||
    hostname.startsWith('localhost') ||
    hostname.endsWith('.local') ||
    hostname.endsWith('.local:3000')
  );
}

export const isTorNetwork = () => {
  // if (env == "development") {
  //   return true;
  // }
  // else if (env == "production") {
  //   // do something
  //   const hostname = API_URL;
  //   return hostname.endsWith('.onion')
  // }

  return true;
};
