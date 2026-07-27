import React from 'react';
import { LegalDocPage } from '@/components/LegalDocPage';
import { termsOfService } from '@/content/legal';

export default function Terms() {
  return <LegalDocPage doc={termsOfService} />;
}
