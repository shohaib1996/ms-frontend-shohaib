'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import {
    Info,
    Users,
    BabyIcon as Child,
    Database,
    HardDrive,
    Cookie,
    Share2,
    Clock,
    Lock,
    UserCheck,
    Globe,
    FileText,
    Mail,
    ChevronUp,
    Scale,
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const PrivacyPolicyComp = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSection = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(section);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <TooltipProvider>
            <div className='my-container mt-[90px] mb-8 mx-auto p-4 bg-foreground rounded-lg'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-primary-white mb-4'>
                        SkillBNK Privacy Policy
                    </h1>
                    <p className='text-dark-gray'>
                        Last Updated: April 5, 2025
                    </p>
                </div>

                {/* Table of Contents */}
                <div className='bg-background shadow-lg p-6 rounded-lg mb-10'>
                    <h2 className='text-xl font-semibold mb-4 text-primary-white'>
                        Table of Contents
                    </h2>
                    <ul className='space-y-2'>
                        {sections.map((section) => (
                            <li key={section.id} className='list-none'>
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className={`text-left hover:text-primary-white transition-colors flex items-center gap-2 ${activeSection === section.id ? 'text-primary-white font-medium' : 'text-gray'}`}
                                >
                                    <section.icon size={16} />
                                    <span>{section.title}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Content Sections */}
                <div className='space-y-16'>
                    {sections.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            className='scroll-mt-8'
                        >
                            <div className='flex items-center gap-3 mb-6 pb-2 border-b border-gray-200'>
                                <div className='bg-primary p-2 rounded-full text-pure-white'>
                                    <section.icon size={20} />
                                </div>
                                <h2 className='text-2xl font-bold text-primary-white'>
                                    {section.title}
                                </h2>
                            </div>
                            <div className='prose max-w-none text-gray space-y-4'>
                                {section.content}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Contact Section */}
                <div className='mt-8 bg-background shadow-lg p-8 rounded-lg'>
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='bg-primary p-2 rounded-full text-pure-white'>
                            <Mail size={20} />
                        </div>
                        <h2 className='text-2xl font-bold text-primary-white'>
                            Contact Us
                        </h2>
                    </div>

                    <p className='mb-4 text-gray'>
                        If you have any questions, concerns, or requests
                        regarding this Privacy Policy or your personal data,
                        please do not hesitate to contact us. We are here to
                        help.
                    </p>

                    <div className='space-y-2 mb-6 text-gray'>
                        <p>
                            <strong>Address:</strong> 30500 Van Dyke Ave, Suite
                            201, Warren MI 48093
                        </p>
                        <p>
                            <strong>Email:</strong>{' '}
                            <a
                                href='mailto:hello@skillbnk.com'
                                className='text-primary-white hover:underline'
                            >
                                hello@skillbnk.com
                            </a>
                        </p>
                    </div>

                    <p className='mb-4 text-gray'>
                        Thank you for trusting SkillBNK with your learning
                        journey. We are dedicated to protecting your privacy and
                        ensuring the security of your personal information.
                    </p>

                    <Button onClick={scrollToTop} className=''>
                        <ChevronUp size={16} />
                        Back to Top
                    </Button>
                </div>

                {/* Fixed Back to Top Button */}
                {showBackToTop && (
                    <div className='fixed bottom-8 right-8'>
                        <Button
                            onClick={scrollToTop}
                            className='bg-primary hover:bg-[#0628a0] text-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg'
                            aria-label='Back to top'
                        >
                            <ChevronUp size={20} />
                        </Button>
                    </div>
                )}
            </div>
        </TooltipProvider>
    );
};

// Helper component for tooltips
function Term({
    children,
    definition,
}: {
    children: React.ReactNode;
    definition: string;
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className='border-b border-dotted border-gray-400 cursor-help'>
                    {children}
                </span>
            </TooltipTrigger>
            <TooltipContent className='max-w-xs'>
                <p>{definition}</p>
            </TooltipContent>
        </Tooltip>
    );
}

