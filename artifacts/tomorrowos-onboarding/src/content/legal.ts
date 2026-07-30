// Legal document content, adapted from documents supplied July 2026.
// Draft — pending formal legal review.

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'sub'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
  /** Optional anchor id for deep links, e.g. /terms#third-party-trademarks */
  id?: string;
};

/**
 * Central third-party trademark wording. Single source of truth — do not
 * duplicate these strings in components. Pending formal legal review.
 */
export const thirdPartyTrademarkContent = {
  heading: 'Third-party trademarks',
  anchorId: 'third-party-trademarks',
  fullNotice:
    'Third-party names, logos and trademarks displayed on this website are the property of their respective owners. Their use is for identification, compatibility and informational purposes only and does not imply affiliation, endorsement, sponsorship or partnership with TomorrowOS unless expressly stated.',
  platformNote:
    'Platform names and logos identify supported or planned environments. No endorsement or partnership is implied.',
  developerToolsNote:
    'Examples of tools that may be used in a local development workflow. No affiliation or endorsement is implied.',
  legalReviewRequired: true,
} as const;

export type LegalDoc = {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  title: 'Privacy Policy',
  effectiveDate: '20 July 2026',
  lastUpdated: '20 July 2026',
  sections: [
    {
      heading: '1. About this Privacy Policy',
      blocks: [
        { type: 'p', text: 'TomorrowOS is an open-source foundation for building digital signage software.' },
        { type: 'p', text: 'This Privacy Policy explains how TomorrowOS Pty Ltd, trading as TomorrowOS, collects, uses, stores and discloses personal information when you:' },
        { type: 'list', items: [
          'visit the TomorrowOS website;',
          'read or use our documentation;',
          'contact us;',
          'subscribe to updates;',
          'participate in our community;',
          'submit a project or contribution;',
          'report a security issue;',
          'interact with our GitHub organisation or other linked services; or',
          'otherwise communicate with us.',
        ]},
        { type: 'p', text: 'In this policy, "TomorrowOS," "we," "us" and "our" refer to TomorrowOS Pty Ltd, Australia. Email: hello@tomorrowos.org.' },
        { type: 'p', text: 'This policy applies to information handled by TomorrowOS as an organisation. It does not govern information independently collected by GitHub, hosting providers, analytics providers, community platforms or other third-party services under their own privacy policies.' },
      ],
    },
    {
      heading: '2. Our role',
      blocks: [
        { type: 'p', text: 'Depending on the context, TomorrowOS may act as:' },
        { type: 'list', items: [
          'a data controller or equivalent entity when we decide why and how information is handled through our website, mailing list, community or enquiries; or',
          'a service provider or processor where we handle information strictly on behalf of another organisation under a separate written agreement.',
        ]},
        { type: 'p', text: 'The open-source TomorrowOS SDK and runtime ordinarily run within infrastructure selected and controlled by the developer or organisation using them. Information handled inside a third party\u2019s own TomorrowOS-based product is generally controlled by that third party, not by TomorrowOS.' },
      ],
    },
    {
      heading: '3. Information we may collect',
      blocks: [
        { type: 'sub', text: '3.1 Information you provide directly' },
        { type: 'list', items: [
          'your name;',
          'email address;',
          'employer, organisation or project name;',
          'job title or professional role;',
          'country or region;',
          'GitHub username or profile;',
          'contact and enquiry content;',
          'newsletter preferences;',
          'community profile information;',
          'documentation feedback;',
          'bug reports and feature requests;',
          'contribution details;',
          'project submissions;',
          'security vulnerability reports;',
          'correspondence with maintainers;',
          'event or meeting details;',
          'support enquiries;',
          'any other information you voluntarily provide.',
        ]},
        { type: 'p', text: 'Please do not send us sensitive personal information unless it is reasonably necessary and we have specifically requested it.' },
        { type: 'sub', text: '3.2 Information collected automatically' },
        { type: 'p', text: 'When you visit our website, documentation or related services, we may receive:' },
        { type: 'list', items: [
          'IP address;',
          'browser type and version;',
          'operating system;',
          'device type;',
          'language and approximate region;',
          'referring page;',
          'pages viewed;',
          'date and time of access;',
          'links clicked;',
          'session and diagnostic information;',
          'cookie consent preferences;',
          'security and abuse-prevention information;',
          'performance and error logs.',
        ]},
        { type: 'sub', text: '3.3 GitHub and public community information' },
        { type: 'p', text: 'If you interact with TomorrowOS through GitHub or another public development platform, we may view or process information that you make publicly available, including your username, profile image, public profile details, issues, pull requests, discussions, commit authorship, release participation, technical comments and contribution history.' },
        { type: 'p', text: 'Public contributions may remain visible in repository history even if you later delete your account or stop participating, subject to the relevant platform\u2019s operation and the project\u2019s applicable licence.' },
        { type: 'sub', text: '3.4 Information from third parties' },
        { type: 'p', text: 'We may receive information from GitHub, community platforms, analytics and hosting providers, email and newsletter providers, event organisers, service providers, professional advisers, business partners and publicly available professional sources.' },
        { type: 'p', text: 'We do not purchase consumer data lists for behavioural advertising.' },
      ],
    },
    {
      heading: '4. Why we use personal information',
      blocks: [
        { type: 'p', text: 'We may use personal information to:' },
        { type: 'list', items: [
          'operate, maintain and secure the website;',
          'provide documentation and examples;',
          'respond to enquiries;',
          'administer mailing lists;',
          'send requested project and release updates;',
          'operate community discussions;',
          'review issues and contributions;',
          'recognise contributors;',
          'manage project submissions;',
          'coordinate maintainers;',
          'provide support and professional services;',
          'investigate bugs and security reports;',
          'prevent fraud, abuse and unauthorised access;',
          'improve website performance and usability;',
          'understand adoption and documentation usage;',
          'maintain records;',
          'enforce our legal terms and community standards;',
          'comply with legal and regulatory obligations;',
          'establish, exercise or defend legal claims;',
          'evaluate partnerships, enterprise enquiries and project opportunities.',
        ]},
        { type: 'p', text: 'We do not use website visitor information to make decisions that produce legal or similarly significant effects about individuals.' },
      ],
    },
    {
      heading: '5. Legal bases for processing',
      blocks: [
        { type: 'p', text: 'Where European or UK data-protection law applies, we rely on one or more of the following bases:' },
        { type: 'sub', text: 'Consent' },
        { type: 'p', text: 'For example: optional analytics cookies; newsletter subscriptions where consent is required; optional marketing communications; other processing you specifically agree to. You may withdraw consent at any time. Withdrawal does not affect processing already carried out lawfully.' },
        { type: 'sub', text: 'Contract or steps before contract' },
        { type: 'p', text: 'For example: responding to a request for services; progressing an enterprise enquiry; administering an agreed support arrangement.' },
        { type: 'sub', text: 'Legitimate interests' },
        { type: 'p', text: 'For example: operating and securing the website; maintaining project records; improving documentation; preventing abuse; responding to professional enquiries; managing the open-source community. We consider whether those interests are overridden by your rights and interests.' },
        { type: 'sub', text: 'Legal obligation' },
        { type: 'p', text: 'Where processing is necessary to meet accounting, regulatory, security, court or other legal requirements.' },
      ],
    },
    {
      heading: '6. Cookies and similar technologies',
      blocks: [
        { type: 'p', text: 'We use cookies and similar technologies as described in our Cookie Policy.' },
        { type: 'p', text: 'Strictly necessary technologies may operate without optional consent where legally permitted. Optional analytics, preference or marketing technologies will only be activated where required consent has been obtained.' },
        { type: 'p', text: 'You can change your preferences at any time through Cookie Settings in the website footer.' },
      ],
    },
    {
      heading: '7. Direct marketing',
      blocks: [
        { type: 'p', text: 'We may send you release notices, documentation updates, community news, event information, service information and other TomorrowOS updates you requested.' },
        { type: 'p', text: 'You may unsubscribe using the link in any marketing email or by contacting us.' },
        { type: 'p', text: 'We may still send non-marketing communications where reasonably necessary, such as responses to enquiries, security notices or changes affecting a service you use.' },
        { type: 'p', text: 'We will not sell your contact details to third parties for their own marketing.' },
      ],
    },
    {
      heading: '8. When we disclose information',
      blocks: [
        { type: 'p', text: 'We may disclose personal information to:' },
        { type: 'list', items: [
          'website and infrastructure providers;',
          'cloud hosting providers;',
          'email and newsletter platforms;',
          'analytics providers;',
          'security and abuse-prevention providers;',
          'community and collaboration platforms;',
          'GitHub and related development services;',
          'customer-support tools;',
          'professional advisers;',
          'auditors and insurers;',
          'contractors working under confidentiality obligations;',
          'regulators, courts or law-enforcement bodies where legally required;',
          'a purchaser, investor or successor in connection with a genuine corporate transaction.',
        ]},
        { type: 'p', text: 'Service providers may only use information for authorised purposes and subject to appropriate contractual restrictions.' },
      ],
    },
    {
      heading: '9. Current service providers',
      blocks: [
        { type: 'p', text: 'TomorrowOS may use providers such as:' },
        { type: 'table', headers: ['Provider', 'Purpose', 'Likely location'], rows: [
          ['GitHub', 'Source code, issues and community contributions', 'Global / United States'],
          ['Hosting provider', 'Website and documentation hosting', 'Global'],
          ['Email provider', 'Newsletter and transactional emails', 'Global'],
          ['Security/CDN provider', 'Security, performance and abuse prevention', 'Global'],
        ]},
      ],
    },
    {
      heading: '10. International transfers',
      blocks: [
        { type: 'p', text: 'TomorrowOS is based in Australia, but our website and service providers may operate globally. Your information may be processed in Australia, the United States, the United Kingdom, the European Economic Area, Singapore or other countries where our providers operate.' },
        { type: 'p', text: 'Where required, we use reasonable transfer safeguards, such as contractual data-protection terms, standard contractual clauses, UK international data-transfer safeguards, access controls and minimisation, vendor security reviews and other legally recognised transfer mechanisms.' },
      ],
    },
    {
      heading: '11. Data retention',
      blocks: [
        { type: 'p', text: 'We retain personal information only for as long as reasonably required for the purposes described in this policy, including legal, security, accounting and project-record requirements. Indicative periods may include:' },
        { type: 'table', headers: ['Information', 'Indicative retention'], rows: [
          ['Contact enquiries', 'Up to 24 months after the last interaction'],
          ['Newsletter records', 'Until unsubscribe, plus a limited suppression record'],
          ['Cookie consent records', '24 months or as legally appropriate'],
          ['Website security logs', '180 days'],
          ['Analytics data', 'Via analytics provider'],
          ['Enterprise correspondence', 'Up to 7 years where relevant to a transaction'],
          ['Financial and contractual records', 'As required by applicable law'],
          ['Security reports', 'For the life of the affected project or longer where necessary'],
          ['Public GitHub contributions', 'In accordance with repository history and applicable licences'],
        ]},
        { type: 'p', text: 'We may retain limited information longer where required to comply with law, resolve disputes, prevent abuse, protect project integrity, preserve open-source contribution history or enforce agreements.' },
      ],
    },
    {
      heading: '12. Security',
      blocks: [
        { type: 'p', text: 'We use reasonable administrative, technical and organisational safeguards appropriate to the information and our size, which may include access controls, multifactor authentication, encrypted transport, least-privilege access, vendor access controls, secure development practices, backups, vulnerability reporting, incident response procedures, logging and monitoring, and staff and contractor confidentiality obligations.' },
        { type: 'p', text: 'No internet transmission or storage system is completely secure. We cannot guarantee absolute security.' },
        { type: 'p', text: 'Security vulnerabilities should be reported through security@tomorrowos.org, not through public GitHub issues.' },
      ],
    },
    {
      heading: '13. Your privacy rights',
      blocks: [
        { type: 'p', text: 'Your rights depend on your location and applicable law.' },
        { type: 'sub', text: '13.1 Australia' },
        { type: 'p', text: 'You may request access to personal information we hold about you, correction of inaccurate or incomplete information, information about our handling practices and review of a privacy complaint.' },
        { type: 'sub', text: '13.2 EEA and United Kingdom' },
        { type: 'p', text: 'Where applicable, you may have rights to be informed, access your personal data, correct inaccurate data, request deletion, restrict processing, object to processing, receive portable data, withdraw consent and complain to a supervisory authority. Each right has conditions and exceptions.' },
        { type: 'sub', text: '13.3 California and other United States states' },
        { type: 'p', text: 'Where applicable, you may have rights to know what personal information is collected and used, access specific information, request deletion, request correction, opt out of sale or sharing, limit certain uses of sensitive personal information and receive equal service without unlawful discrimination.' },
        { type: 'p', text: 'TomorrowOS does not sell or share personal information for cross-context behavioural advertising.' },
        { type: 'sub', text: '13.4 Exercising rights' },
        { type: 'p', text: 'Email requests to privacy@tomorrowos.org. Please include your name, the email address connected with the request, the right you wish to exercise and enough information to locate the relevant records.' },
        { type: 'p', text: 'We may verify your identity before completing a request. We may refuse or limit a request where permitted by law and will explain the reason where required. Authorised agents may submit requests where applicable, subject to verification.' },
      ],
    },
    {
      heading: '14. Anonymity and pseudonyms',
      blocks: [
        { type: 'p', text: 'Where practical, you may browse public documentation and open-source resources without identifying yourself.' },
        { type: 'p', text: 'Some activities require identification, such as receiving email updates, entering a contract, obtaining support, submitting certain security reports or participating through services that require an account.' },
      ],
    },
    {
      heading: '15. Children',
      blocks: [
        { type: 'p', text: 'TomorrowOS is intended for developers, organisations and professional users. Our website is not directed to children under 16, and we do not knowingly collect personal information from children for commercial purposes.' },
        { type: 'p', text: 'If you believe a child has provided information without appropriate consent, contact us so we can assess and delete it where required.' },
      ],
    },
    {
      heading: '16. Third-party links and services',
      blocks: [
        { type: 'p', text: 'Our website may link to GitHub, documentation providers, community platforms, social networks and external websites. Those services have their own terms and privacy practices. We are not responsible for their independent handling of information.' },
      ],
    },
    {
      heading: '17. Public content',
      blocks: [
        { type: 'p', text: 'Issues, discussions, pull requests, comments, contributor profiles and submitted projects may be public. Do not publish:' },
        { type: 'list', items: [
          'passwords;',
          'private keys;',
          'confidential customer information;',
          'personal information belonging to others;',
          'security vulnerabilities through public channels;',
          'proprietary code you are not entitled to disclose.',
        ]},
      ],
    },
    {
      heading: '18. Changes to this policy',
      blocks: [
        { type: 'p', text: 'We may update this Privacy Policy when our project, providers, legal obligations or information-handling practices change. We will publish the updated policy with a revised effective date. For material changes, we may provide an additional notice where appropriate.' },
      ],
    },
    {
      heading: '19. Privacy complaints',
      blocks: [
        { type: 'p', text: 'You may submit a complaint to: Privacy Officer, TomorrowOS Pty Ltd, privacy@tomorrowos.org. Please describe what happened, the information concerned and the outcome you are seeking.' },
        { type: 'p', text: 'We will acknowledge and investigate complaints within a reasonable period. If you are not satisfied, you may contact the relevant regulator, including the Office of the Australian Information Commissioner, your local EEA data-protection authority, the UK Information Commissioner\u2019s Office or another applicable state or national privacy regulator.' },
      ],
    },
    {
      heading: '20. Contact us',
      blocks: [
        { type: 'p', text: 'Privacy questions and requests: privacy@tomorrowos.org' },
        { type: 'p', text: 'General enquiries: hello@tomorrowos.org' },
        { type: 'p', text: 'Security reports: security@tomorrowos.org' },
      ],
    },
  ],
};

