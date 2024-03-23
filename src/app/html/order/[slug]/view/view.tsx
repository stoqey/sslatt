'use client';

import type { OrderTypeOutput, UserType } from '@/components/types.generated';
import type { ActionPageProps } from '@/containers/action.page.html';
import OrderDetailsContainerHtml from '@/containers/Order/order.details.html';

interface Props extends ActionPageProps {
  user: UserType;
  order: OrderTypeOutput;
}

const OrderViewActionPage = (props: Partial<Props>) => {
  const backLink = '/html/order';
  return <OrderDetailsContainerHtml {...props} backLink={backLink} />;
};

export default OrderViewActionPage;
