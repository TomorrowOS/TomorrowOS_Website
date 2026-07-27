import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { usePrototype } from '@/components/PrototypeProvider';
import { PlaceholderText } from '@/components/PlaceholderText';

export default function Terms() {
  const { state } = usePrototype();
  useSeo({ title: 'Terms of Service' });

  const companyName = siteConfig.legal.companyName.includes('{{') && !state.prototypeReviewMode 
    ? 'TomorrowOS' 
    : siteConfig.legal.companyName;

  const jurisdiction = siteConfig.legal.jurisdiction.includes('{{') && !state.prototypeReviewMode 
    ? 'the applicable jurisdiction' 
    : siteConfig.legal.jurisdiction;

  return (
    <div className="container mx-auto max-w-3xl py-24 px-4">
      <div className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium px-2 py-1 rounded mb-6">
        Draft — legal review required
      </div>
      <h1 className="text-4xl font-bold mb-8 tracking-tight">Terms of Service</h1>
      
      <div className="prose prose-gray max-w-none prose-headings:font-semibold">
        <p className="text-muted-foreground lead">
          These Terms of Service govern your use of the TomorrowOS platform.
          This is a placeholder document that requires formal legal review.
        </p>

        <h2 className="text-2xl mt-12 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the TomorrowOS platform, you agree to be bound by these Terms.
          If you do not agree to these terms, do not use our services.
        </p>

        <h2 className="text-2xl mt-12 mb-4">2. Use License</h2>
        <p>
          TomorrowOS grants you a limited, non-exclusive, non-transferable license to use 
          the platform in accordance with these Terms and our documentation.
        </p>

        <h2 className="text-2xl mt-12 mb-4">3. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of{' '}
          {siteConfig.legal.jurisdiction.includes('{{') ? <PlaceholderText value="PLACEHOLDER_JURISDICTION" fallback={jurisdiction} /> : jurisdiction}, 
          without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  );
}
