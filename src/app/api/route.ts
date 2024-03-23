const baseUrl = '/';

async function GET() {
  const res = new Response(null, {
    headers: {
      Refresh: `0; url=${baseUrl}`,
    },
  });

  return res;
}

export { GET, GET as POST };
