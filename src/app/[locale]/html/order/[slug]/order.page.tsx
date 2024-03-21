import { cookies } from 'next/headers';

import { ActionPage } from '@/containers/action.page.html';

const OrderActionPage = async ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const cookieStore = cookies();
  const message = cookieStore.get('message')?.value;
  const success = cookieStore.get('success')?.value === 'true';

  return (
    <ActionPage
      id={id}
      label="order"
      actionId="order"
      message={message}
      success={success}
    />
  );
};

export default OrderActionPage;
