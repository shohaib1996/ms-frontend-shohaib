import HeroSection from '@/components/home/HeroSection';
import BusinessSolutions from '@/components/home/BusinessSolutions/BusinessSolutions';
import OnboardingExperience from '@/components/home/onboarding-experience';
import CoachDilemma from '@/components/home/CoachDilemma';
import HowWeDifferent from '@/components/home/HowWeDifferent';
import SuccessFormula from '@/components/home/SuccessFormula';
import BootcampsExperience from '@/components/home/BootcampsExperience';
import FAQContactSection from '@/components/home/FAQSection';
import CoachingLanding from '@/components/home/CoachingLanding';
import BootcampshubAdvantages from '@/components/home/BootcampshubAdvantages';
import HeroSectionUpdate from '@/components/home/hero-section-update';
import IncreseEnrollment from '@/components/home/increse-enrollment';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <HeroSectionUpdate />
            <OnboardingExperience />
            <BootcampsExperience />
            <IncreseEnrollment />
            <FAQContactSection />

            {/* <HeroSection /> */}
            {/* <CoachDilemma /> */}
            {/* <IntroductionBootcampsHub />   */}
            {/* <HowWeDifferent /> */}
            {/* <SuccessFormula /> */}
            {/* <BootcampsExperience /> */}
            {/* <BootcampshubAdvantages /> */}
            <div className='relative flex flex-col gap-10 py-10 mx-auto w-full overflow-hidden'>
                {/* <ShibluStory />
                <PlatformCanDo /> */}

                {/* Circular gradient */}
                <div className='absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-transparent via-purple-400/30 to-purple-500/30 blur-xl z-[-1]'></div>

                {/* Additional smaller gradient for layered effect */}
                <div className='absolute -bottom-10 -right-10 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-transparent to-purple-400/30 blur-lg z-[-1]'></div>
            </div>
            {/* <BusinessSolutions /> */}
            {/* <CaseStudies /> */}
            {/* <ExpertResources /> */}
            {/* <CertificationsSection /> */}
            {/* <MediaAndPress /> */}
            {/* <UpcomingEvents /> */}
            {/* <OnboardingExperience /> */}
            {/* <GetStartedSection /> */}
            {/* <CostComparison /> */}
            {/* <FAQContactSection /> */}
            {/* <CoachingLanding /> */}
            {/* <EarlyAdoptersBanner /> */}
        </div>
    );
};

export default Home;
