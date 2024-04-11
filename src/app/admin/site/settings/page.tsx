import type { Metadata } from 'next';

import AdminSite from '@/containers/Admin/site';
import { fetchConfig } from '@/lib/config/server';

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const config = await fetchConfig();
  const siteName = config?.name || 'DEFAULT_SITE_NAME';

  return {
    title: `Admin Site Settings - ${siteName}`,
  };
}

export default function AdminSiteSettings() {
  return <AdminSite />;
}
