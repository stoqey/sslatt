import type { Metadata } from 'next';

import AdminSiteCategories from '@/containers/Admin/categories';
import { fetchConfig } from '@/lib/config/server';

export async function generateMetadata(): Promise<Metadata> {
  // read route params
  const config = await fetchConfig();
  const siteName = config?.name;

  return {
    title: `Category Settings ${siteName ? `- ${siteName}` : ''}`,
  };
}

export default function AdminCategories() {
  return <AdminSiteCategories />;
}