export const termsOfService: LegalDoc = {
  title: 'Terms of Service',
  effectiveDate: '20 June 2026',
  lastUpdated: '20 June 2026',
  sections: [
    {
      heading: '1. About these Terms',
      blocks: [
        { type: 'p', text: 'These Terms of Service govern your access to and use of the TomorrowOS website, public documentation, examples, community areas operated by us, contact and submission forms, newsletters and non-code materials made available through our website.' },
        { type: 'p', text: 'The website is operated by TomorrowOS Pty Ltd, Australia. Email: hello@tomorrowos.org.' },
        { type: 'p', text: 'By using the website, you agree to these Terms. If you do not agree, do not use the website.' },
      ],
    },
    {
      heading: '2. Website terms and open-source licences',
      blocks: [
        { type: 'p', text: 'These Terms govern the website and related organisational services. TomorrowOS source code and software packages are licensed separately under the licence identified in the relevant repository or package, currently intended to be the Apache License 2.0.' },
        { type: 'p', text: 'Where there is a conflict between these Terms and the applicable open-source licence concerning use of the code, the open-source licence controls for that code. Third-party dependencies may be subject to their own licences.' },
        { type: 'p', text: 'These Terms do not remove or reduce rights granted under an applicable open-source licence.' },
      ],
    },
    {
      heading: '3. Who may use the website',
      blocks: [
        { type: 'p', text: 'You must be legally capable of agreeing to these Terms, comply with applicable laws, and have authority to act for an organisation if using the website on its behalf.' },
        { type: 'p', text: 'If you use TomorrowOS for an organisation, "you" includes that organisation, and you confirm you are authorised to bind it.' },
      ],
    },
    {
      heading: '4. No mandatory hosted service',
      blocks: [
        { type: 'p', text: 'The TomorrowOS open-source project is designed to be self-hosted and does not require a mandatory TomorrowOS-hosted account unless a separate hosted or managed service is expressly offered and accepted.' },
        { type: 'p', text: 'Any future commercial, managed, support or cloud service may be governed by separate terms, an order form or written agreement.' },
      ],
    },
    {
      heading: '5. Documentation and examples',
      blocks: [
        { type: 'p', text: 'Documentation, examples and technical content are provided for general information and development assistance. They may contain errors, be incomplete, relate to a pre-release version, change without notice, or not cover every hardware model, firmware version or deployment environment.' },
        { type: 'p', text: 'You are responsible for validating code and instructions, reviewing platform compatibility, testing before production, maintaining backups, assessing security, complying with legal and operational requirements, and determining whether TomorrowOS is suitable for your use.' },
        { type: 'p', text: 'Do not rely on documentation as a substitute for professional security, legal, engineering or compliance advice.' },
      ],
    },
    {
      heading: '6. Pre-release software',
      blocks: [
        { type: 'p', text: 'TomorrowOS may be labelled alpha, beta, preview, experimental or pre-1.0. Pre-release components may change materially, contain defects, have limited compatibility, lose or corrupt data, be unsuitable for production, or lack support or migration paths.' },
        { type: 'p', text: 'You use pre-release components at your own risk. Release notes and stability documentation should be reviewed before upgrading or deploying.' },
      ],
    },
    {
      heading: '7. Accounts and third-party platforms',
      blocks: [
        { type: 'p', text: 'TomorrowOS may not require a website account at launch. Some activities may require an account with a third party such as GitHub.' },
        { type: 'p', text: 'You are responsible for your third-party account, protecting credentials, all activity conducted through your account, and complying with third-party terms. We are not responsible for outages, suspensions, security events or policy changes affecting third-party services.' },
      ],
    },
    {
      heading: '8. Acceptable use',
      blocks: [
        { type: 'p', text: 'You must not use the website, community or TomorrowOS-operated services to:' },
        { type: 'list', items: [
          'break the law;',
          'infringe intellectual-property rights;',
          'distribute malware;',
          'gain unauthorised access;',
          'interfere with systems or users;',
          'conduct denial-of-service activity;',
          'scrape or overload services in an abusive manner;',
          'evade security controls;',
          'impersonate another person;',
          'publish private credentials or personal information;',
          'harass or threaten others;',
          'submit intentionally false security reports;',
          'use the project to facilitate unlawful surveillance;',
          'distribute content you do not have the right to use;',
          'misuse TomorrowOS trademarks or imply endorsement;',
          'exploit minors;',
          'engage in fraudulent or deceptive conduct.',
        ]},
        { type: 'p', text: 'Good-faith security research must follow our Security Policy and coordinated-disclosure process.' },
      ],
    },
    {
      heading: '9. Community standards',
      blocks: [
        { type: 'p', text: 'Participation may also be subject to the Code of Conduct, Contribution Guidelines, Security Policy, repository-specific rules and maintainer decisions.' },
        { type: 'p', text: 'We may remove content or restrict participation where reasonably necessary to protect participants, preserve project quality, address abuse, comply with law, or enforce these Terms or community standards.' },
      ],
    },
    {
      heading: '10. User submissions',
      blocks: [
        { type: 'p', text: 'You may submit feedback, documentation changes, issues, examples, project listings, suggestions, comments and other content. You confirm that you have the right to submit it, it does not violate confidentiality obligations, it does not infringe third-party rights, it does not contain unlawful material, and it does not contain secrets or credentials.' },
        { type: 'p', text: 'You retain ownership of your content, subject to the permissions needed to host, display, review, reproduce and administer it.' },
      ],
    },
    {
      heading: '11. Code contributions',
      blocks: [
        { type: 'p', text: 'Code contributions are governed by the licence of the relevant repository, the Contribution Guidelines, and any contribution process adopted for that repository.' },
        { type: 'p', text: 'Unless expressly agreed otherwise, submitting a contribution does not make you an employee, partner, agent or representative of TomorrowOS. Maintainers may accept, reject, modify or close contributions in accordance with project governance.' },
      ],
    },
    {
      heading: '12. Contributor recognition',
      blocks: [
        { type: 'p', text: 'TomorrowOS may publicly recognise contributors using information such as name or username, profile image, contribution area, GitHub profile and accepted contribution.' },
        { type: 'p', text: 'Recognition does not create ownership, employment, governance rights or maintainer status. Maintainer access is granted through the project\u2019s governance process and may be changed or revoked to protect the project.' },
      ],
    },
    {
      heading: '13. Project submissions and showcase listings',
      blocks: [
        { type: 'p', text: 'If you submit a project for possible inclusion in a TomorrowOS showcase, you grant us a non-exclusive, worldwide, royalty-free licence to display the project name, reproduce submitted descriptions, display submitted logos or screenshots, link to the project and promote its relationship with TomorrowOS. You confirm that you have authority to provide those materials.' },
        { type: 'p', text: 'We may edit descriptions for length and clarity and may decline or remove listings at our discretion. A listing does not represent certification, endorsement or security approval.' },
      ],
    },
    {
      heading: '14. Intellectual property',
      blocks: [
        { type: 'sub', text: 'TomorrowOS code' },
        { type: 'p', text: 'Governed by the applicable repository licence.' },
        { type: 'sub', text: 'Website content' },
        { type: 'p', text: 'Unless otherwise stated, website copy, design, illustrations, branding and non-code material are owned by or licensed to TomorrowOS Pty Ltd. You may not reproduce or commercially exploit that material except as permitted by law, under an express licence, or with written permission.' },
        { type: 'sub', text: 'Trademarks' },
        { type: 'p', text: '"TomorrowOS," associated logos and branding are trademarks or protected brand identifiers of TomorrowOS Pty Ltd. The Apache 2.0 licence does not grant rights to use TomorrowOS trademarks, logos or brand names except as necessary for reasonable descriptive use.' },
        { type: 'p', text: 'You must not imply endorsement, official certification, partnership, affiliation, or that your modified product is the official TomorrowOS project.' },
      ],
    },
    {
      heading: '15. Third-party content and dependencies',
      blocks: [
        { type: 'p', text: 'TomorrowOS may reference or depend on third-party libraries, runtimes, platforms, hardware, APIs, documentation and services. Third-party materials remain subject to their own licences and terms.' },
        { type: 'p', text: 'We do not control or guarantee third-party products, firmware, hardware compatibility, availability or security.' },
      ],
    },
    {
      heading: '16. Security',
      blocks: [
        { type: 'p', text: 'You are responsible for securing your application, infrastructure, credentials, API keys, customer data, networks, deployment environment, hardware and operational processes. TomorrowOS does not certify the complete product you build.' },
        { type: 'p', text: 'Security issues relating to TomorrowOS should be privately reported to security@tomorrowos.org.' },
      ],
    },
    {
      heading: '17. Export controls and sanctions',
      blocks: [
        { type: 'p', text: 'You must comply with applicable export-control, sanctions and trade laws. You must not knowingly use or provide TomorrowOS in violation of applicable restrictions. This clause does not restrict lawful access to publicly available open-source software beyond what applicable law requires.' },
      ],
    },
    {
      heading: '18. Availability and changes',
      blocks: [
        { type: 'p', text: 'We may modify the website, update documentation, change links, discontinue website features, alter community services or restrict abusive access. We do not guarantee uninterrupted or error-free availability.' },
        { type: 'p', text: 'Open-source code already lawfully obtained remains subject to its applicable licence.' },
      ],
    },
    {
      heading: '19. No professional advice',
      blocks: [
        { type: 'p', text: 'TomorrowOS content is not legal advice, compliance advice, cybersecurity certification, financial advice, engineering certification or a guarantee of production readiness. Obtain appropriate professional advice for your deployment.' },
      ],
    },
    {
      heading: '20. Disclaimers',
      blocks: [
        { type: 'p', text: 'To the maximum extent permitted by law: the website and documentation are provided "as is" and "as available"; we exclude implied warranties not required by law; we do not guarantee accuracy, completeness, compatibility, security or fitness for a particular purpose; we do not guarantee that code or documentation will be error-free; and we do not guarantee compatibility with every display, player, operating system, firmware or third-party service.' },
        { type: 'p', text: 'Nothing in these Terms excludes rights that cannot lawfully be excluded, including applicable rights under the Australian Consumer Law.' },
      ],
    },
    {
      heading: '21. Limitation of liability',
      blocks: [
        { type: 'p', text: 'To the maximum extent permitted by law, TomorrowOS Pty Ltd, its directors, maintainers, contributors, employees and contractors will not be liable for indirect, consequential, special, exemplary or incidental loss, including lost profits, lost revenue, lost data, business interruption, loss of goodwill, deployment failure, hardware failure, content outage or loss arising from third-party systems.' },
        { type: 'p', text: 'For website services supplied without charge, our aggregate liability arising from the website and these Terms is limited to AUD $100. For paid services, liability is governed by the applicable commercial agreement. This limitation does not apply where liability cannot legally be limited.' },
      ],
    },
    {
      heading: '22. Indemnity',
      blocks: [
        { type: 'p', text: 'To the extent permitted by law, you agree to indemnify TomorrowOS Pty Ltd against third-party claims, losses and reasonable costs arising from your unlawful use, your breach of these Terms, your submitted content, your infringement of third-party rights, or the product or deployment you build using TomorrowOS.' },
        { type: 'p', text: 'This does not require you to indemnify us for loss caused by our fraud, wilful misconduct or liability that cannot lawfully be excluded.' },
      ],
    },
    {
      heading: '23. Suspension and termination',
      blocks: [
        { type: 'p', text: 'We may restrict access to TomorrowOS-operated community or website services where reasonably necessary because of breach, abuse, security risk, legal requirements or harm to the project or users.' },
        { type: 'p', text: 'Termination of website access does not terminate rights already granted under an open-source licence for code you lawfully obtained.' },
      ],
    },
    {
      heading: '24. Governing law',
      blocks: [
        { type: 'p', text: 'These Terms are governed by the laws of Western Australia, Australia. Subject to rights that cannot be excluded, courts located in Western Australia have jurisdiction.' },
        { type: 'p', text: 'For consumers, nothing in this clause removes mandatory rights or forums available under applicable law.' },
      ],
    },
    {
      heading: '25. Changes to these Terms',
      blocks: [
        { type: 'p', text: 'We may update these Terms. Updated Terms apply from the published effective date. Material changes may be highlighted on the website. Your continued use after the effective date constitutes acceptance where permitted by law.' },
      ],
    },
    {
      heading: '26. General terms',
      blocks: [
        { type: 'p', text: 'If a provision is unenforceable, the remaining provisions continue. Failure to enforce a provision is not a waiver. These Terms, together with referenced policies, form the agreement governing the website.' },
      ],
    },
    {
      heading: thirdPartyTrademarkContent.heading,
      id: thirdPartyTrademarkContent.anchorId,
      blocks: [{ type: 'p', text: thirdPartyTrademarkContent.fullNotice }],
    },
    {
      heading: '27. Contact',
      blocks: [
        { type: 'p', text: 'Legal and general enquiries: hello@tomorrowos.org' },
        { type: 'p', text: 'Security reports: security@tomorrowos.org' },
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  title: 'Cookie Policy',
  effectiveDate: '20 June 2026',
  lastUpdated: '20 June 2026',
  sections: [
    {
      heading: '1. About this Cookie Policy',
      blocks: [
        { type: 'p', text: 'This Cookie Policy explains how TomorrowOS uses cookies and similar technologies on its website and documentation.' },
        { type: 'p', text: '"Cookies" includes, where relevant: browser cookies; local storage; pixels; tags; SDK storage; and similar technologies that store or access information on a device.' },
      ],
    },
    {
      heading: '2. What cookies are',
      blocks: [
        { type: 'p', text: 'Cookies are small data files placed on or read from your device when you use a website. They can be used to operate a website, remember choices, protect services, measure usage, diagnose problems, support embedded content and provide advertising.' },
      ],
    },
    {
      heading: '3. Categories we use',
      blocks: [
        { type: 'sub', text: 'Strictly necessary' },
        { type: 'p', text: 'Required for the website to operate or to provide a feature you request. Examples: security; load balancing; consent choices; form operation; session continuity; abuse prevention. These cannot usually be disabled through our settings.' },
        { type: 'sub', text: 'Preferences' },
        { type: 'p', text: 'Remember optional choices, such as theme, language, documentation preferences and display settings. These remain disabled until consent where required.' },
        { type: 'sub', text: 'Analytics' },
        { type: 'p', text: 'Help us understand which pages are used, where visitors encounter errors, how documentation performs and broad traffic patterns. Analytics only activate after consent in jurisdictions requiring it.' },
        { type: 'sub', text: 'Functional and embedded content' },
        { type: 'p', text: 'Enable optional third-party features, such as videos, interactive examples, GitHub widgets and embedded community content. These may allow the third party to collect information.' },
        { type: 'sub', text: 'Marketing' },
        { type: 'p', text: 'TomorrowOS does not currently use marketing or behavioural-advertising cookies.' },
      ],
    },
    {
      heading: '4. Cookie inventory',
      blocks: [
        { type: 'table', headers: ['Name', 'Provider', 'Purpose', 'Category', 'Duration'], rows: [
          ['tomorrowos_cookie_consent', 'TomorrowOS', 'Stores consent choices', 'Necessary', '12 months'],
        ]},
        { type: 'p', text: 'No optional analytics, functional or marketing technologies are currently active on this website. This inventory will be updated as deployed technologies change.' },
      ],
    },
    {
      heading: '5. Your choices',
      blocks: [
        { type: 'p', text: 'You can accept all optional technologies, reject all non-essential technologies, choose categories individually, or withdraw consent at any time. Use the Cookie Settings link in the footer.' },
        { type: 'p', text: 'Withdrawing consent will not invalidate processing that occurred before withdrawal. Some features may not work as expected if optional technologies are disabled.' },
      ],
    },
    {
      heading: '6. Browser controls',
      blocks: [
        { type: 'p', text: 'You can also block or delete cookies using browser settings. Blocking all cookies may affect essential website functionality.' },
      ],
    },
    {
      heading: '7. Third-party technologies',
      blocks: [
        { type: 'p', text: 'Third-party services may set their own cookies when activated. Their handling of information is governed by their own privacy policies. We will not activate non-essential third-party embeds before consent where consent is legally required.' },
      ],
    },
    {
      heading: '8. Global Privacy Control',
      blocks: [
        { type: 'p', text: 'Where legally required and technically supported, we recognise Global Privacy Control or another valid browser-based opt-out signal.' },
        { type: 'p', text: 'TomorrowOS does not sell or share personal information for cross-context behavioural advertising.' },
      ],
    },
    {
      heading: '9. Changes',
      blocks: [
        { type: 'p', text: 'We may update this Cookie Policy when technologies or providers change. We may request consent again when changes materially affect previous choices.' },
      ],
    },
    {
      heading: '10. Contact',
      blocks: [
        { type: 'p', text: 'Questions about cookies: privacy@tomorrowos.org' },
      ],
    },
  ],
};
