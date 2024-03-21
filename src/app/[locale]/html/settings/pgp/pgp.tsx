'use client';

import { Container } from '@/components/container';
import type { PgpSettingsProps } from '@/containers/Settings/pgp.html';
import PgpSettingsHtml from '@/containers/Settings/pgp.html';

export function PgpSettingPage(props?: PgpSettingsProps) {
  return (
    <Container>
      <PgpSettingsHtml {...(props as any)} />
    </Container>
  );
}

export default PgpSettingPage;
