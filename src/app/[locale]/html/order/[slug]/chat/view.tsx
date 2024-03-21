'use client';

import { Container } from '@/components/container';
import type { OrderTypeOutput, UserType } from '@/components/types.generated';
import type { ActionPageProps } from '@/containers/action.page.html';
import OrderDetailsContainerHtml from '@/containers/Order/order.details.html';

interface Props extends Partial<ActionPageProps> {
  user?: UserType;
  order?: OrderTypeOutput;
}

const OrderViewActionPage = (props: Props) => {
  return (
    <Container size={10}>
      <OrderDetailsContainerHtml {...props} />
    </Container>
  );
};

export default OrderViewActionPage;
