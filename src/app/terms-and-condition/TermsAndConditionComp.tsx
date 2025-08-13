'use client';

import { useState } from 'react';
import {
    AlertCircle,
    BookOpen,
    Check,
    ChevronDown,
    FileText,
    Info,
    Lock,
    Shield,
    User,
    Zap,
    Building,
    CreditCard,
    Scale,
    RefreshCw,
    MessageSquare,
    Globe,
    Database,
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const TermsAndConditionComp = () => {
    const [expandAll, setExpandAll] = useState(false);

    const primaryColor = '#0736d1';

    return (
        <div className='my-container mx-auto px-4 py-8 mt-[60px] max-w-5xl'>
            <div className='bg-foreground rounded-lg shadow-lg p-6 md:p-8'>
                <header
                    className='mb-8 border-b pb-6'
                    style={{ borderColor: primaryColor }}
                >
                    <div className='flex items-center justify-between mb-4'>
                        <h1
                            className='text-3xl md:text-4xl font-bold'
                            style={{ color: primaryColor }}
                        >
                            Terms and Conditions
                        </h1>
                        <button
                            onClick={() => setExpandAll(!expandAll)}
                            className='flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm'
                            style={{ backgroundColor: primaryColor }}
                        >
                            {expandAll ? (
                                <Check size={16} />
                            ) : (
                                <ChevronDown size={16} />
                            )}
                            {expandAll ? 'Collapse All' : 'Expand All'}
                        </button>
                    </div>

                    <div className='flex flex-col md:flex-row md:items-center justify-between text-dark-gray'>
                        <p className='text-sm mb-2 md:mb-0'>
                            <span className='font-medium'>Last Updated:</span>{' '}
                            April 5, 2025
                        </p>
                        <address className='text-sm not-italic flex items-center'>
                            <Building size={16} className='mr-2' />
                            30500 Van Dyke Ave, Suite 201, Warren MI 48093 USA
                        </address>
                    </div>
                </header>

                <div className='space-y-6'>
                    <div
                        className='bg-blue-500/10 p-4 rounded-md border-l-4'
                        style={{ borderColor: primaryColor }}
                    >
                        <div className='flex items-start'>
                            <AlertCircle
                                className='mr-3 mt-1 flex-shrink-0 text-primary-white'
                                size={20}
                            />
                            <div>
                                <h2
                                    className='font-semibold mb-1'
                                    style={{ color: primaryColor }}
                                >
                                    Important Notice
                                </h2>
                                <p className='text-sm text-dark-gray'>
                                    By accessing or using our Services, you
                                    agree to be bound by these Terms and our
                                    Privacy Policy. If you do not agree with
                                    these Terms, you{' '}
                                    <strong>must not use</strong> the Services
                                    and should discontinue use immediately.
                                </p>
                            </div>
                        </div>
                    </div>

                    <TooltipProvider>
                        {expandAll ? (
                            <Accordion
                                type='multiple'
                                defaultValue={[
                                    'item-1',
                                    'item-2',
                                    'item-3',
                                    'item-4',
                                    'item-5',
                                    'item-6',
                                    'item-7',
                                    'item-8',
                                    'item-9',
                                    'item-10',
                                    'item-11',
                                    'item-12',
                                    'item-13',
                                    'item-14',
                                    'item-15',
                                ]}
                                className='space-y-4'
                            >
                                {/* Section 1 */}
                                <AccordionItem
                                    value='item-1'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 bg-background group'>
                                        <div className='flex items-center'>
                                            <FileText
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white text-primary-white'>
                                                1. Acceptance of Terms
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <p>
                                            Welcome to{' '}
                                            <strong
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                SkillBNK
                                            </strong>
                                            , an international SaaS-based
                                            AI-powered coaching platform (
                                            <strong>SkillBNK</strong>,{' '}
                                            <strong>we</strong>,
                                            <strong>us</strong>, or{' '}
                                            <strong>our</strong>). These Terms
                                            and Conditions (
                                            <strong>Terms</strong>) govern your
                                            access to and use of {`SkillBNK'`}s
                                            services, including our learner
                                            portal, individual/school branch
                                            admin portals, and company portal
                                            for multi-branch management
                                            (collectively, the{' '}
                                            <strong>Services</strong>). By
                                            accessing or using our Services, you
                                            agree to be bound by these Terms and
                                            our Privacy Policy (which is
                                            incorporated by reference). If you
                                            do not agree with these Terms, you{' '}
                                            <strong>must not use</strong> the
                                            Services and should discontinue use
                                            immediately.
                                        </p>

                                        <ul className='list-disc pl-6 space-y-3'>
                                            <li className='flex items-start'>
                                                <span className='font-semibold mr-2'>
                                                    Legally Binding Agreement:
                                                </span>
                                                <span>
                                                    By using the Services, you
                                                    affirm that you have read,
                                                    understood, and agree to
                                                    these Terms. If you are
                                                    using the Services on behalf
                                                    of an organization, you
                                                    represent that you are
                                                    authorized to accept these
                                                    Terms on that{' '}
                                                    {`organization's`} behalf
                                                    and that the organization
                                                    agrees to be responsible to
                                                    us if you or it violates
                                                    these Terms.
                                                </span>
                                            </li>

                                            <li className='flex items-start'>
                                                <span className='font-semibold mr-2'>
                                                    Minors:
                                                </span>
                                                <span>
                                                    All users who are minors
                                                    (generally under 18 years
                                                    old, or the age of majority
                                                    in your jurisdiction) may
                                                    use the Services{' '}
                                                    <strong>only</strong> with
                                                    the consent and supervision
                                                    of a parent or legal
                                                    guardian. If you are a
                                                    minor, your parent or
                                                    guardian must review and
                                                    accept these Terms on your
                                                    behalf before you use the
                                                    Services.
                                                </span>
                                            </li>

                                            <li className='flex items-start'>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className='flex items-center'>
                                                            <span className='font-semibold mr-2 flex items-center'>
                                                                International
                                                                Use{' '}
                                                                <Info
                                                                    size={14}
                                                                    className='ml-1 text-dark-gray'
                                                                />
                                                            </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className='max-w-xs'>
                                                        <p>
                                                            Users are
                                                            responsible for
                                                            complying with all
                                                            local laws in their
                                                            jurisdiction when
                                                            using our Services.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <span>
                                                    SkillBNK operates
                                                    internationally. We make no
                                                    representation that the
                                                    Services or content are
                                                    appropriate or available in
                                                    all countries or languages.
                                                    You are responsible for
                                                    compliance with all local
                                                    laws and regulations
                                                    applicable to your use of
                                                    the Services. Accessing the
                                                    Services from jurisdictions
                                                    where the content or
                                                    operation of the Services is
                                                    illegal is prohibited; if
                                                    you choose to access from
                                                    another location, you do so
                                                    on your own initiative and
                                                    are accountable for
                                                    following local laws.
                                                </span>
                                            </li>

                                            <li className='flex items-start'>
                                                <span className='font-semibold mr-2'>
                                                    Changes to Terms:
                                                </span>
                                                <span>
                                                    We reserve the right to
                                                    modify or update these Terms
                                                    at any time. If we make
                                                    material changes, we will
                                                    provide notice via the
                                                    Services or by email.
                                                    Updated Terms are effective
                                                    when posted (or as of the
                                                    effective date specified).
                                                    Continued use of the
                                                    Services after changes are
                                                    posted constitutes your
                                                    acceptance of the revised
                                                    Terms. If you do not agree
                                                    to the updated Terms, you
                                                    must stop using the
                                                    Services.
                                                </span>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 2 */}
                                <AccordionItem
                                    value='item-2'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <User
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                2. Eligibility and Accounts
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <div className='space-y-4'>
                                            <h3
                                                className='text-lg font-semibold'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                2.1 Eligibility Requirements
                                            </h3>
                                            <p>
                                                To use SkillBNK, you must meet
                                                the following eligibility
                                                criteria:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Age and Capacity:
                                                    </span>
                                                    <span>
                                                        You must be at least 18
                                                        years old (or the age of
                                                        legal majority in your
                                                        jurisdiction) to create
                                                        an account and use the
                                                        Services without
                                                        supervision. Minors may
                                                        only use the Services as
                                                        permitted under Section
                                                        1 (with
                                                        parental/guardian
                                                        consent). By using the
                                                        Services, you represent
                                                        that you have the legal
                                                        capacity to enter into a
                                                        binding contract.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Accuracy of Information:
                                                    </span>
                                                    <span>
                                                        You agree to provide
                                                        true, current, and
                                                        complete information
                                                        about yourself (or your
                                                        organization) as
                                                        prompted during account
                                                        registration or
                                                        purchase. You also agree
                                                        to update such
                                                        information promptly if
                                                        it changes, so that your
                                                        records remain accurate
                                                        and current. Providing
                                                        false information or
                                                        impersonating another
                                                        person or entity is
                                                        prohibited.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                2.2 Account Registration and
                                                Security
                                            </h3>
                                            <p>
                                                When you create an account on
                                                SkillBNK, you agree to the
                                                following:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Account Creation:
                                                    </span>
                                                    <span>
                                                        You may need to register
                                                        an account to access
                                                        certain features of the
                                                        Services. You must
                                                        provide a valid email
                                                        address and create a
                                                        secure password, along
                                                        with any other required
                                                        information. If
                                                        registering on behalf of
                                                        a company or group, you
                                                        must have authority to
                                                        bind that entity to
                                                        these Terms.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className='flex items-center'>
                                                                <span className='font-semibold mr-2 flex items-center'>
                                                                    Account
                                                                    Security{' '}
                                                                    <Lock
                                                                        size={
                                                                            14
                                                                        }
                                                                        className='ml-1 text-dark-gray'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs'>
                                                            <p>
                                                                Protect your
                                                                password and
                                                                never share your
                                                                account
                                                                credentials with
                                                                others.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span>
                                                        You are responsible for
                                                        maintaining the
                                                        confidentiality of your
                                                        login credentials and
                                                        for restricting access
                                                        to your account.{' '}
                                                        <strong>
                                                            Do not share
                                                        </strong>{' '}
                                                        your account or password
                                                        with others. You agree
                                                        to notify us immediately
                                                        at support@skillbnk.com
                                                        (or through the provided
                                                        support channels) of any
                                                        unauthorized use of your
                                                        account or any other
                                                        breach of security.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Responsibility for
                                                        Account Activity:
                                                    </span>
                                                    <span>
                                                        You are liable for all
                                                        activities that occur
                                                        under your account,
                                                        whether or not
                                                        authorized by you.
                                                        SkillBNK is not liable
                                                        for any loss or damage
                                                        arising from
                                                        unauthorized use of your
                                                        credentials. You should
                                                        use particular caution
                                                        when accessing your
                                                        account from a public or
                                                        shared device so that
                                                        others cannot view or
                                                        record your password or
                                                        personal information.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Multiple Branch or User
                                                        Accounts:
                                                    </span>
                                                    <span>
                                                        If you are a company or
                                                        organization using our
                                                        multi-branch portal or
                                                        creating sub-accounts
                                                        for administrators,
                                                        coaches, or learners,
                                                        you are responsible for
                                                        ensuring that all such
                                                        authorized users comply
                                                        with these Terms. We may
                                                        impose limits on the
                                                        number of accounts or
                                                        users per organization
                                                        and may charge
                                                        applicable fees for
                                                        enterprise features as
                                                        described in a separate
                                                        agreement or order form,
                                                        if applicable.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                2.3 User Conduct and Use
                                                Restrictions
                                            </h3>
                                            <p>
                                                As a condition of using the
                                                Services, you agree to adhere to
                                                the following conduct guidelines
                                                and <strong>not</strong> engage
                                                in any prohibited activities.{' '}
                                                <strong>
                                                    SkillBNK strictly forbids:
                                                </strong>
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Illegal or Harmful Use:
                                                    </span>
                                                    <span>
                                                        You may not use the
                                                        Services for any
                                                        unlawful purpose or to
                                                        promote illegal
                                                        activities. This
                                                        includes, but is not
                                                        limited to, posting
                                                        content that is
                                                        fraudulent, defamatory,
                                                        obscene, harassing,
                                                        threatening, or that
                                                        incites violence or
                                                        crime. You also may not
                                                        use the Services in a
                                                        manner that harms or
                                                        exploits minors in any
                                                        way (e.g. exposing them
                                                        to inappropriate content
                                                        or seeking to obtain
                                                        personally identifiable
                                                        information).
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Account Misuse:
                                                    </span>
                                                    <span>
                                                        Do not impersonate any
                                                        person or entity, or
                                                        misrepresent your
                                                        affiliation with a
                                                        person or entity. You
                                                        must not attempt to
                                                        access accounts or data
                                                        that do not belong to
                                                        you, nor engage in any
                                                        form of {`"spoofing"`}{' '}
                                                        or phishing to obtain
                                                        sensitive information
                                                        from others.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Security Circumvention:
                                                    </span>
                                                    <span>
                                                        You may not probe, scan,
                                                        or test the
                                                        vulnerability of any
                                                        system or network of
                                                        SkillBNK, or breach any
                                                        security or
                                                        authentication measures.{' '}
                                                        <strong>Do not</strong>{' '}
                                                        attempt to circumvent or
                                                        disable any content
                                                        protection or security
                                                        features of the
                                                        Services, or attempt to
                                                        reverse engineer,
                                                        decompile, or
                                                        disassemble any software
                                                        or feature of the
                                                        platform.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Automated Access:
                                                    </span>
                                                    <span>
                                                        You may not use bots,
                                                        spiders, scrapers, or
                                                        other automated means to
                                                        access or extract data
                                                        from the Services,{' '}
                                                        <strong>except</strong>{' '}
                                                        as expressly permitted
                                                        by us in writing.
                                                        Similarly, you may not
                                                        engage in
                                                        {` "framing," "mirroring,"`}{' '}
                                                        or otherwise simulating
                                                        the appearance or
                                                        function of the Services
                                                        for any purpose without
                                                        our prior permission.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Interference:
                                                    </span>
                                                    <span>
                                                        Do not disrupt or
                                                        interfere with the
                                                        operation or performance
                                                        of the Services or the
                                                        data contained therein.
                                                        This includes
                                                        transmitting any virus,
                                                        worm, logic bomb or any
                                                        other harmful or
                                                        disruptive code or doing
                                                        anything that imposes an
                                                        unreasonable load on our
                                                        infrastructure.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Unauthorized Commercial
                                                        Use:
                                                    </span>
                                                    <span>
                                                        You may use the Services
                                                        only for the intended
                                                        educational/coaching
                                                        purposes. You may not
                                                        resell, sublicense, or
                                                        otherwise use the
                                                        Services for the benefit
                                                        of any third party (for
                                                        example, as a service
                                                        bureau) without our
                                                        explicit consent. Using
                                                        the platform to
                                                        advertise or sell
                                                        products/services
                                                        unrelated to the
                                                        training content
                                                        provided through
                                                        SkillBNK, or to
                                                        distribute unsolicited
                                                        promotional or bulk
                                                        messages (spam), is
                                                        prohibited.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Data Mining and Copying:
                                                    </span>
                                                    <span>
                                                        Systematically
                                                        retrieving or scraping
                                                        data or content from the
                                                        Services to create a
                                                        collection or database
                                                        without written
                                                        permission is forbidden.
                                                        You also agree not to
                                                        copy, modify, reproduce,
                                                        or distribute any part
                                                        of the Services
                                                        (including other{' '}
                                                        {`users'`} content)
                                                        unless expressly allowed
                                                        by these Terms or by the
                                                        owner of that content.
                                                    </span>
                                                </li>
                                            </ul>

                                            <div className='bg-yellow-500/30 p-4 rounded-md border-l-4 border-yellow-400 mt-4'>
                                                <p className='text-sm text-dark-gray'>
                                                    Violating any of the above
                                                    may result in suspension or
                                                    termination of your account
                                                    (see Section 12) and could
                                                    subject you to civil and
                                                    criminal penalties. SkillBNK
                                                    reserves the right to
                                                    investigate occurrences that
                                                    may involve such violations
                                                    and may involve and
                                                    cooperate with law
                                                    enforcement authorities in
                                                    prosecuting users involved
                                                    in illegal activities.
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 3 */}
                                <AccordionItem
                                    value='item-3'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Globe
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                3. Our Services and Platform
                                                Usage
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <div className='space-y-4'>
                                            <h3
                                                className='text-lg font-semibold'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                3.1 Services Description
                                            </h3>
                                            <p>
                                                SkillBNK provides a technology
                                                platform designed to support the
                                                delivery of high-ticket training
                                                programs. Key features of our
                                                Services include:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li>
                                                    A{' '}
                                                    <strong>
                                                        Learner Portal
                                                    </strong>{' '}
                                                    for students or trainees to
                                                    access courses, bootcamps,
                                                    or coaching materials (which
                                                    may include live online
                                                    sessions, recorded videos,
                                                    assignments, quizzes, and
                                                    other educational content).
                                                </li>
                                                <li>
                                                    <strong>
                                                        Admin Portals
                                                    </strong>{' '}
                                                    for individual coaches or
                                                    branch/school administrators
                                                    to create, upload, and
                                                    manage courses and learner
                                                    progress.
                                                </li>
                                                <li>
                                                    A{' '}
                                                    <strong>
                                                        Company Portal
                                                    </strong>{' '}
                                                    enabling organizations with
                                                    multiple branches (or
                                                    sub-entities) to oversee and
                                                    coordinate training across
                                                    those branches, including
                                                    centralized monitoring of
                                                    performance and content
                                                    management.
                                                </li>
                                            </ul>

                                            <p>
                                                Bootcamps {`Hub's`} platform
                                                leverages artificial
                                                intelligence and automation to
                                                enhance the learning and
                                                teaching experience (for
                                                example, AI-driven content
                                                suggestions, analytics, or
                                                virtual coaching assistants).
                                                More details on our AI features
                                                are provided in Section 7. The
                                                Services are provided via our
                                                website and may also be
                                                accessible through mobile or
                                                desktop applications.
                                            </p>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                3.2 Global and Cross-Border Use
                                            </h3>
                                            <p>
                                                We operate as an international
                                                platform, meaning users can
                                                access the Services from various
                                                countries. While we strive to
                                                make SkillBNK accessible
                                                globally, we do not guarantee
                                                the Services are appropriate or
                                                lawful in every jurisdiction.
                                                You are solely responsible for
                                                how you use the Services in your
                                                locale. If any part of the
                                                Services, or your use of them,
                                                is contrary to local law in your
                                                location,{' '}
                                                <strong>
                                                    do not use the Services in
                                                    that way
                                                </strong>
                                                . We may limit availability of
                                                the Services or certain features
                                                in certain regions if required
                                                by local law or regulations.
                                            </p>

                                            <p>
                                                Additionally, note that SkillBNK
                                                is not specifically designed to
                                                comply with industry-specific
                                                regulations such as healthcare
                                                or financial data privacy laws
                                                (for example, SkillBNK is{' '}
                                                <strong>not</strong> HIPAA or
                                                FISMA compliant unless we
                                                explicitly state otherwise). If
                                                your use of the Services would
                                                be subject to laws requiring
                                                special data handling or
                                                compliance (e.g. protected
                                                health information, sensitive
                                                personal data, etc.), you should
                                                not use the Services for those
                                                purposes. You may not use the
                                                Services in any way that would
                                                cause us to be subject to
                                                regulations for which the
                                                Services are not intended (such
                                                as using the platform to store
                                                highly sensitive personal data
                                                in violation of privacy laws).
                                            </p>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                3.3 Third-Party Training Content
                                                and Providers
                                            </h3>
                                            <p>
                                                SkillBNK serves as a platform
                                                for both our own content and
                                                content offered by third-party
                                                coaches, instructors, or
                                                organizations (
                                                {`"${(<strong>Third-Party Providers</strong>)}"`}
                                                ). This means:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Content:
                                                    </span>
                                                    <span>
                                                        We may from time to time
                                                        provide our own
                                                        proprietary training
                                                        content or AI-generated
                                                        learning materials
                                                        through the platform.
                                                        Such content is
                                                        developed or curated by
                                                        us, and we strive to
                                                        ensure it is accurate
                                                        and valuable. However,
                                                        all content (whether
                                                        provided by us or
                                                        others) is
                                                        {`offered "as is"`}{' '}
                                                        without warranty (see
                                                        Section 13 on
                                                        Disclaimers).
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className='flex items-center'>
                                                                <span className='font-semibold mr-2 flex items-center'>
                                                                    Third-Party
                                                                    Provider
                                                                    Content{' '}
                                                                    <Info
                                                                        size={
                                                                            14
                                                                        }
                                                                        className='ml-1 text-dark-gray'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs'>
                                                            <p>
                                                                SkillBNK is not
                                                                responsible for
                                                                content created
                                                                by third-party
                                                                providers on the
                                                                platform.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span>
                                                        Many courses, bootcamps,
                                                        or coaching programs on
                                                        SkillBNK are created and
                                                        delivered by independent
                                                        coaches or organizations
                                                        that are not owned or
                                                        controlled by SkillBNK.
                                                        When you enroll in or
                                                        access content provided
                                                        by a Third-Party
                                                        Provider, you
                                                        acknowledge that:
                                                    </span>
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-12 space-y-3'>
                                                <li>
                                                    SkillBNK is{' '}
                                                    <strong>
                                                        not responsible or
                                                        liable
                                                    </strong>{' '}
                                                    for the content, quality,
                                                    timing, accuracy, or
                                                    legality of courses provided
                                                    by third parties. The
                                                    Third-Party Provider is
                                                    solely responsible for the
                                                    information and training
                                                    they deliver, including any
                                                    claims or promises about
                                                    results.
                                                </li>
                                                <li>
                                                    SkillBNK does not guarantee
                                                    any specific outcomes or
                                                    success from any training,
                                                    whether provided by us or by
                                                    a third party. Any
                                                    testimonials or examples of
                                                    success are illustrative and
                                                    not a guarantee that you
                                                    will achieve the same
                                                    results.
                                                </li>
                                                <li>
                                                    <strong>
                                                        No Endorsement:
                                                    </strong>{' '}
                                                    Bootcamps {`Hub's`}{' '}
                                                    provision of the platform to
                                                    third parties does not
                                                    constitute an endorsement or
                                                    verification of those
                                                    providers or their content.
                                                    We do not vet or
                                                    systematically monitor all
                                                    Third-Party Content. Users
                                                    should use their discretion
                                                    and conduct any necessary
                                                    research before relying on
                                                    or applying any training
                                                    advice from a third party.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Direct Agreements:
                                                    </strong>{' '}
                                                    In some cases, you (or your
                                                    employer or organization)
                                                    may have a direct contract
                                                    or agreement with a
                                                    Third-Party Provider (for
                                                    example, a company might
                                                    hire a coach for a private
                                                    program using SkillBNK as
                                                    the delivery platform).
                                                    These Terms do not alter the
                                                    terms of any separate
                                                    agreement you have with a
                                                    provider, but they govern
                                                    your use of the Bootcamps
                                                    Hub platform. Any disputes
                                                    or issues arising from the{' '}
                                                    <strong>content</strong> of
                                                    the training or the{' '}
                                                    {`provider's`} performance
                                                    should be addressed between
                                                    you and that provider.
                                                    SkillBNK will not be
                                                    responsible for resolving
                                                    such disputes, though we may
                                                    choose to assist or mediate
                                                    at our discretion.
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-6 space-y-3 mt-4'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Content Moderation:
                                                    </span>
                                                    <span>
                                                        We reserve the right
                                                        (but have no obligation)
                                                        to review, remove, or
                                                        disable access to any
                                                        content on the Services
                                                        that we determine, in
                                                        our sole discretion,
                                                        violates these Terms or
                                                        is otherwise
                                                        objectionable. This
                                                        could include
                                                        third-party course
                                                        materials or user posts
                                                        that are reported to us
                                                        as infringing,
                                                        inappropriate, or in
                                                        violation of law.
                                                        However, absent an
                                                        affirmative removal, the
                                                        presence of third-party
                                                        content on our platform
                                                        does not mean we have
                                                        reviewed or approved it.
                                                        You agree that Bootcamps
                                                        Hub shall not be liable
                                                        for any content provided
                                                        by third parties, and
                                                        that any use or reliance
                                                        on any content
                                                        (including third-party
                                                        courses) is at your own
                                                        risk.
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 4 */}
                                <AccordionItem
                                    value='item-4'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <CreditCard
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                4. Payments, Fees, and Refunds
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <div className='space-y-4'>
                                            <h3
                                                className='text-lg font-semibold'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                4.1 Payments Through Bootcamps
                                                Hub
                                            </h3>
                                            <p>
                                                SkillBNK may facilitate payments
                                                for certain courses,
                                                subscriptions, or services
                                                through the platform. For
                                                example, if you enroll in a paid
                                                online course or coaching
                                                program via our website, the
                                                payment might be processed by us
                                                or our third-party payment
                                                processors on behalf of the
                                                course provider. When making
                                                payments through SkillBNK, you
                                                agree to the following:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Payment Information:
                                                    </span>
                                                    <span>
                                                        You must provide
                                                        current, complete, and
                                                        accurate billing
                                                        information for all
                                                        purchases made via the
                                                        Services. This includes
                                                        your name, billing
                                                        address, payment method
                                                        details (e.g. credit
                                                        card number and
                                                        expiration date), and a
                                                        valid email address. You
                                                        represent that you have
                                                        the legal right to use
                                                        any payment method that
                                                        you provide.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Payment Processing:
                                                    </span>
                                                    <span>
                                                        Payments made through
                                                        the platform will
                                                        typically be processed
                                                        via third-party payment
                                                        processors (such as
                                                        Stripe, PayPal, or
                                                        others). By making a
                                                        payment, you authorize
                                                        SkillBNK or its payment
                                                        processors to charge the
                                                        amount to your selected
                                                        payment method.
                                                        Additional terms from
                                                        the payment processor
                                                        (such as a user
                                                        agreement or privacy
                                                        policy) may apply, and
                                                        SkillBNK is not
                                                        responsible for any
                                                        errors or security
                                                        breaches by these third
                                                        parties, except to the
                                                        extent required by law.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Pricing and Taxes:
                                                    </span>
                                                    <span>
                                                        All prices are shown in
                                                        the currency as
                                                        indicated (if not
                                                        indicated, it will be in
                                                        U.S. Dollars by
                                                        default). Prices for
                                                        courses or subscriptions
                                                        are subject to change at
                                                        any time at our
                                                        discretion. We will use
                                                        reasonable efforts to
                                                        notify you of any price
                                                        changes in advance, in
                                                        accordance with
                                                        applicable law. Listed
                                                        prices may not include
                                                        taxes; if any sales,
                                                        use, VAT, GST, or other
                                                        taxes apply to your
                                                        purchase, we may collect
                                                        those as required by
                                                        law. You are responsible
                                                        for any applicable taxes
                                                        or duties, except for
                                                        taxes based on our net
                                                        income.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className='flex items-center'>
                                                                <span className='font-semibold mr-2 flex items-center'>
                                                                    Subscriptions{' '}
                                                                    <RefreshCw
                                                                        size={
                                                                            14
                                                                        }
                                                                        className='ml-1 text-dark-gray'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs'>
                                                            <p>
                                                                Subscriptions
                                                                automatically
                                                                renew until
                                                                canceled. You
                                                                can cancel
                                                                anytime through
                                                                your account
                                                                settings.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span>
                                                        If you enroll in a
                                                        subscription-based
                                                        service (for example, a
                                                        monthly or annual
                                                        subscription to the
                                                        SkillBNK platform for
                                                        coaches or companies),
                                                        the following terms
                                                        apply:
                                                    </span>
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-12 space-y-3'>
                                                <li>
                                                    <strong>
                                                        Auto-Renewal:
                                                    </strong>{' '}
                                                    Your subscription will{' '}
                                                    <strong>
                                                        automatically renew
                                                    </strong>{' '}
                                                    at the end of each billing
                                                    cycle (e.g. monthly or
                                                    annually) unless you cancel
                                                    it prior to the renewal
                                                    date. By subscribing, you
                                                    authorize us to charge your
                                                    payment method automatically
                                                    at the beginning of each
                                                    renewal term for the
                                                    subscription fees and any
                                                    applicable taxes.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Free Trials:
                                                    </strong>{' '}
                                                    If we offer a free trial for
                                                    a subscription, it will
                                                    begin on the day you sign up
                                                    and last for the advertised
                                                    trial period. Unless you
                                                    cancel before the trial
                                                    ends, your provided payment
                                                    method will be charged the
                                                    applicable subscription fee
                                                    at the end of the trial. You
                                                    may only use a free trial
                                                    once (abusing multiple free
                                                    trials is a violation of
                                                    these Terms).
                                                </li>
                                                <li>
                                                    <strong>
                                                        Cancellation:
                                                    </strong>{' '}
                                                    You can cancel a
                                                    subscription at any time via
                                                    your account settings or by
                                                    contacting support. If you
                                                    cancel, you will continue to
                                                    have access to the
                                                    subscribed Services until
                                                    the end of your current paid
                                                    term, but{' '}
                                                    <strong>no refund</strong>{' '}
                                                    will be provided for the
                                                    remaining period (unless
                                                    required by law). We may
                                                    exceptionally provide
                                                    refunds or credits in case
                                                    of service issues or as
                                                    required under relevant
                                                    consumer protection laws,
                                                    but this is at our
                                                    discretion.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Fee Changes:
                                                    </strong>{' '}
                                                    We reserve the right to
                                                    change subscription fees. We
                                                    will give you advance notice
                                                    of any fee increase and the
                                                    opportunity to cancel before
                                                    it applies to you. If you do
                                                    not cancel, the new fee will
                                                    be charged at your next
                                                    billing cycle.
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-6 space-y-3 mt-4'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Order Confirmation:
                                                    </span>
                                                    <span>
                                                        When you make a purchase
                                                        on SkillBNK, you should
                                                        receive an email or
                                                        on-screen confirmation.
                                                        This confirms we have
                                                        received your order. If
                                                        you do not receive
                                                        confirmation, or if you
                                                        encounter errors during
                                                        payment, contact us to
                                                        confirm whether the
                                                        transaction was
                                                        successful{' '}
                                                        <strong>before</strong>{' '}
                                                        attempting the purchase
                                                        again to avoid duplicate
                                                        charges.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        No Circumvention:
                                                    </span>
                                                    <span>
                                                        Users (both learners and
                                                        providers) agree not to
                                                        circumvent the{' '}
                                                        {`platform's`} payment
                                                        systems. If a course or
                                                        service is offered via
                                                        SkillBNK, you should not
                                                        attempt to pay the
                                                        provider outside the
                                                        platform for the purpose
                                                        of avoiding fees or for
                                                        any other reason that
                                                        violates these Terms.
                                                        Conversely, providers
                                                        should not solicit
                                                        off-platform payments
                                                        from learners introduced
                                                        via Bootcamps Hub unless
                                                        it is part of a B2B
                                                        arrangement as described
                                                        below.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                4.2 External or Direct Payment
                                                Agreements (B2B Transactions)
                                            </h3>
                                            <p>
                                                SkillBNK recognizes that some
                                                training services facilitated
                                                through our platform may be
                                                arranged and paid for{' '}
                                                <strong>outside</strong> of our
                                                platform. For example, a company
                                                could engage a coach or training
                                                organization through a separate
                                                contract (B2B agreement), and
                                                then use SkillBNK as the
                                                delivery tool for that training.
                                                In such cases:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Platform Fees:
                                                    </span>
                                                    <span>
                                                        If your organization has
                                                        a separate enterprise
                                                        agreement with Bootcamps
                                                        Hub (for platform
                                                        licensing or usage),
                                                        payments for that
                                                        agreement will be
                                                        handled as per the terms
                                                        of that contract (often
                                                        via invoicing, etc.)
                                                        rather than through the
                                                        in-app payment system.
                                                        These Terms still apply
                                                        to your and your{' '}
                                                        {`users'`} conduct on
                                                        the platform, but the
                                                        financial and service
                                                        level commitments may be
                                                        outlined in the separate
                                                        agreement.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Third-Party Provider
                                                        Payments:
                                                    </span>
                                                    <span>
                                                        If you, as a learner or
                                                        client, are paying a
                                                        coach or training
                                                        company directly (off
                                                        the platform) for their
                                                        services, SkillBNK is
                                                        not a party to that
                                                        payment transaction.{' '}
                                                        <strong>
                                                            We do not handle or
                                                            assume
                                                            responsibility for
                                                            payments, refunds,
                                                            or billing disputes
                                                        </strong>{' '}
                                                        in such external
                                                        agreements. The terms of
                                                        payment, cancellation,
                                                        or refunds for the
                                                        training should be
                                                        defined between you and
                                                        the provider. For
                                                        example, if a company
                                                        has paid a coach
                                                        directly for a training
                                                        program hosted on
                                                        SkillBNK, any refund due
                                                        to cancellation would be
                                                        settled between those
                                                        parties without
                                                        Bootcamps {`Hub's`}{' '}
                                                        involvement.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Liability:
                                                    </span>
                                                    <span>
                                                        SkillBNK will not be
                                                        liable for any fees due,
                                                        paid, or unpaid, between
                                                        users and Third-Party
                                                        Providers outside of our
                                                        platform. Additionally,
                                                        Bootcamps Hub will not
                                                        mediate or resolve
                                                        disputes over such
                                                        payments. Our
                                                        responsibility is
                                                        limited to providing the
                                                        technology platform (and
                                                        any related services
                                                        explicitly agreed to)
                                                        for delivering the
                                                        content.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Exception – Bootcamps
                                                        Hub as Collector:
                                                    </span>
                                                    <span>
                                                        In some instances,
                                                        SkillBNK might act as a
                                                        payment collection agent
                                                        for a provider (for
                                                        example, enabling a link
                                                        or portal for a
                                                        third-party {`coach's`}{' '}
                                                        clients to pay through
                                                        SkillBNK). In those
                                                        cases, we simply
                                                        facilitate the payment
                                                        on behalf of the
                                                        provider, and the
                                                        ultimate financial
                                                        transaction is between
                                                        the provider and the
                                                        learner. We may deduct
                                                        any platform fees or
                                                        commissions as
                                                        applicable, and then
                                                        remit the balance to the
                                                        provider. Any issues
                                                        with the content or
                                                        delivery of the training
                                                        remain between the
                                                        provider and the
                                                        learner, though we will
                                                        assist where possible in
                                                        accordance with these
                                                        Terms and our policies.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                4.3 Refunds and Cancellation
                                                Policy
                                            </h3>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Courses and Services:
                                                    </span>
                                                    <span>
                                                        Except as expressly
                                                        provided otherwise (for
                                                        example, a money-back
                                                        guarantee offered by a
                                                        provider, or as required
                                                        by law),{' '}
                                                        <strong>
                                                            all sales of digital
                                                            products, courses,
                                                            or services through
                                                            SkillBNK are final
                                                            and non-refundable
                                                        </strong>{' '}
                                                        once access has been
                                                        granted or the program
                                                        has begun. This is
                                                        because users gain
                                                        immediate benefit from
                                                        course content/access.
                                                        If you believe
                                                        extraordinary
                                                        circumstances warrant a
                                                        refund, you may contact
                                                        us or the course
                                                        provider, but note that
                                                        issuance of refunds is
                                                        at our
                                                        {`(or the provider's)`}{' '}
                                                        discretion unless
                                                        mandated by applicable
                                                        law.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Subscription Refunds:
                                                    </span>
                                                    <span>
                                                        As noted, subscription
                                                        payments are generally
                                                        non-refundable for the
                                                        current billing period
                                                        after the service has
                                                        been provided. If you
                                                        cancel in the middle of
                                                        a paid period, you will
                                                        not receive a pro-rated
                                                        refund for the remaining
                                                        days. We will only
                                                        refund the subscription
                                                        fee if required under
                                                        local consumer law (such
                                                        as certain jurisdictions
                                                        giving a short
                                                        cancellation window for
                                                        online contracts) or if
                                                        we terminate your
                                                        subscription without
                                                        cause mid-term (in which
                                                        case we may provide a
                                                        pro-rata refund for the
                                                        unused portion).
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Chargebacks and Payment
                                                        Disputes:
                                                    </span>
                                                    <span>
                                                        Initiating a chargeback
                                                        or payment dispute with
                                                        your bank or credit card
                                                        for a valid charge may
                                                        lead to immediate
                                                        suspension of your
                                                        account. We encourage
                                                        you to contact us to
                                                        resolve any billing
                                                        issues amicably. If a
                                                        chargeback is received,
                                                        we reserve the right to
                                                        dispute it and to
                                                        recover the amount due,
                                                        plus any fees incurred,
                                                        through legal means.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Errors and Corrections:
                                                    </span>
                                                    <span>
                                                        In case of a pricing
                                                        error or incorrect
                                                        charge (for instance, if
                                                        a course was listed at
                                                        the wrong price or you
                                                        were charged an
                                                        incorrect amount), we
                                                        reserve the right to
                                                        correct the error. If
                                                        you were overcharged, we
                                                        will refund the
                                                        difference. If you were
                                                        undercharged or a
                                                        payment did not properly
                                                        go through, we will
                                                        contact you to arrange
                                                        payment of the
                                                        outstanding amount, and
                                                        we reserve the right to
                                                        obtain the owed fees. We
                                                        also reserve the right
                                                        to cancel or refuse any
                                                        order placed due to
                                                        obvious errors or
                                                        suspected fraud.
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Additional sections would continue here... */}
                                {/* For brevity, I'm showing just the first 4 sections in detail */}

                                {/* Section 5 */}
                                <AccordionItem
                                    value='item-5'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <BookOpen
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                5. Intellectual Property Rights
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            {`This section covers ownership of content on the platform, including SkillBNK's intellectual
                                        property, user-generated content, and third-party materials. It outlines the licenses granted for
                                        using content and the restrictions on usage.`}
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Key points include: Bootcamps
                                                Hub retains ownership of
                                                platform design and branding;
                                                users retain ownership of their
                                                uploaded content but grant us a
                                                license to host and display it;
                                                and users warrant they have
                                                rights to any content they
                                                upload.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 6 */}
                                <AccordionItem
                                    value='item-6'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Zap
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                6. AI and Automation Features
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section explains how Bootcamps
                                            Hub uses artificial intelligence and
                                            automation to enhance the learning
                                            experience, including AI-generated
                                            content, automated feedback, and
                                            analytics.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                {`Important disclaimers: AI-generated content is provided "as is" and may not always be accurate; AI
                                            outputs should not be treated as professional advice; users are responsible for reviewing AI
                                            outputs before use; and SkillBNK is not liable for outcomes from using AI features.`}
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 7 */}
                                <AccordionItem
                                    value='item-7'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Database
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                7. Data Privacy and Security
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section summarizes how we
                                            collect, use, store, and protect
                                            your personal information,
                                            referencing our Privacy Policy for
                                            complete details.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Key points include: data
                                                security measures; international
                                                data transfers; third-party
                                                service providers; user
                                                communications; data rights; and
                                                data retention policies.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 8 */}
                                <AccordionItem
                                    value='item-8'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <AlertCircle
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                8. Termination and Suspension
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section outlines how you can
                                            terminate your account and how
                                            SkillBNK may suspend or terminate
                                            your access to the Services.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Key points include: account
                                                deletion procedures;
                                                circumstances under which we may
                                                terminate your account; effects
                                                of termination on content and
                                                access; and our right to
                                                discontinue services.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 9 */}
                                <AccordionItem
                                    value='item-9'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Shield
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                9. Disclaimers of Warranties
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            {`This section explains that SkillBNK provides the Services "AS IS" and "AS AVAILABLE" without
                                        warranties of any kind.`}
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                We disclaim warranties regarding
                                                service availability, content
                                                accuracy, outcomes from using
                                                the platform, and third-party
                                                responsibility. Consumer rights
                                                in certain jurisdictions may
                                                still apply.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Sections 10-15 */}
                                {/* Similar structure for remaining sections */}
                                <AccordionItem
                                    value='item-10'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Scale
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                10. Limitation of Liability
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            {`This section limits SkillBNK's liability for damages arising from your use of the Services.`}
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                We are not liable for indirect,
                                                consequential, or punitive
                                                damages. Our total liability is
                                                limited to the greater of fees
                                                paid in the last six months or
                                                $100, with exceptions as
                                                required by law.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-11'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Shield
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                11. Indemnification
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section requires you to defend
                                            and hold harmless SkillBNK from
                                            claims arising from your use of the
                                            Services.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                You must indemnify us against
                                                claims related to your content,
                                                violations of these Terms, and
                                                disputes with other users that
                                                involve us.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-12'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Scale
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                12. Governing Law and Dispute
                                                Resolution
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section establishes the laws
                                            and jurisdiction that govern these
                                            Terms and any disputes.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                These Terms are governed by
                                                Delaware law. Disputes will be
                                                resolved in Delaware courts,
                                                with exceptions for consumer
                                                rights in other jurisdictions.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-13'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <RefreshCw
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                13. Updates to Services and
                                                Terms
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section explains how and why we
                                            may update the Services and these
                                            Terms.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                We may modify the platform and
                                                these Terms. Continued use after
                                                changes constitutes acceptance
                                                of the updated Terms.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-14'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <FileText
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                14. Miscellaneous Provisions
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section covers various
                                            additional legal provisions
                                            important for interpreting these
                                            Terms.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Includes provisions on entire
                                                agreement, no waiver,
                                                severability, assignment,
                                                third-party beneficiaries,
                                                relationship of parties, force
                                                majeure, notices, and language.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-15'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <MessageSquare
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                15. Contact Information
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <div className='space-y-4'>
                                            <p>
                                                If you have any questions,
                                                concerns, or feedback about
                                                these Terms or the Services,
                                                please feel free to contact us.
                                                We value open communication and
                                                will do our best to address your
                                                inquiry promptly.
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Support Email:
                                                    </span>
                                                    <span>
                                                        support@skillbnk.com
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Address:
                                                    </span>
                                                    <span>
                                                        30500 Van Dyke Ave,
                                                        Suite 201, Warren MI
                                                        48093 USA
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Website:
                                                    </span>
                                                    <span>
                                                        https://www.bootcampshub.ai
                                                        (you can find further
                                                        contact links or forms
                                                        on our site)
                                                    </span>
                                                </li>
                                            </ul>

                                            <p className='mt-6'>
                                                By using SkillBNK, you
                                                acknowledge that you have read,
                                                understood, and agreed to these
                                                Terms and Conditions. Thank you
                                                for being a part of the SkillBNK
                                                community, and we wish you an
                                                enriching learning and coaching
                                                experience on our platform!
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ) : (
                            <Accordion
                                type='single'
                                defaultValue='item-1'
                                className='space-y-4'
                            >
                                {/* Section 1 */}
                                <AccordionItem
                                    value='item-1'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 bg-background group'>
                                        <div className='flex items-center'>
                                            <FileText
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white text-primary-white'>
                                                1. Acceptance of Terms
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <p>
                                            Welcome to{' '}
                                            <strong
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                SkillBNK
                                            </strong>
                                            , an international SaaS-based
                                            AI-powered coaching platform (
                                            <strong>SkillBNK</strong>,{' '}
                                            <strong>we</strong>,
                                            <strong>us</strong>, or{' '}
                                            <strong>our</strong>). These Terms
                                            and Conditions (
                                            <strong>Terms</strong>) govern your
                                            access to and use of {`SkillBNK'`}s
                                            services, including our learner
                                            portal, individual/school branch
                                            admin portals, and company portal
                                            for multi-branch management
                                            (collectively, the{' '}
                                            <strong>Services</strong>). By
                                            accessing or using our Services, you
                                            agree to be bound by these Terms and
                                            our Privacy Policy (which is
                                            incorporated by reference). If you
                                            do not agree with these Terms, you{' '}
                                            <strong>must not use</strong> the
                                            Services and should discontinue use
                                            immediately.
                                        </p>

                                        <ul className='list-disc pl-6 space-y-3'>
                                            <li className='flex items-start'>
                                                <span className='font-semibold mr-2'>
                                                    Legally Binding Agreement:
                                                </span>
                                                <span>
                                                    By using the Services, you
                                                    affirm that you have read,
                                                    understood, and agree to
                                                    these Terms. If you are
                                                    using the Services on behalf
                                                    of an organization, you
                                                    represent that you are
                                                    authorized to accept these
                                                    Terms on that{' '}
                                                    {`organization's`} behalf
                                                    and that the organization
                                                    agrees to be responsible to
                                                    us if you or it violates
                                                    these Terms.
                                                </span>
                                            </li>

                                            <li className='flex items-start'>
                                                <span className='font-semibold mr-2'>
                                                    Minors:
                                                </span>
                                                <span>
                                                    All users who are minors
                                                    (generally under 18 years
                                                    old, or the age of majority
                                                    in your jurisdiction) may
                                                    use the Services{' '}
                                                    <strong>only</strong> with
                                                    the consent and supervision
                                                    of a parent or legal
                                                    guardian. If you are a
                                                    minor, your parent or
                                                    guardian must review and
                                                    accept these Terms on your
                                                    behalf before you use the
                                                    Services.
                                                </span>
                                            </li>

                                            <li className='flex items-start'>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className='flex items-center'>
                                                            <span className='font-semibold mr-2 flex items-center'>
                                                                International
                                                                Use{' '}
                                                                <Info
                                                                    size={14}
                                                                    className='ml-1 text-dark-gray'
                                                                />
                                                            </span>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className='max-w-xs'>
                                                        <p>
                                                            Users are
                                                            responsible for
                                                            complying with all
                                                            local laws in their
                                                            jurisdiction when
                                                            using our Services.
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                                <span>
                                                    SkillBNK operates
                                                    internationally. We make no
                                                    representation that the
                                                    Services or content are
                                                    appropriate or available in
                                                    all countries or languages.
                                                    You are responsible for
                                                    compliance with all local
                                                    laws and regulations
                                                    applicable to your use of
                                                    the Services. Accessing the
                                                    Services from jurisdictions
                                                    where the content or
                                                    operation of the Services is
                                                    illegal is prohibited; if
                                                    you choose to access from
                                                    another location, you do so
                                                    on your own initiative and
                                                    are accountable for
                                                    following local laws.
                                                </span>
                                            </li>

                                            <li className='flex items-start'>
                                                <span className='font-semibold mr-2'>
                                                    Changes to Terms:
                                                </span>
                                                <span>
                                                    We reserve the right to
                                                    modify or update these Terms
                                                    at any time. If we make
                                                    material changes, we will
                                                    provide notice via the
                                                    Services or by email.
                                                    Updated Terms are effective
                                                    when posted (or as of the
                                                    effective date specified).
                                                    Continued use of the
                                                    Services after changes are
                                                    posted constitutes your
                                                    acceptance of the revised
                                                    Terms. If you do not agree
                                                    to the updated Terms, you
                                                    must stop using the
                                                    Services.
                                                </span>
                                            </li>
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 2 */}
                                <AccordionItem
                                    value='item-2'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <User
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                2. Eligibility and Accounts
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <div className='space-y-4'>
                                            <h3
                                                className='text-lg font-semibold'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                2.1 Eligibility Requirements
                                            </h3>
                                            <p>
                                                To use SkillBNK, you must meet
                                                the following eligibility
                                                criteria:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Age and Capacity:
                                                    </span>
                                                    <span>
                                                        You must be at least 18
                                                        years old (or the age of
                                                        legal majority in your
                                                        jurisdiction) to create
                                                        an account and use the
                                                        Services without
                                                        supervision. Minors may
                                                        only use the Services as
                                                        permitted under Section
                                                        1 (with
                                                        parental/guardian
                                                        consent). By using the
                                                        Services, you represent
                                                        that you have the legal
                                                        capacity to enter into a
                                                        binding contract.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Accuracy of Information:
                                                    </span>
                                                    <span>
                                                        You agree to provide
                                                        true, current, and
                                                        complete information
                                                        about yourself (or your
                                                        organization) as
                                                        prompted during account
                                                        registration or
                                                        purchase. You also agree
                                                        to update such
                                                        information promptly if
                                                        it changes, so that your
                                                        records remain accurate
                                                        and current. Providing
                                                        false information or
                                                        impersonating another
                                                        person or entity is
                                                        prohibited.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                2.2 Account Registration and
                                                Security
                                            </h3>
                                            <p>
                                                When you create an account on
                                                SkillBNK, you agree to the
                                                following:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Account Creation:
                                                    </span>
                                                    <span>
                                                        You may need to register
                                                        an account to access
                                                        certain features of the
                                                        Services. You must
                                                        provide a valid email
                                                        address and create a
                                                        secure password, along
                                                        with any other required
                                                        information. If
                                                        registering on behalf of
                                                        a company or group, you
                                                        must have authority to
                                                        bind that entity to
                                                        these Terms.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className='flex items-center'>
                                                                <span className='font-semibold mr-2 flex items-center'>
                                                                    Account
                                                                    Security{' '}
                                                                    <Lock
                                                                        size={
                                                                            14
                                                                        }
                                                                        className='ml-1 text-dark-gray'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs'>
                                                            <p>
                                                                Protect your
                                                                password and
                                                                never share your
                                                                account
                                                                credentials with
                                                                others.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span>
                                                        You are responsible for
                                                        maintaining the
                                                        confidentiality of your
                                                        login credentials and
                                                        for restricting access
                                                        to your account.{' '}
                                                        <strong>
                                                            Do not share
                                                        </strong>{' '}
                                                        your account or password
                                                        with others. You agree
                                                        to notify us immediately
                                                        at support@skillbnk.com
                                                        (or through the provided
                                                        support channels) of any
                                                        unauthorized use of your
                                                        account or any other
                                                        breach of security.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Responsibility for
                                                        Account Activity:
                                                    </span>
                                                    <span>
                                                        You are liable for all
                                                        activities that occur
                                                        under your account,
                                                        whether or not
                                                        authorized by you.
                                                        SkillBNK is not liable
                                                        for any loss or damage
                                                        arising from
                                                        unauthorized use of your
                                                        credentials. You should
                                                        use particular caution
                                                        when accessing your
                                                        account from a public or
                                                        shared device so that
                                                        others cannot view or
                                                        record your password or
                                                        personal information.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Multiple Branch or User
                                                        Accounts:
                                                    </span>
                                                    <span>
                                                        If you are a company or
                                                        organization using our
                                                        multi-branch portal or
                                                        creating sub-accounts
                                                        for administrators,
                                                        coaches, or learners,
                                                        you are responsible for
                                                        ensuring that all such
                                                        authorized users comply
                                                        with these Terms. We may
                                                        impose limits on the
                                                        number of accounts or
                                                        users per organization
                                                        and may charge
                                                        applicable fees for
                                                        enterprise features as
                                                        described in a separate
                                                        agreement or order form,
                                                        if applicable.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                2.3 User Conduct and Use
                                                Restrictions
                                            </h3>
                                            <p>
                                                As a condition of using the
                                                Services, you agree to adhere to
                                                the following conduct guidelines
                                                and <strong>not</strong> engage
                                                in any prohibited activities.{' '}
                                                <strong>
                                                    SkillBNK strictly forbids:
                                                </strong>
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Illegal or Harmful Use:
                                                    </span>
                                                    <span>
                                                        You may not use the
                                                        Services for any
                                                        unlawful purpose or to
                                                        promote illegal
                                                        activities. This
                                                        includes, but is not
                                                        limited to, posting
                                                        content that is
                                                        fraudulent, defamatory,
                                                        obscene, harassing,
                                                        threatening, or that
                                                        incites violence or
                                                        crime. You also may not
                                                        use the Services in a
                                                        manner that harms or
                                                        exploits minors in any
                                                        way (e.g. exposing them
                                                        to inappropriate content
                                                        or seeking to obtain
                                                        personally identifiable
                                                        information).
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Account Misuse:
                                                    </span>
                                                    <span>
                                                        Do not impersonate any
                                                        person or entity, or
                                                        misrepresent your
                                                        affiliation with a
                                                        person or entity. You
                                                        must not attempt to
                                                        access accounts or data
                                                        that do not belong to
                                                        you, nor engage in any
                                                        form of {`"spoofing"`}{' '}
                                                        or phishing to obtain
                                                        sensitive information
                                                        from others.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Security Circumvention:
                                                    </span>
                                                    <span>
                                                        You may not probe, scan,
                                                        or test the
                                                        vulnerability of any
                                                        system or network of
                                                        SkillBNK, or breach any
                                                        security or
                                                        authentication measures.{' '}
                                                        <strong>Do not</strong>{' '}
                                                        attempt to circumvent or
                                                        disable any content
                                                        protection or security
                                                        features of the
                                                        Services, or attempt to
                                                        reverse engineer,
                                                        decompile, or
                                                        disassemble any software
                                                        or feature of the
                                                        platform.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Automated Access:
                                                    </span>
                                                    <span>
                                                        You may not use bots,
                                                        spiders, scrapers, or
                                                        other automated means to
                                                        access or extract data
                                                        from the Services,{' '}
                                                        <strong>except</strong>{' '}
                                                        as expressly permitted
                                                        by us in writing.
                                                        Similarly, you may not
                                                        engage in
                                                        {` "framing," "mirroring,"`}{' '}
                                                        or otherwise simulating
                                                        the appearance or
                                                        function of the Services
                                                        for any purpose without
                                                        our prior permission.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Interference:
                                                    </span>
                                                    <span>
                                                        Do not disrupt or
                                                        interfere with the
                                                        operation or performance
                                                        of the Services or the
                                                        data contained therein.
                                                        This includes
                                                        transmitting any virus,
                                                        worm, logic bomb or any
                                                        other harmful or
                                                        disruptive code or doing
                                                        anything that imposes an
                                                        unreasonable load on our
                                                        infrastructure.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Unauthorized Commercial
                                                        Use:
                                                    </span>
                                                    <span>
                                                        You may use the Services
                                                        only for the intended
                                                        educational/coaching
                                                        purposes. You may not
                                                        resell, sublicense, or
                                                        otherwise use the
                                                        Services for the benefit
                                                        of any third party (for
                                                        example, as a service
                                                        bureau) without our
                                                        explicit consent. Using
                                                        the platform to
                                                        advertise or sell
                                                        products/services
                                                        unrelated to the
                                                        training content
                                                        provided through
                                                        SkillBNK, or to
                                                        distribute unsolicited
                                                        promotional or bulk
                                                        messages (spam), is
                                                        prohibited.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Data Mining and Copying:
                                                    </span>
                                                    <span>
                                                        Systematically
                                                        retrieving or scraping
                                                        data or content from the
                                                        Services to create a
                                                        collection or database
                                                        without written
                                                        permission is forbidden.
                                                        You also agree not to
                                                        copy, modify, reproduce,
                                                        or distribute any part
                                                        of the Services
                                                        (including other{' '}
                                                        {`users'`} content)
                                                        unless expressly allowed
                                                        by these Terms or by the
                                                        owner of that content.
                                                    </span>
                                                </li>
                                            </ul>

                                            <div className='bg-yellow-500/30 p-4 rounded-md border-l-4 border-yellow-400 mt-4'>
                                                <p className='text-sm text-dark-gray'>
                                                    Violating any of the above
                                                    may result in suspension or
                                                    termination of your account
                                                    (see Section 12) and could
                                                    subject you to civil and
                                                    criminal penalties. SkillBNK
                                                    reserves the right to
                                                    investigate occurrences that
                                                    may involve such violations
                                                    and may involve and
                                                    cooperate with law
                                                    enforcement authorities in
                                                    prosecuting users involved
                                                    in illegal activities.
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 3 */}
                                <AccordionItem
                                    value='item-3'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Globe
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                3. Our Services and Platform
                                                Usage
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <div className='space-y-4'>
                                            <h3
                                                className='text-lg font-semibold'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                3.1 Services Description
                                            </h3>
                                            <p>
                                                SkillBNK provides a technology
                                                platform designed to support the
                                                delivery of high-ticket training
                                                programs. Key features of our
                                                Services include:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li>
                                                    A{' '}
                                                    <strong>
                                                        Learner Portal
                                                    </strong>{' '}
                                                    for students or trainees to
                                                    access courses, bootcamps,
                                                    or coaching materials (which
                                                    may include live online
                                                    sessions, recorded videos,
                                                    assignments, quizzes, and
                                                    other educational content).
                                                </li>
                                                <li>
                                                    <strong>
                                                        Admin Portals
                                                    </strong>{' '}
                                                    for individual coaches or
                                                    branch/school administrators
                                                    to create, upload, and
                                                    manage courses and learner
                                                    progress.
                                                </li>
                                                <li>
                                                    A{' '}
                                                    <strong>
                                                        Company Portal
                                                    </strong>{' '}
                                                    enabling organizations with
                                                    multiple branches (or
                                                    sub-entities) to oversee and
                                                    coordinate training across
                                                    those branches, including
                                                    centralized monitoring of
                                                    performance and content
                                                    management.
                                                </li>
                                            </ul>

                                            <p>
                                                Bootcamps {`Hub's`} platform
                                                leverages artificial
                                                intelligence and automation to
                                                enhance the learning and
                                                teaching experience (for
                                                example, AI-driven content
                                                suggestions, analytics, or
                                                virtual coaching assistants).
                                                More details on our AI features
                                                are provided in Section 7. The
                                                Services are provided via our
                                                website and may also be
                                                accessible through mobile or
                                                desktop applications.
                                            </p>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                3.2 Global and Cross-Border Use
                                            </h3>
                                            <p>
                                                We operate as an international
                                                platform, meaning users can
                                                access the Services from various
                                                countries. While we strive to
                                                make SkillBNK accessible
                                                globally, we do not guarantee
                                                the Services are appropriate or
                                                lawful in every jurisdiction.
                                                You are solely responsible for
                                                how you use the Services in your
                                                locale. If any part of the
                                                Services, or your use of them,
                                                is contrary to local law in your
                                                location,{' '}
                                                <strong>
                                                    do not use the Services in
                                                    that way
                                                </strong>
                                                . We may limit availability of
                                                the Services or certain features
                                                in certain regions if required
                                                by local law or regulations.
                                            </p>

                                            <p>
                                                Additionally, note that SkillBNK
                                                is not specifically designed to
                                                comply with industry-specific
                                                regulations such as healthcare
                                                or financial data privacy laws
                                                (for example, SkillBNK is{' '}
                                                <strong>not</strong> HIPAA or
                                                FISMA compliant unless we
                                                explicitly state otherwise). If
                                                your use of the Services would
                                                be subject to laws requiring
                                                special data handling or
                                                compliance (e.g. protected
                                                health information, sensitive
                                                personal data, etc.), you should
                                                not use the Services for those
                                                purposes. You may not use the
                                                Services in any way that would
                                                cause us to be subject to
                                                regulations for which the
                                                Services are not intended (such
                                                as using the platform to store
                                                highly sensitive personal data
                                                in violation of privacy laws).
                                            </p>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                3.3 Third-Party Training Content
                                                and Providers
                                            </h3>
                                            <p>
                                                SkillBNK serves as a platform
                                                for both our own content and
                                                content offered by third-party
                                                coaches, instructors, or
                                                organizations (
                                                {`"${(<strong>Third-Party Providers</strong>)}"`}
                                                ). This means:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Content:
                                                    </span>
                                                    <span>
                                                        We may from time to time
                                                        provide our own
                                                        proprietary training
                                                        content or AI-generated
                                                        learning materials
                                                        through the platform.
                                                        Such content is
                                                        developed or curated by
                                                        us, and we strive to
                                                        ensure it is accurate
                                                        and valuable. However,
                                                        all content (whether
                                                        provided by us or
                                                        others) is
                                                        {`offered "as is"`}{' '}
                                                        without warranty (see
                                                        Section 13 on
                                                        Disclaimers).
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className='flex items-center'>
                                                                <span className='font-semibold mr-2 flex items-center'>
                                                                    Third-Party
                                                                    Provider
                                                                    Content{' '}
                                                                    <Info
                                                                        size={
                                                                            14
                                                                        }
                                                                        className='ml-1 text-dark-gray'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs'>
                                                            <p>
                                                                SkillBNK is not
                                                                responsible for
                                                                content created
                                                                by third-party
                                                                providers on the
                                                                platform.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span>
                                                        Many courses, bootcamps,
                                                        or coaching programs on
                                                        SkillBNK are created and
                                                        delivered by independent
                                                        coaches or organizations
                                                        that are not owned or
                                                        controlled by SkillBNK.
                                                        When you enroll in or
                                                        access content provided
                                                        by a Third-Party
                                                        Provider, you
                                                        acknowledge that:
                                                    </span>
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-12 space-y-3'>
                                                <li>
                                                    SkillBNK is{' '}
                                                    <strong>
                                                        not responsible or
                                                        liable
                                                    </strong>{' '}
                                                    for the content, quality,
                                                    timing, accuracy, or
                                                    legality of courses provided
                                                    by third parties. The
                                                    Third-Party Provider is
                                                    solely responsible for the
                                                    information and training
                                                    they deliver, including any
                                                    claims or promises about
                                                    results.
                                                </li>
                                                <li>
                                                    SkillBNK does not guarantee
                                                    any specific outcomes or
                                                    success from any training,
                                                    whether provided by us or by
                                                    a third party. Any
                                                    testimonials or examples of
                                                    success are illustrative and
                                                    not a guarantee that you
                                                    will achieve the same
                                                    results.
                                                </li>
                                                <li>
                                                    <strong>
                                                        No Endorsement:
                                                    </strong>{' '}
                                                    Bootcamps {`Hub's`}{' '}
                                                    provision of the platform to
                                                    third parties does not
                                                    constitute an endorsement or
                                                    verification of those
                                                    providers or their content.
                                                    We do not vet or
                                                    systematically monitor all
                                                    Third-Party Content. Users
                                                    should use their discretion
                                                    and conduct any necessary
                                                    research before relying on
                                                    or applying any training
                                                    advice from a third party.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Direct Agreements:
                                                    </strong>{' '}
                                                    In some cases, you (or your
                                                    employer or organization)
                                                    may have a direct contract
                                                    or agreement with a
                                                    Third-Party Provider (for
                                                    example, a company might
                                                    hire a coach for a private
                                                    program using SkillBNK as
                                                    the delivery platform).
                                                    These Terms do not alter the
                                                    terms of any separate
                                                    agreement you have with a
                                                    provider, but they govern
                                                    your use of the Bootcamps
                                                    Hub platform. Any disputes
                                                    or issues arising from the{' '}
                                                    <strong>content</strong> of
                                                    the training or the{' '}
                                                    {`provider's`} performance
                                                    should be addressed between
                                                    you and that provider.
                                                    SkillBNK will not be
                                                    responsible for resolving
                                                    such disputes, though we may
                                                    choose to assist or mediate
                                                    at our discretion.
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-6 space-y-3 mt-4'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Content Moderation:
                                                    </span>
                                                    <span>
                                                        We reserve the right
                                                        (but have no obligation)
                                                        to review, remove, or
                                                        disable access to any
                                                        content on the Services
                                                        that we determine, in
                                                        our sole discretion,
                                                        violates these Terms or
                                                        is otherwise
                                                        objectionable. This
                                                        could include
                                                        third-party course
                                                        materials or user posts
                                                        that are reported to us
                                                        as infringing,
                                                        inappropriate, or in
                                                        violation of law.
                                                        However, absent an
                                                        affirmative removal, the
                                                        presence of third-party
                                                        content on our platform
                                                        does not mean we have
                                                        reviewed or approved it.
                                                        You agree that Bootcamps
                                                        Hub shall not be liable
                                                        for any content provided
                                                        by third parties, and
                                                        that any use or reliance
                                                        on any content
                                                        (including third-party
                                                        courses) is at your own
                                                        risk.
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 4 */}
                                <AccordionItem
                                    value='item-4'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <CreditCard
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                4. Payments, Fees, and Refunds
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background border-t text-dark-gray space-y-4'>
                                        <div className='space-y-4'>
                                            <h3
                                                className='text-lg font-semibold'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                4.1 Payments Through Bootcamps
                                                Hub
                                            </h3>
                                            <p>
                                                SkillBNK may facilitate payments
                                                for certain courses,
                                                subscriptions, or services
                                                through the platform. For
                                                example, if you enroll in a paid
                                                online course or coaching
                                                program via our website, the
                                                payment might be processed by us
                                                or our third-party payment
                                                processors on behalf of the
                                                course provider. When making
                                                payments through SkillBNK, you
                                                agree to the following:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Payment Information:
                                                    </span>
                                                    <span>
                                                        You must provide
                                                        current, complete, and
                                                        accurate billing
                                                        information for all
                                                        purchases made via the
                                                        Services. This includes
                                                        your name, billing
                                                        address, payment method
                                                        details (e.g. credit
                                                        card number and
                                                        expiration date), and a
                                                        valid email address. You
                                                        represent that you have
                                                        the legal right to use
                                                        any payment method that
                                                        you provide.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Payment Processing:
                                                    </span>
                                                    <span>
                                                        Payments made through
                                                        the platform will
                                                        typically be processed
                                                        via third-party payment
                                                        processors (such as
                                                        Stripe, PayPal, or
                                                        others). By making a
                                                        payment, you authorize
                                                        SkillBNK or its payment
                                                        processors to charge the
                                                        amount to your selected
                                                        payment method.
                                                        Additional terms from
                                                        the payment processor
                                                        (such as a user
                                                        agreement or privacy
                                                        policy) may apply, and
                                                        SkillBNK is not
                                                        responsible for any
                                                        errors or security
                                                        breaches by these third
                                                        parties, except to the
                                                        extent required by law.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Pricing and Taxes:
                                                    </span>
                                                    <span>
                                                        All prices are shown in
                                                        the currency as
                                                        indicated (if not
                                                        indicated, it will be in
                                                        U.S. Dollars by
                                                        default). Prices for
                                                        courses or subscriptions
                                                        are subject to change at
                                                        any time at our
                                                        discretion. We will use
                                                        reasonable efforts to
                                                        notify you of any price
                                                        changes in advance, in
                                                        accordance with
                                                        applicable law. Listed
                                                        prices may not include
                                                        taxes; if any sales,
                                                        use, VAT, GST, or other
                                                        taxes apply to your
                                                        purchase, we may collect
                                                        those as required by
                                                        law. You are responsible
                                                        for any applicable taxes
                                                        or duties, except for
                                                        taxes based on our net
                                                        income.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className='flex items-center'>
                                                                <span className='font-semibold mr-2 flex items-center'>
                                                                    Subscriptions{' '}
                                                                    <RefreshCw
                                                                        size={
                                                                            14
                                                                        }
                                                                        className='ml-1 text-dark-gray'
                                                                    />
                                                                </span>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='max-w-xs'>
                                                            <p>
                                                                Subscriptions
                                                                automatically
                                                                renew until
                                                                canceled. You
                                                                can cancel
                                                                anytime through
                                                                your account
                                                                settings.
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <span>
                                                        If you enroll in a
                                                        subscription-based
                                                        service (for example, a
                                                        monthly or annual
                                                        subscription to the
                                                        SkillBNK platform for
                                                        coaches or companies),
                                                        the following terms
                                                        apply:
                                                    </span>
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-12 space-y-3'>
                                                <li>
                                                    <strong>
                                                        Auto-Renewal:
                                                    </strong>{' '}
                                                    Your subscription will{' '}
                                                    <strong>
                                                        automatically renew
                                                    </strong>{' '}
                                                    at the end of each billing
                                                    cycle (e.g. monthly or
                                                    annually) unless you cancel
                                                    it prior to the renewal
                                                    date. By subscribing, you
                                                    authorize us to charge your
                                                    payment method automatically
                                                    at the beginning of each
                                                    renewal term for the
                                                    subscription fees and any
                                                    applicable taxes.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Free Trials:
                                                    </strong>{' '}
                                                    If we offer a free trial for
                                                    a subscription, it will
                                                    begin on the day you sign up
                                                    and last for the advertised
                                                    trial period. Unless you
                                                    cancel before the trial
                                                    ends, your provided payment
                                                    method will be charged the
                                                    applicable subscription fee
                                                    at the end of the trial. You
                                                    may only use a free trial
                                                    once (abusing multiple free
                                                    trials is a violation of
                                                    these Terms).
                                                </li>
                                                <li>
                                                    <strong>
                                                        Cancellation:
                                                    </strong>{' '}
                                                    You can cancel a
                                                    subscription at any time via
                                                    your account settings or by
                                                    contacting support. If you
                                                    cancel, you will continue to
                                                    have access to the
                                                    subscribed Services until
                                                    the end of your current paid
                                                    term, but{' '}
                                                    <strong>no refund</strong>{' '}
                                                    will be provided for the
                                                    remaining period (unless
                                                    required by law). We may
                                                    exceptionally provide
                                                    refunds or credits in case
                                                    of service issues or as
                                                    required under relevant
                                                    consumer protection laws,
                                                    but this is at our
                                                    discretion.
                                                </li>
                                                <li>
                                                    <strong>
                                                        Fee Changes:
                                                    </strong>{' '}
                                                    We reserve the right to
                                                    change subscription fees. We
                                                    will give you advance notice
                                                    of any fee increase and the
                                                    opportunity to cancel before
                                                    it applies to you. If you do
                                                    not cancel, the new fee will
                                                    be charged at your next
                                                    billing cycle.
                                                </li>
                                            </ul>

                                            <ul className='list-disc pl-6 space-y-3 mt-4'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Order Confirmation:
                                                    </span>
                                                    <span>
                                                        When you make a purchase
                                                        on SkillBNK, you should
                                                        receive an email or
                                                        on-screen confirmation.
                                                        This confirms we have
                                                        received your order. If
                                                        you do not receive
                                                        confirmation, or if you
                                                        encounter errors during
                                                        payment, contact us to
                                                        confirm whether the
                                                        transaction was
                                                        successful{' '}
                                                        <strong>before</strong>{' '}
                                                        attempting the purchase
                                                        again to avoid duplicate
                                                        charges.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        No Circumvention:
                                                    </span>
                                                    <span>
                                                        Users (both learners and
                                                        providers) agree not to
                                                        circumvent the{' '}
                                                        {`platform's`} payment
                                                        systems. If a course or
                                                        service is offered via
                                                        SkillBNK, you should not
                                                        attempt to pay the
                                                        provider outside the
                                                        platform for the purpose
                                                        of avoiding fees or for
                                                        any other reason that
                                                        violates these Terms.
                                                        Conversely, providers
                                                        should not solicit
                                                        off-platform payments
                                                        from learners introduced
                                                        via Bootcamps Hub unless
                                                        it is part of a B2B
                                                        arrangement as described
                                                        below.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                4.2 External or Direct Payment
                                                Agreements (B2B Transactions)
                                            </h3>
                                            <p>
                                                SkillBNK recognizes that some
                                                training services facilitated
                                                through our platform may be
                                                arranged and paid for{' '}
                                                <strong>outside</strong> of our
                                                platform. For example, a company
                                                could engage a coach or training
                                                organization through a separate
                                                contract (B2B agreement), and
                                                then use SkillBNK as the
                                                delivery tool for that training.
                                                In such cases:
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Platform Fees:
                                                    </span>
                                                    <span>
                                                        If your organization has
                                                        a separate enterprise
                                                        agreement with Bootcamps
                                                        Hub (for platform
                                                        licensing or usage),
                                                        payments for that
                                                        agreement will be
                                                        handled as per the terms
                                                        of that contract (often
                                                        via invoicing, etc.)
                                                        rather than through the
                                                        in-app payment system.
                                                        These Terms still apply
                                                        to your and your{' '}
                                                        {`users'`} conduct on
                                                        the platform, but the
                                                        financial and service
                                                        level commitments may be
                                                        outlined in the separate
                                                        agreement.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Third-Party Provider
                                                        Payments:
                                                    </span>
                                                    <span>
                                                        If you, as a learner or
                                                        client, are paying a
                                                        coach or training
                                                        company directly (off
                                                        the platform) for their
                                                        services, SkillBNK is
                                                        not a party to that
                                                        payment transaction.{' '}
                                                        <strong>
                                                            We do not handle or
                                                            assume
                                                            responsibility for
                                                            payments, refunds,
                                                            or billing disputes
                                                        </strong>{' '}
                                                        in such external
                                                        agreements. The terms of
                                                        payment, cancellation,
                                                        or refunds for the
                                                        training should be
                                                        defined between you and
                                                        the provider. For
                                                        example, if a company
                                                        has paid a coach
                                                        directly for a training
                                                        program hosted on
                                                        SkillBNK, any refund due
                                                        to cancellation would be
                                                        settled between those
                                                        parties without
                                                        Bootcamps {`Hub's`}{' '}
                                                        involvement.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Liability:
                                                    </span>
                                                    <span>
                                                        SkillBNK will not be
                                                        liable for any fees due,
                                                        paid, or unpaid, between
                                                        users and Third-Party
                                                        Providers outside of our
                                                        platform. Additionally,
                                                        Bootcamps Hub will not
                                                        mediate or resolve
                                                        disputes over such
                                                        payments. Our
                                                        responsibility is
                                                        limited to providing the
                                                        technology platform (and
                                                        any related services
                                                        explicitly agreed to)
                                                        for delivering the
                                                        content.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Exception – Bootcamps
                                                        Hub as Collector:
                                                    </span>
                                                    <span>
                                                        In some instances,
                                                        SkillBNK might act as a
                                                        payment collection agent
                                                        for a provider (for
                                                        example, enabling a link
                                                        or portal for a
                                                        third-party {`coach's`}{' '}
                                                        clients to pay through
                                                        SkillBNK). In those
                                                        cases, we simply
                                                        facilitate the payment
                                                        on behalf of the
                                                        provider, and the
                                                        ultimate financial
                                                        transaction is between
                                                        the provider and the
                                                        learner. We may deduct
                                                        any platform fees or
                                                        commissions as
                                                        applicable, and then
                                                        remit the balance to the
                                                        provider. Any issues
                                                        with the content or
                                                        delivery of the training
                                                        remain between the
                                                        provider and the
                                                        learner, though we will
                                                        assist where possible in
                                                        accordance with these
                                                        Terms and our policies.
                                                    </span>
                                                </li>
                                            </ul>

                                            <h3
                                                className='text-lg font-semibold mt-6'
                                                style={{
                                                    color: primaryColor,
                                                }}
                                            >
                                                4.3 Refunds and Cancellation
                                                Policy
                                            </h3>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Courses and Services:
                                                    </span>
                                                    <span>
                                                        Except as expressly
                                                        provided otherwise (for
                                                        example, a money-back
                                                        guarantee offered by a
                                                        provider, or as required
                                                        by law),{' '}
                                                        <strong>
                                                            all sales of digital
                                                            products, courses,
                                                            or services through
                                                            SkillBNK are final
                                                            and non-refundable
                                                        </strong>{' '}
                                                        once access has been
                                                        granted or the program
                                                        has begun. This is
                                                        because users gain
                                                        immediate benefit from
                                                        course content/access.
                                                        If you believe
                                                        extraordinary
                                                        circumstances warrant a
                                                        refund, you may contact
                                                        us or the course
                                                        provider, but note that
                                                        issuance of refunds is
                                                        at our
                                                        {`(or the provider's)`}{' '}
                                                        discretion unless
                                                        mandated by applicable
                                                        law.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Subscription Refunds:
                                                    </span>
                                                    <span>
                                                        As noted, subscription
                                                        payments are generally
                                                        non-refundable for the
                                                        current billing period
                                                        after the service has
                                                        been provided. If you
                                                        cancel in the middle of
                                                        a paid period, you will
                                                        not receive a pro-rated
                                                        refund for the remaining
                                                        days. We will only
                                                        refund the subscription
                                                        fee if required under
                                                        local consumer law (such
                                                        as certain jurisdictions
                                                        giving a short
                                                        cancellation window for
                                                        online contracts) or if
                                                        we terminate your
                                                        subscription without
                                                        cause mid-term (in which
                                                        case we may provide a
                                                        pro-rata refund for the
                                                        unused portion).
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Chargebacks and Payment
                                                        Disputes:
                                                    </span>
                                                    <span>
                                                        Initiating a chargeback
                                                        or payment dispute with
                                                        your bank or credit card
                                                        for a valid charge may
                                                        lead to immediate
                                                        suspension of your
                                                        account. We encourage
                                                        you to contact us to
                                                        resolve any billing
                                                        issues amicably. If a
                                                        chargeback is received,
                                                        we reserve the right to
                                                        dispute it and to
                                                        recover the amount due,
                                                        plus any fees incurred,
                                                        through legal means.
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        Errors and Corrections:
                                                    </span>
                                                    <span>
                                                        In case of a pricing
                                                        error or incorrect
                                                        charge (for instance, if
                                                        a course was listed at
                                                        the wrong price or you
                                                        were charged an
                                                        incorrect amount), we
                                                        reserve the right to
                                                        correct the error. If
                                                        you were overcharged, we
                                                        will refund the
                                                        difference. If you were
                                                        undercharged or a
                                                        payment did not properly
                                                        go through, we will
                                                        contact you to arrange
                                                        payment of the
                                                        outstanding amount, and
                                                        we reserve the right to
                                                        obtain the owed fees. We
                                                        also reserve the right
                                                        to cancel or refuse any
                                                        order placed due to
                                                        obvious errors or
                                                        suspected fraud.
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Additional sections would continue here... */}
                                {/* For brevity, I'm showing just the first 4 sections in detail */}

                                {/* Section 5 */}
                                <AccordionItem
                                    value='item-5'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <BookOpen
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                5. Intellectual Property Rights
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            {`This section covers ownership of content on the platform, including SkillBNK's intellectual
                                        property, user-generated content, and third-party materials. It outlines the licenses granted for
                                        using content and the restrictions on usage.`}
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Key points include: Bootcamps
                                                Hub retains ownership of
                                                platform design and branding;
                                                users retain ownership of their
                                                uploaded content but grant us a
                                                license to host and display it;
                                                and users warrant they have
                                                rights to any content they
                                                upload.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 6 */}
                                <AccordionItem
                                    value='item-6'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Zap
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                6. AI and Automation Features
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section explains how Bootcamps
                                            Hub uses artificial intelligence and
                                            automation to enhance the learning
                                            experience, including AI-generated
                                            content, automated feedback, and
                                            analytics.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                {`Important disclaimers: AI-generated content is provided "as is" and may not always be accurate; AI
                                            outputs should not be treated as professional advice; users are responsible for reviewing AI
                                            outputs before use; and SkillBNK is not liable for outcomes from using AI features.`}
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 7 */}
                                <AccordionItem
                                    value='item-7'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Database
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                7. Data Privacy and Security
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section summarizes how we
                                            collect, use, store, and protect
                                            your personal information,
                                            referencing our Privacy Policy for
                                            complete details.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Key points include: data
                                                security measures; international
                                                data transfers; third-party
                                                service providers; user
                                                communications; data rights; and
                                                data retention policies.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 8 */}
                                <AccordionItem
                                    value='item-8'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <AlertCircle
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                8. Termination and Suspension
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section outlines how you can
                                            terminate your account and how
                                            SkillBNK may suspend or terminate
                                            your access to the Services.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Key points include: account
                                                deletion procedures;
                                                circumstances under which we may
                                                terminate your account; effects
                                                of termination on content and
                                                access; and our right to
                                                discontinue services.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Section 9 */}
                                <AccordionItem
                                    value='item-9'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Shield
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                9. Disclaimers of Warranties
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            {`This section explains that SkillBNK provides the Services "AS IS" and "AS AVAILABLE" without
                                        warranties of any kind.`}
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                We disclaim warranties regarding
                                                service availability, content
                                                accuracy, outcomes from using
                                                the platform, and third-party
                                                responsibility. Consumer rights
                                                in certain jurisdictions may
                                                still apply.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Sections 10-15 */}
                                {/* Similar structure for remaining sections */}
                                <AccordionItem
                                    value='item-10'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Scale
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                10. Limitation of Liability
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            {`This section limits SkillBNK's liability for damages arising from your use of the Services.`}
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                We are not liable for indirect,
                                                consequential, or punitive
                                                damages. Our total liability is
                                                limited to the greater of fees
                                                paid in the last six months or
                                                $100, with exceptions as
                                                required by law.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-11'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Shield
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                11. Indemnification
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section requires you to defend
                                            and hold harmless SkillBNK from
                                            claims arising from your use of the
                                            Services.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                You must indemnify us against
                                                claims related to your content,
                                                violations of these Terms, and
                                                disputes with other users that
                                                involve us.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-12'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <Scale
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                12. Governing Law and Dispute
                                                Resolution
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section establishes the laws
                                            and jurisdiction that govern these
                                            Terms and any disputes.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                These Terms are governed by
                                                Delaware law. Disputes will be
                                                resolved in Delaware courts,
                                                with exceptions for consumer
                                                rights in other jurisdictions.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-13'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <RefreshCw
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                13. Updates to Services and
                                                Terms
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section explains how and why we
                                            may update the Services and these
                                            Terms.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                We may modify the platform and
                                                these Terms. Continued use after
                                                changes constitutes acceptance
                                                of the updated Terms.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-14'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <FileText
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                14. Miscellaneous Provisions
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <p className='mb-4'>
                                            This section covers various
                                            additional legal provisions
                                            important for interpreting these
                                            Terms.
                                        </p>
                                        <div className='bg-foreground p-4 rounded-md border'>
                                            <p className='text-sm'>
                                                Includes provisions on entire
                                                agreement, no waiver,
                                                severability, assignment,
                                                third-party beneficiaries,
                                                relationship of parties, force
                                                majeure, notices, and language.
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem
                                    value='item-15'
                                    className='border rounded-lg overflow-hidden'
                                >
                                    <AccordionTrigger className='px-6 py-4 group bg-background'>
                                        <div className='flex items-center'>
                                            <MessageSquare
                                                className='mr-3 text-primary-white'
                                                size={20}
                                            />
                                            <h2 className='text-xl font-semibold text-left text-primary-white'>
                                                15. Contact Information
                                            </h2>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className='px-6 py-4 bg-background text-dark-gray'>
                                        <div className='space-y-4'>
                                            <p>
                                                If you have any questions,
                                                concerns, or feedback about
                                                these Terms or the Services,
                                                please feel free to contact us.
                                                We value open communication and
                                                will do our best to address your
                                                inquiry promptly.
                                            </p>

                                            <ul className='list-disc pl-6 space-y-3'>
                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Support Email:
                                                    </span>
                                                    <span>
                                                        support@skillbnk.com
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Address:
                                                    </span>
                                                    <span>
                                                        30500 Van Dyke Ave,
                                                        Suite 201, Warren MI
                                                        48093 USA
                                                    </span>
                                                </li>

                                                <li className='flex items-start'>
                                                    <span className='font-semibold mr-2'>
                                                        SkillBNK Website:
                                                    </span>
                                                    <span>
                                                        https://www.bootcampshub.ai
                                                        (you can find further
                                                        contact links or forms
                                                        on our site)
                                                    </span>
                                                </li>
                                            </ul>

                                            <p className='mt-6'>
                                                By using SkillBNK, you
                                                acknowledge that you have read,
                                                understood, and agreed to these
                                                Terms and Conditions. Thank you
                                                for being a part of the SkillBNK
                                                community, and we wish you an
                                                enriching learning and coaching
                                                experience on our platform!
                                            </p>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </TooltipProvider>

                    <div className='mt-8 p-4 bg-background rounded-lg border'>
                        <p className='text-sm text-dark-gray text-center'>
                            These Terms and Conditions were last updated on
                            April 5, 2025. If you have any questions about these
                            Terms, please contact us at{' '}
                            <a
                                href='mailto:support@skillbnk.com'
                                className='font-medium underline'
                                style={{ color: primaryColor }}
                            >
                                support@skillbnk.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionComp;
