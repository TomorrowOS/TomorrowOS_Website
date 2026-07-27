import React from 'react';
import { useSeo } from '@/hooks/use-seo';
import { siteConfig } from '@/config/site';
import { usePrototype } from '@/components/PrototypeProvider';
import { PlaceholderText } from '@/components/PlaceholderText';

export default function Privacy() {
  const { state } = usePrototype();
  useSeo({ title: 'Privacy Policy' });

  const companyName = siteConfig.legal.companyName.includes('{{') && !state.prototypeReviewMode 
    ? 'TomorrowOS' 
    : siteConfig.legal.companyName;

  const contactEmail = siteConfig.legal.contactEmail.includes('{{') && !state.prototypeReviewMode 
    ? 'privacy@tomorrowos.org' 
    : siteConfig.legal.contactEmail;

  return (
    <div className="container mx-auto max-w-3xl py-24 px-4">
      <div className="inline-block bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium px-2 py-1 rounded mb-6">
        Draft — legal review required
      </div>
      <h1 className="text-4xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none prose-headings:font-semibold">
        <p className="text-muted-foreground lead">
          This Privacy Policy describes how TomorrowOS collects, uses, and protects your personal information.
          This is a placeholder document that requires formal legal review.
        </p>

        <h2 className="text-2xl mt-12 mb-4">1. Information we collect</h2>
        <p>
          We collect information that you provide directly to us when using the TomorrowOS platform.
          This includes account details, configuration preferences, and analytics telemetry (if enabled).
        </p>

        <h2 className="text-2xl mt-12 mb-4">2. How we use your information</h2>
        <p>
          We use the information we collect to operate, maintain, and improve our services, 
          as well as to communicate with you regarding your account and platform updates.
        </p>

        <h2 className="text-2xl mt-12 mb-4">3. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:{' '}
          {siteConfig.legal.companyName.includes('{{') ? <PlaceholderText value="PLACEHOLDER_COMPANY_NAME" fallback={companyName} /> : companyName} 
          <br />
          Email:{' '}
          {siteConfig.legal.contactEmail.includes('{{') ? <PlaceholderText value="PLACEHOLDER_CONTACT_EMAIL" fallback={contactEmail} /> : contactEmail}
        </p>
      </div>
    </div>
  );
}
