import isEmpty from 'lodash/isEmpty';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

export async function GET() {
  const res = new Response(null, {
    headers: {
      Refresh: '0; url=/html',
    },
  });

  return res;
}

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const currentIsOpen = cookieStore.get('openSidebar');
  const formData = await req.formData();
  const pathname = formData.get('pathname');

  let newIsOpen = null;
  if (currentIsOpen && currentIsOpen.value === 'true') {
    newIsOpen = 'false';
  } else {
    newIsOpen = 'true';
  }

  cookieStore.set('openSidebar', newIsOpen);

  return new Response(null as any, {
    headers: {
      'Set-Cookie': `openSidebar=${newIsOpen}; path=/;`,
      Refresh: `0; url=${!isEmpty(pathname) ? pathname : '/'}`,
    },
  });
}