// Privacy Policy Sections with complete content
const sections = [
    {
        id: 'introduction',
        title: 'Introduction',
        icon: Info,
        content: (
            <>
                <p>
                    {`SkillBNK (referred to as "SkillBNK", "we", "us", or "our") is a Software-as-a-Service (SaaS)
                    platform that uses AI-powered tools to facilitate coaching and training. This Privacy Policy describes how we
                    collect, use, and share personal information when you use our services (the "Services"), including our
                    websites, learner portals, coach portals, school admin portals, and company admin portals. It applies to all
                    types of users of our platform, including individual learners, coaches, school administrators, and company
                    administrators (collectively, "you" or "users")`}
                    .
                </p>
                <p>
                    By using SkillBNK, you agree to the collection and use of
                    information in accordance with this Privacy Policy. If you
                    do not agree with our practices, please do not use the
                    Services. We are committed to transparency and protecting
                    your privacy. If you have any questions or concerns about
                    this policy or our data practices, please{' '}
                    <strong>contact us</strong> using the information provided
                    at the end of this document.
                </p>
            </>
        ),
    },
    {
        id: 'user-types',
        title: 'Types of Users and Scope',
        icon: Users,
        content: (
            <>
                <p>
                    SkillBNK serves a variety of users in the online coaching
                    and training ecosystem. This policy covers personal data for
                    all these user types:
                </p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Learners:</strong> Individuals enrolled in
                        training programs or courses on SkillBNK. Learners use
                        our platform to access content, track their progress,
                        and communicate with coaches.
                    </li>
                    <li>
                        <strong>Coaches:</strong> Individual trainers or
                        instructors who deliver content, run coaching sessions,
                        and manage learner progress through the platform.
                    </li>
                    <li>
                        <strong>School Administrators:</strong> Administrators
                        of a training school or branch (such as an online
                        academy or coaching business) who oversee multiple
                        coaches and learners within their school.
                    </li>
                    <li>
                        <strong>Company Administrators:</strong> Administrators
                        managing multiple schools or branches under a company or
                        group of companies. They oversee training across various
                        branches and have oversight of aggregated learning
                        outcomes.
                    </li>
                </ul>
                <p className='mt-4'>
                    This Privacy Policy applies to personal information we
                    process from all of the above user types when they interact
                    with SkillBNK. It also applies to visitors of our website
                    and any other individuals who contact us or engage with our
                    Services in any way related to SkillBNK.
                </p>
            </>
        ),
    },
    {
        id: 'childrens-privacy',
        title: "Children's Privacy",
        icon: Child,
        content: (
            <>
                <p>
                    SkillBNK is not directed to children under the age of 13,
                    and we do not knowingly collect personal information from
                    children. Our Services are designed for adult professionals
                    and students typically above the age of majority (or with
                    permission of a parent or guardian if between 13 and the age
                    of majority). If you are under 13 years old (or under 16 in
                    certain regions where a higher age of consent is required),
                    please do not use SkillBNK or provide any personal
                    information on the platform. If we learn that we have
                    inadvertently collected personal data from a child under the
                    applicable age without proper consent, we will take steps to
                    delete that information as soon as possible.
                </p>
            </>
        ),
    },
    {
        id: 'information-collected',
        title: 'Information We Collect',
        icon: Database,
        content: (
            <>
                <p>
                    We collect various types of personal information from you
                    depending on your role (learner, coach, school admin, or
                    company admin) and how you use our Services. This
                    information is grouped into a few broad categories:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Personal Identifiers
                </h3>
                <p>
                    This includes your name, email address, phone number (if
                    provided), login username, and password. For coaches and
                    admins, this may also include your job title or role and the
                    name of your organization or school.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Profile Information
                </h3>
                <p>
                    If you create a user profile, we may collect details such as
                    your profile photo, biography or qualifications (for
                    coaches), and any preferences or settings you choose to
                    provide on your profile.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Training and Activity Data
                </h3>
                <p>
                    Information about your usage of the platform and
                    participation in training activities. For learners, this
                    includes courses or programs you enroll in, your progress
                    and completion status, quiz or assessment results,
                    assignments or projects submitted, certifications earned,
                    and feedback or scores given by coaches. For coaches, this
                    includes the courses or content you create, training
                    sessions you conduct (including schedules and attendance),
                    and communications or feedback you provide to learners. We
                    also collect any interactions on the platform such as forum
                    posts, chat messages, or comments between learners and
                    coaches, which may contain personal information.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Transactional Information
                </h3>
                <p>
                    If you make payments through SkillBNK (for example,
                    purchasing a course or paying a subscription fee), we
                    collect information related to the transaction. This
                    includes payment amounts, date and time of transactions, and
                    limited payment details. <strong>Note:</strong> We do{' '}
                    <strong>not</strong> store full credit card numbers or
                    payment instrument details on our servers. Payments are
                    processed securely by our third-party payment gateway
                    provider (e.g., a credit card processor like Stripe or
                    similar), and we only retain information necessary for
                    payment records (such as the last four digits of your card,
                    billing address, and payment confirmation details).
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Support and Contact Information
                </h3>
                <p>
                    If you contact us for support or with an inquiry, we will
                    collect the information you choose to provide in that
                    communication (such as your contact information and a
                    description of your issue or question). We may also keep
                    records of support tickets and correspondence.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Automatically Collected Data
                </h3>
                <p>
                    When you use our Services, we automatically collect certain
                    technical information about your device and usage of the
                    platform:
                </p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Device and Log Information:</strong> We collect
                        details such as your IP address, browser type, device
                        type (e.g., PC or mobile), operating system, device
                        identifiers, and approximate location (e.g., city or
                        country). We also log information about your activity on
                        the platform, including the pages or screens you visit,
                        the features you use, the time spent on the platform,
                        links clicked, and the date/time of access.
                    </li>
                    <li>
                        <strong>Cookies and Tracking Data:</strong> Like most
                        online services, SkillBNK uses cookies and similar
                        tracking technologies (such as web beacons and local
                        storage) to remember your preferences, keep you logged
                        in, and collect usage analytics. These technologies
                        automatically collect information about your
                        interactions with our Services (see{' '}
                        <strong>Cookies and Tracking</strong> below for more
                        detail).
                    </li>
                </ul>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    No Sensitive Personal Data
                </h3>
                <p>
                    SkillBNK does <strong>not</strong> intentionally collect any
                    sensitive categories of personal data such as government ID
                    numbers, health or medical information, biometric data, or
                    information about race, ethnicity, religious beliefs, sexual
                    orientation, or genetic data. We ask that you do not provide
                    this type of information on our platform. Our Services are
                    focused on education and coaching data, not sensitive
                    personal matters.
                </p>

                <p className='mt-4'>
                    All personal information you provide should be truthful,
                    complete, and accurate. If your information changes (for
                    example, you update your email or phone number), please
                    update your account settings or notify us so we can keep
                    your data up to date.
                </p>
            </>
        ),
    },
    {
        id: 'information-use',
        title: 'How We Use Your Information',
        icon: HardDrive,
        content: (
            <>
                <p>
                    SkillBNK uses your personal information to operate, provide,
                    improve, and protect our Services. We limit our use of your
                    data to the purposes described in this policy. Specifically,
                    we use information in the following ways:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Providing and Improving the Service
                </h3>
                <p>
                    {`We use data to create and manage user accounts, authenticate you when you log in, and deliver the
                    functionalities of the platform to you. For learners, this means enabling access to courses, tracking
                    progress, and providing you with personalized learning content. For coaches and admins, this means allowing
                    you to create or manage content, view learner progress, and administer your school or company portal. We also
                    analyze usage data (e.g., feature use, navigation patterns) to improve our platform's performance, add new
                    features, and enhance user experience.`}
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Personalization and AI-Powered Features
                </h3>
                <p>
                    Our platform uses artificial intelligence and machine
                    learning algorithms to personalize your experience. For
                    example, we might recommend courses or learning resources to
                    learners based on their past activities, or provide coaches
                    with AI-driven insights on learner performance. Any personal
                    data used in these AI-powered features is processed in line
                    with this Privacy Policy and is aimed at improving learning
                    outcomes and user experience. We do <strong>not</strong> use
                    AI to make any decisions that produce legal or similarly
                    significant effects on individuals without human
                    intervention; the AI features are assistive and meant to
                    augment the coaching process.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Communication and Notifications
                </h3>
                <p>
                    We use contact information (like your email address or
                    in-app notifications) to send you important updates and
                    communications. This includes:
                </p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Service and Transactional Messages:</strong> We
                        may send confirmations of registrations, reminders of
                        upcoming coaching sessions or deadlines, progress
                        reports, or updates about changes to the platform or
                        policies.
                    </li>
                    <li>
                        <strong>Support Responses:</strong> If you reach out
                        with a question or issue, we will use your information
                        to respond and resolve your inquiry.
                    </li>
                    <li>
                        <strong>Marketing and Newsletters:</strong> If you have
                        opted in to receive marketing communications, we may
                        send newsletters, product updates, new feature
                        announcements, or offers that might be of interest. You
                        can opt out of marketing emails at any time by clicking
                        the unsubscribe link in those emails or adjusting your
                        preferences.
                    </li>
                </ul>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Payments and Billing
                </h3>
                <p>
                    We use transactional and payment-related information to
                    process payments for courses or subscriptions, issue
                    invoices or receipts, and keep proper financial records.
                    Payment processing is handled by a compliant third-party
                    payment processor, but we use your data to ensure payments
                    are properly linked to your account and to address any
                    billing questions or disputes.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Analytics and Service Improvement
                </h3>
                <p>
                    Internally, we use aggregated and de-identified data (that
                    does not personally identify you) to understand how our
                    Services are used. This helps us debug issues, perform data
                    analysis, test and research new product ideas, and monitor
                    usage trends. For example, we may analyze which features are
                    most used by coaches versus learners to inform our
                    development priorities.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Security and Fraud Prevention
                </h3>
                <p>
                    We process certain data (like IP addresses, device info, and
                    usage logs) to keep the platform secure, to monitor for
                    suspicious or unauthorized activity, and to enforce our
                    Terms of Service. This includes using automated systems to
                    detect fraud, abuse, or violations of our policies. If we
                    detect potential security issues or improper behavior, we
                    may use personal data to investigate and take appropriate
                    action.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Legal Compliance
                </h3>
                <p>
                    In some cases we need to use your information to comply with
                    applicable laws or regulations. For example, we may retain
                    transaction records for accounting and tax obligations, or
                    disclose information in response to lawful requests by
                    public authorities (such as court orders or valid
                    subpoenas). We also may use and retain certain data to
                    comply with data protection laws (e.g., keeping records of
                    consent or of requests you make under GDPR/CCPA).
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Other Purposes with Consent
                </h3>
                <p>
                    If we ever need to use your personal information for a
                    purpose not covered by the above, we will explain it to you
                    and, if required, request your consent. You have the right
                    to withdraw such consent at any time.
                </p>

                <p className='mt-4'>
                    We do <strong>not</strong> sell your personal information to
                    third parties, and we do not use your data for any purposes
                    that are incompatible with the ones listed above. All
                    processing of personal data is conducted in accordance with
                    applicable law and, where required, on a valid legal basis
                    (see below).
                </p>
            </>
        ),
    },
    {
        id: 'legal-basis',
        title: 'Legal Bases for Processing (GDPR)',
        icon: Scale,
        content: (
            <>
                <p>
                    If you are located in the European Economic Area (EEA),
                    United Kingdom, or another region with data protection laws
                    like the GDPR, we only process your personal information
                    when we have a lawful basis to do so. This section explains
                    the legal grounds we rely on for the processing described in
                    this policy:
                </p>

                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Performance of a Contract:</strong> We process
                        personal data to provide our Services as promised in our
                        contract with you (the Terms of Service). For example,
                        when you sign up for SkillBNK and agree to our terms, we
                        need to process your registration information, deliver
                        the platform functionality, and otherwise perform our
                        contract by providing the service.
                    </li>
                    <li>
                        <strong>Legitimate Interests:</strong>{' '}
                        {`We may process your information for our legitimate business
                        interests, as long as those interests are not overridden by your data protection rights. For instance, it is
                        in our legitimate interest to improve our platform's features, to secure our Services against fraud, or to
                        market new features to existing customers. When we rely on legitimate interests, we always consider and
                        balance any potential impact on your rights.`}
                    </li>
                    <li>
                        <strong>Legal Obligation:</strong> Some processing is
                        necessary for us to comply with a legal obligation. For
                        example, retaining certain transaction data for tax or
                        financial reporting purposes, or responding to legal
                        processes (like a subpoena), may require us to process
                        and store certain personal information.
                    </li>
                    <li>
                        <strong>Consent:</strong> Where required by law, we will
                        obtain your consent before processing certain personal
                        data. For example, in some jurisdictions we will seek
                        your consent before setting non-essential cookies or
                        sending marketing emails. If we rely on consent for any
                        processing, you have the right to withdraw your consent
                        at any time.
                    </li>
                </ul>

                <p className='mt-4'>
                    If you have questions about the legal basis we are relying
                    on for a specific type of data processing, feel free to
                    contact us for more information.
                </p>
            </>
        ),
    },
    {
        id: 'cookies',
        title: 'Cookies and Tracking Technologies',
        icon: Cookie,
        content: (
            <>
                <p>
                    SkillBNK uses cookies and similar tracking technologies to
                    enhance your experience and gather usage data:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    What Cookies Are
                </h3>
                <p>
                    Cookies are small text files placed on your device that help
                    us recognize you on your next visit and personalize your
                    experience. We use both session cookies (which expire when
                    you close your browser) and persistent cookies (which remain
                    on your device for a set period or until you delete them).
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    How We Use Cookies
                </h3>
                <p>We use cookies for several purposes:</p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Essential Cookies:</strong> These are necessary
                        for the platform to function properly. For example, they
                        keep you logged in as you navigate through different
                        pages and enable core features like account
                        authentication and user input preservation.
                    </li>
                    <li>
                        <strong>Preference Cookies:</strong> These remember your
                        preferences (such as language selection or display
                        settings) to provide a more convenient experience.
                    </li>
                    <li>
                        <strong>Analytics Cookies:</strong>{' '}
                        {`We use these to collect information about how users interact with our
                        Services. For example, cookies from third-party analytics services (like Google Analytics) help us count
                        visitors, see which features are most popular, and understand user journeys through our site. This data is
                        used in aggregate form to improve our platform's performance and design.`}
                    </li>
                    <li>
                        <strong>No Advertising Cookies:</strong> SkillBNK does
                        not display third-party advertisements on our platform,
                        so we do not use ad targeting cookies for third-party
                        advertising purposes.
                    </li>
                </ul>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Your Choices
                </h3>
                <p>
                    You can control or delete cookies through your browser
                    settings. Most browsers allow you to refuse new cookies,
                    delete existing ones, or notify you when new cookies are
                    placed. However, please note that if you disable or delete
                    cookies, some features of our Services (especially essential
                    ones) may not function properly for you.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Do-Not-Track Signals
                </h3>
                <p>
                    {` Some web browsers have a "Do Not Track" (DNT) feature that sends a signal to websites requesting not to track
                    your activity. At this time, our platform does not respond differently to DNT signals. We adhere to the
                    privacy practices described in this policy, and to manage tracking you can use the cookie controls described
                    above.`}
                </p>

                <p className='mt-4'>
                    For more details about our use of cookies, you may refer to
                    our Cookies Policy (if available) or contact us with any
                    questions.
                </p>
            </>
        ),
    },
    {
        id: 'information-sharing',
        title: 'Sharing and Disclosure of Information',
        icon: Share2,
        content: (
            <>
                <p>
                    We understand that your personal information is important,
                    and we only share it with others in certain situations, and
                    always with appropriate safeguards. The types of third
                    parties with whom SkillBNK may share personal data include:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Service Providers
                </h3>
                <p>
                    We use trusted third-party companies to help us operate and
                    improve SkillBNK. These service providers act on our behalf
                    and are contractually obligated to only use personal data as
                    necessary to provide their services to us. Examples include:
                </p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Hosting and Infrastructure:</strong> We may host
                        our platform and data on cloud servers or data centers
                        provided by companies (for example, Amazon Web Services
                        or similar cloud providers). These providers store and
                        manage the data under our instructions.
                    </li>
                    <li>
                        <strong>Payment Processors:</strong> As mentioned, if
                        payments are processed via a third-party (e.g., Stripe,
                        PayPal, or other payment gateways), these processors
                        will receive the necessary personal data (like your
                        name, billing info, and payment details) to complete the
                        transaction. They are responsible for securing your
                        payment data and have their own privacy policies.
                    </li>
                    <li>
                        <strong>Analytics Partners:</strong> We may share some
                        data (such as usage data or device identifiers) with
                        analytics services that help us understand how users use
                        the platform. For instance, Google Analytics may receive
                        certain data in order to provide anonymized statistical
                        reports to us. These partners are not allowed to use
                        your data for their own purposes beyond providing us
                        with analytics.
                    </li>
                    <li>
                        <strong>Email and Communication Tools:</strong> We might
                        use an email delivery service (for example, SendGrid,
                        Mailchimp, or similar) to send out notifications or
                        newsletters. Those services will process your email
                        address and any content of emails we send to you.
                    </li>
                    <li>
                        <strong>AI Service Providers:</strong>{' '}
                        {`If any AI feature of our platform relies on an external AI service or
                        API (for example, an AI engine provided by a third party), we may share relevant data inputs with that
                        provider solely for the purpose of delivering the AI-driven functionality. (For example, if an AI tool
                        analyzes a learner's performance to give suggestions, data about that performance might be sent to the AI
                        service). Such providers are bound to protect your data and use it only for the intended service.`}
                    </li>
                </ul>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Organizational Administrators
                </h3>
                <p>
                    {` If you are using SkillBNK as part of an organization (such as a company or school that purchased our
                    service for its members), certain data will be shared with or accessible to the administrators of that
                    organization. For example, a company admin can see the progress and performance of learners in their company's
                    branches, and a school admin can view data about the learners and coaches in their school. This sharing is
                    inherent to how the platform works (it allows coaches and admins to do their job of mentoring and oversight).
                    These administrators are typically separate data controllers for your information within the platform context,
                    and they are expected to handle your data in line with their own privacy obligations.`}
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Business Transfers
                </h3>
                <p>
                    If SkillBNK undergoes a business transition such as a
                    merger, acquisition, corporate reorganization, or sale of
                    all or part of its assets, your personal information may be
                    transferred to the new owner or successor entity. In such
                    cases, we will ensure that the successor honors the
                    commitments we have made in this Privacy Policy or will
                    notify you if any changes to the processing of your personal
                    information will occur.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Legal Requirements and Safety
                </h3>
                <p>
                    We may disclose your information if required to do so by law
                    or in a good-faith belief that such action is necessary to
                    (a) comply with a legal obligation (for example, responding
                    to valid legal process like a subpoena or court order); (b)
                    protect and defend the rights or property of SkillBNK, our
                    users, or others; (c) prevent or investigate possible
                    wrongdoing in connection with the Services (such as fraud or
                    security incidents); or (d) protect the personal safety of
                    users of the Services or the public.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    With Your Consent
                </h3>
                <p>
                    Apart from the cases above, we will request your explicit
                    consent before sharing your personal information with third
                    parties for any other purpose. For instance, if we ever want
                    to use a testimonial or profile of you on our website, we
                    would ask for your permission.
                </p>

                <p className='mt-4'>
                    Importantly,{' '}
                    <strong>we do not sell your personal information</strong> to
                    third parties for monetary consideration or for their own
                    marketing purposes. Any sharing of data is done strictly for
                    the purposes of running our service or as otherwise
                    described in this policy.
                </p>
            </>
        ),
    },
    {
        id: 'data-retention',
        title: 'Data Retention',
        icon: Clock,
        content: (
            <>
                <p>
                    We retain personal data only for as long as it is necessary
                    to fulfill the purposes described in this Privacy Policy,
                    unless a longer retention period is required or permitted by
                    law. In general:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Active Accounts
                </h3>
                <p>
                    If you have an active account with SkillBNK, we will retain
                    your information for as long as needed to provide you with
                    the Services. This includes keeping your profile
                    information, course data, and other content available to you
                    and any other authorized users (e.g., coaches or admins in
                    your organization) while your account remains active.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Inactive Accounts
                </h3>
                <p>
                    If you stop using your account or it becomes inactive, we
                    may retain your data for a certain period in case you return
                    or to maintain records in accordance with our data retention
                    policy. We periodically review user accounts and may
                    anonymize or delete data for accounts that have been
                    inactive for a prolonged period (for example, 2 years),
                    unless we are required to keep it longer.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Account Deletion Requests
                </h3>
                <p>
                    If you choose to delete your account or request that we
                    delete your personal data, we will do so (after verifying
                    your identity), subject to any legal obligations that
                    require us to retain certain information. We will aim to
                    fulfill deletion requests promptly. However, please note
                    that residual copies of your information might not be
                    immediately removed from all backup systems (those will be
                    deleted according to routine backup deletion schedules), and
                    that we may retain information if necessary for legal
                    disputes, enforcement of our agreements, or compliance with
                    laws (for example, keeping proof of transactions for
                    accounting or retaining a record that we fulfilled a
                    deletion request).
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Training Content
                </h3>
                <p>
                    {`Content that you have created on the platform (such as course materials by coaches or submissions by learners)
                    may be retained as part of the course data for other users' ongoing use, even if you delete your account, as
                    it may be integral to a course that other users are still using. In such cases, we would anonymize or
                    disassociate your personal information from the content (for instance, the material might remain accessible,
                    but no longer attributed to you by name).`}
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Aggregated or Anonymized Data
                </h3>
                <p>
                    We may also retain data that has been aggregated or
                    anonymized such that it can no longer be linked to an
                    identifiable person. This data, which is not considered
                    personal information, may be kept indefinitely for purposes
                    of analytics, research, and improvements to our services.
                </p>

                <p className='mt-4'>
                    When we have no ongoing legitimate business need to process
                    your personal information, we will either delete it or
                    anonymize it. If deletion or anonymization is not feasible
                    (for example, because your personal data is stored in
                    archival backups), then we will securely store your personal
                    information and isolate it from any further processing until
                    deletion is possible.
                </p>
            </>
        ),
    },
    {
        id: 'security',
        title: 'Security Measures',
        icon: Lock,
        content: (
            <>
                <p>
                    We take the security of your personal information seriously.
                    SkillBNK implements a variety of technical and
                    organizational security measures to protect your data from
                    unauthorized access, alteration, disclosure, or destruction.
                    These measures include:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>Encryption</h3>
                <p>
                    We use encryption protocols (such as SSL/TLS) to secure data
                    transmission between your device and our servers. This means
                    data like your login credentials and other sensitive
                    exchanges are encrypted in transit. We also employ
                    encryption at rest for certain sensitive data stored in our
                    databases or file storage, whenever feasible.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Access Controls
                </h3>
                <p>
                    We restrict access to personal data to authorized personnel
                    who need it to operate our Services. Our staff are bound by
                    confidentiality obligations and trained in data protection
                    best practices. Administrative access to systems containing
                    personal data is limited and protected with strong
                    authentication (e.g., multi-factor authentication).
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Monitoring and Testing
                </h3>
                <p>
                    Our systems are monitored for security vulnerabilities and
                    potential attacks. We regularly update our software and
                    infrastructure to address security issues. We also perform
                    periodic security audits, penetration testing, and risk
                    assessments to continuously improve our defenses.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Secure Development Practices
                </h3>
                <p>
                    Our engineering team follows secure coding guidelines.
                    Before releasing new features or changes, we test them to
                    ensure they meet our security standards. We also maintain
                    data backups and have recovery procedures in place in case
                    of system failures or emergencies.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Third-Party Assurance
                </h3>
                <p>
                    When we use third-party service providers (for hosting,
                    payments, etc.), we choose reputable providers who
                    demonstrate strong security practices and relevant
                    certifications (such as compliance with SOC 2, ISO 27001, or
                    PCI-DSS for payment processors). We ensure that they
                    contractually commit to protecting personal data to a
                    standard comparable to our own policies.
                </p>

                <p className='mt-4'>
                    {` While we strive to protect your information, it's important to note that no method of transmission over the
                    internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security. You also have
                    a role in keeping your data safe: please maintain a strong password for your account, do not share your login
                    credentials, and notify us immediately if you suspect any unauthorized access to your account.`}
                </p>

                <p className='mt-4'>
                    In the unfortunate event of a data breach that affects your
                    personal information, we will notify you and the appropriate
                    authorities as required by law.
                </p>
            </>
        ),
    },
    {
        id: 'privacy-rights',
        title: 'Your Privacy Rights',
        icon: UserCheck,
        content: (
            <>
                <p>
                    {`Depending on where you reside, you may have certain rights regarding your personal information. SkillBNK
                    is committed to honoring the rights of users under applicable data protection laws, such as the European
                    Union's General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), among
                    others. This section outlines key rights and how you can exercise them:`}
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Rights for Individuals in the European Economic Area (GDPR
                    Rights)
                </h3>
                <p>
                    If you are in the EEA, UK, or a similar jurisdiction, you
                    have the following rights under GDPR (subject to certain
                    exceptions and limits):
                </p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Right to Access:</strong>{' '}
                        {`You have the right to request a copy of the personal data we hold about
                        you, as well as information about how we use and share it. We will provide this information, often called a
                        "Data Subject Access Request," free of charge (unless the requests are manifestly unfounded or excessive).`}
                    </li>
                    <li>
                        <strong>Right to Rectification:</strong> If any of your
                        personal information is inaccurate or incomplete, you
                        have the right to request that we correct or update it.
                        You can also make certain changes yourself in your
                        account settings.
                    </li>
                    <li>
                        <strong>Right to Erasure:</strong>{' '}
                        {`Also known as the "right to be forgotten," you can ask us to delete your
                        personal data. We will honor this request to the extent required by law. For example, we may need to retain
                        certain information for legal compliance, but we'll explain if that's the case.`}
                    </li>
                    <li>
                        <strong>Right to Restrict Processing:</strong> You can
                        request that we limit the processing of your data (for
                        instance, if you contest the accuracy of your data or
                        object to us processing it). We will review your request
                        and inform you before lifting any restriction.
                    </li>
                    <li>
                        <strong>Right to Data Portability:</strong> You have the
                        right to obtain your personal data in a common,
                        machine-readable format so you can reuse it or transfer
                        it to another service. We will provide it if applicable
                        (this typically applies to data you provided to us
                        directly).
                    </li>
                    <li>
                        <strong>Right to Object:</strong> You may object to our
                        processing of your personal data when we rely on{' '}
                        <strong>legitimate interests</strong> as the legal
                        basis. If you object, we will consider whether our
                        legitimate grounds override your rights and freedoms.
                        You also have an unconditional right to object to any
                        processing for direct marketing purposes; if you object,
                        we will stop using your data for marketing.
                    </li>
                    <li>
                        <strong>
                            Right Not to be Subject to Automated Decisions:
                        </strong>{' '}
                        SkillBNK does not use your personal data to make solely
                        automated decisions that have legal or similarly
                        significant effects on you (such as credit scoring or
                        hiring decisions). If we ever introduce such processes,
                        you would have the right not to be subject to a decision
                        based only on automated processing without human
                        involvement.
                    </li>
                    <li>
                        <strong>Right to Withdraw Consent:</strong> If we are
                        processing your personal information based on your
                        consent, you have the right to withdraw that consent at
                        any time. Withdrawing consent will not affect the
                        lawfulness of any processing we conducted prior to your
                        withdrawal, and it will not affect processing of your
                        personal data conducted in reliance on lawful processing
                        grounds other than consent.
                    </li>
                </ul>

                <p className='mt-4'>
                    To exercise any of these GDPR rights, please contact us (see{' '}
                    <strong>Contact Us</strong> section below). We may need to
                    verify your identity before fulfilling the request (to
                    protect your privacy). We will respond to your request
                    within the time required by law (typically within one month,
                    with the possibility of an extension for complex requests,
                    in which case we will inform you of the delay).
                </p>

                <p className='mt-4'>
                    You also have the right to lodge a complaint with your local
                    Data Protection Authority (DPA) if you believe that we have
                    infringed your privacy rights. We encourage you to contact
                    us first so we can address your concerns directly.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Rights for California Residents (CCPA/CPRA Rights)
                </h3>
                <p>
                    If you are a resident of California, you have specific
                    privacy rights under the California Consumer Privacy Act
                    (CCPA), as amended by the California Privacy Rights Act
                    (CPRA):
                </p>
                <ul className='list-disc pl-5 space-y-2'>
                    <li>
                        <strong>Right to Know:</strong> You can request that we
                        disclose to you certain information about the personal
                        data we have collected about you in the past 12 months.
                        This includes the categories of personal information
                        collected; the categories of sources of that
                        information; the business or commercial purpose for
                        collecting (or, if applicable, selling or sharing) the
                        information; the categories of third parties with whom
                        we share personal information; and the specific pieces
                        of personal information we have collected about you.
                    </li>
                    <li>
                        <strong>Right to Delete:</strong> You have the right to
                        request that we delete personal information we have
                        collected from you. Upon verifying a deletion request,
                        we will delete your personal information from our
                        records, unless an exception applies (for example, if we
                        need to retain certain data for security, to complete a
                        transaction you initiated, to comply with a legal
                        obligation, or other exceptions permitted by law).
                    </li>
                    <li>
                        <strong>Right to Correct:</strong> You may request that
                        we correct inaccurate personal information that we hold
                        about you.
                    </li>
                    <li>
                        <strong>Right to Opt-Out of Sale or Sharing:</strong>{' '}
                        {`The CCPA gives you the right to opt out of the "sale"
                        or certain "sharing" of your personal information.`}{' '}
                        <strong>Note:</strong> SkillBNK does <em>not</em> sell
                        personal information to third parties for monetary
                        value, and we do not share personal information for
                        cross-context behavioral advertising (targeted
                        advertising) in a way that would trigger the opt-out
                        right.
                        {`Therefore, in practice, there is no need for you to exercise this right on our platform because we don't
                        engage in selling or sharing personal data in that manner. If this ever changes, we will update this policy
                        and provide a clear way for you to exercise an opt-out (such as a "Do Not Sell or Share My Personal
                        Information" link on our website).`}
                    </li>
                    <li>
                        <strong>Right to Non-Discrimination:</strong> We will
                        not discriminate against you for exercising any of your
                        CCPA rights. This means we will not deny you our
                        Services, charge you a different price, or provide a
                        lesser quality of service because you made a privacy
                        rights request. (However, please note that if the
                        exercise of your rights limits our ability to process
                        your data – for instance, if you request deletion of
                        essential data – we may be unable to provide certain
                        services to you. We will inform you if such a situation
                        arises, but we will never retaliate or unfairly treat
                        you for exercising your rights.)
                    </li>
                    <li>
                        <strong>
                            Shine the Light (California Civil Code § 1798.83):
                        </strong>{' '}
                        {`Separate from CCPA, California's "Shine
                        the Light" law allows California residents to request certain information about our disclosure of personal
                        information to third parties for their own direct marketing purposes. SkillBNK does not share personal
                        information with third parties for their direct marketing without your consent. California residents may
                        request information about any such sharing by contacting us.`}
                    </li>
                </ul>

                <p className='mt-4'>
                    To exercise your California privacy rights, you or your
                    authorized agent may contact us (see{' '}
                    <strong>Contact Us</strong> below). We will ask you to
                    verify your identity (and authority, if through an agent)
                    and then respond to your request as required by law
                    (typically within 45 days). Some information may be exempt
                    from such requests under CCPA (for example, if the
                    information is needed to complete a transaction or for
                    certain legal compliance reasons). If we must decline your
                    request due to an exemption, we will explain our reasoning
                    to you.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Rights in Other Jurisdictions
                </h3>
                <p>
                    If you reside in a region or state that provides additional
                    privacy rights (for example, certain other U.S. states or
                    countries like Canada or Brazil), we will also honor those
                    rights in accordance with applicable laws. You can contact
                    us for more information specific to your region if needed.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Exercising Your Rights
                </h3>
                <p>
                    To make any privacy-related request or inquiry, please reach
                    out via the contact information provided below. We will do
                    our best to address your needs and explain any steps or
                    confirmations needed. Note that some rights can be exercised
                    directly by you: for example, you can update your profile
                    information through your account settings, or opt out of
                    marketing emails by using the unsubscribe link.
                </p>
            </>
        ),
    },
    {
        id: 'international-transfers',
        title: 'International Data Transfers',
        icon: Globe,
        content: (
            <>
                <p>
                    SkillBNK is a global platform. We and our service providers
                    may process and store your personal information in countries
                    outside of your own. For example, if you are in the European
                    Union, your data might be transferred to and stored on
                    servers in the United States or other countries. When we
                    transfer personal data out of the European Economic Area
                    (EEA) or other regions with data transfer restrictions, we
                    take steps to ensure your data receives an adequate level of
                    protection:
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Adequacy and Safeguards
                </h3>
                <p>
                    {`We rely on legal mechanisms such as the European Commission's Standard Contractual Clauses (SCCs) or other
                    approved transfer mechanisms to ensure that personal data transferred outside the EEA (or UK/Switzerland) has
                    equivalent protections. In some cases, transfers may be justified by an adequacy decision (if the destination
                    country's laws are recognized as protective) or through frameworks like the EU-U.S. Data Privacy Framework (if
                    applicable).`}
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Contractual Obligations
                </h3>
                <p>
                    Our contracts with third-party service providers include
                    data protection clauses that safeguard your information, no
                    matter where it is processed. These contracts require the
                    service provider to protect data in line with applicable
                    data protection laws and this Privacy Policy, even if the
                    data is transferred to a jurisdiction that may have
                    different privacy laws.
                </p>

                <h3 className='text-lg font-semibold mt-4 mb-2'>
                    Your Consent or Necessary Transfers
                </h3>
                <p>
                    In the absence of an adequacy decision or other safeguard,
                    we may in limited cases rely on your explicit consent to
                    transfer personal data, or the transfer may be necessary for
                    the performance of a contract with you (or to implement
                    pre-contractual measures at your request), or for the
                    conclusion or performance of a contract in your interest
                    between us and a third party.
                </p>

                <p className='mt-4'>
                    By using our Services or providing us with your information,
                    you understand that your personal data may be transferred to
                    and processed in countries other than your own. Regardless
                    of where your data is processed, we will handle it as
                    described in this Privacy Policy and in accordance with
                    applicable law.
                </p>

                <p className='mt-4'>
                    If you would like more information about our data transfer
                    practices or the safeguards we apply to international data
                    transfers, please contact us.
                </p>
            </>
        ),
    },
    {
        id: 'policy-changes',
        title: 'Changes to This Privacy Policy',
        icon: FileText,
        content: (
            <>
                <p>
                    {`We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal
                    requirements, or other factors. When we update the policy, we will revise the "Last updated" date at the top
                    of this document. If changes are significant, we may also provide more prominent notice of the change — for
                    example, by sending a notification email or by displaying a notice within the platform.`}
                </p>

                <p className='mt-4'>
                    We encourage you to review this Privacy Policy periodically
                    to stay informed about how we are protecting your
                    information.{' '}
                    <strong>
                        Continued use of SkillBNK after any updates to this
                        policy become effective will constitute your acceptance
                        of those changes.
                    </strong>{' '}
                    If you do not agree to the updated policy, you should stop
                    using our Services and you may request that we delete your
                    personal information.
                </p>
            </>
        ),
    },
];

export default PrivacyPolicyComp;
