import React from 'react';
import { LegalDocPage } from '@/components/LegalDocPage';
import { cookiePolicy } from '@/content/legal';

export default function CookiePolicy() {
  return <LegalDocPage doc={cookiePolicy} />;
}
