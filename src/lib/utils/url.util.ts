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

export const isTorNetwork = (
  hostname = typeof window !== 'undefined' ? window.location.hostname : '',
) => {
  return hostname.endsWith('.onion');
};
