import { Modal, ModalSize } from '@uuixjs/uuixweb';
import { useRouter, useSearchParams } from 'next/navigation';
// import { AdsDetailsContainer } from "@/containers/AdDetails/AdsDetailsContainer";
import React from 'react';

/**
 * TODO styling
 * @returns
 */
export const AdDetailsModalComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const adId = searchParams.get('adId');

  return (
    <Modal
      show={!!adId}
      onRequestClose={() => router.back()}
      size={ModalSize.Medium}
    >
      {/* <AdsDetailsContainer id={adId as any} pathname={router.pathname} /> */}
    </Modal>
  );
};
