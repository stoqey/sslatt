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
  const theme = cookieStore.get('theme');

  const formData = await req.formData();
  const pathname = formData.get('pathname');

  let newTheme = null;
  if (theme && theme.value === 'dark') {
    newTheme = 'light';
  } else {
    newTheme = 'dark';
  }

  cookieStore.set('theme', newTheme);

  return new Response(null as any, {
    headers: {
      'Set-Cookie': `theme=${newTheme}; path=/;`,
      Refresh: `0; url=${!isEmpty(pathname) ? pathname : '/'}`,
    },
  });
}
