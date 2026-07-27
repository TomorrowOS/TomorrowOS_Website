import React from 'react';
import { LegalDocPage } from '@/components/LegalDocPage';
import { privacyPolicy } from '@/content/legal';

export default function Privacy() {
  return <LegalDocPage doc={privacyPolicy} />;
}
