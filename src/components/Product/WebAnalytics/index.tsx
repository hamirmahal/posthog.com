import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import {
    IconPieChart,
    IconTarget,
    IconMouseScrollDown,
    IconArrowUpLeftDiagonal,
    IconClock,
    IconGraph,
    IconMessage,
    IconRewindPlay,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { TutorialCard } from 'components/Products/TutorialCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { Marquee } from 'components/Products/Marquee'
import { graphql, useStaticQuery } from 'gatsby'
import { docsMenu } from '../../../navs'
import TeamRoadmap from 'components/TeamRoadmap'
import RecentChange from '../RecentChange'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import Comparison from '../Comparison'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { Question } from 'components/Products/Question'
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'
import { DocLinks } from 'components/Products/DocsLinks'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import SideModal from 'components/Modal/SideModal'
import Profile from '../../Team/Profile'
import TeamMembers from '../TeamMembers'

const product = {
    slug: 'web-analytics',
    lowercase: 'web analytics',
    capitalized: 'Web analytics',
    freeTier: '5,000 recordings',
}

const team = 'Web Analytics'
const teamSlug = '/teams/web-analytics'

const featuresPerRow = 3
const features = [
    {
        title: 'Top paths',
        description: 'See the most visited pages on your site',
        image: <img src="/images/products/web-analytics/top-paths.jpg" width={420} />,
        border: true,
    },
    {
        title: 'Top referrers',
        description: 'Discover where traffic is coming from',
        image: <img src="/images/products/web-analytics/top-referrers.jpg" width={420} />,
        border: true,
    },
    {
        title: 'Device types',
        description: 'Break down traffic by device',
        image: <img src="/images/products/web-analytics/device-types.jpg" width={420} />,
        border: true,
    },
    {
        title: 'World map',
        description: 'Visualize users across planet earth',
        image: <img src="/images/products/web-analytics/world-map.jpg" width={420} />,
        border: true,
    },
    {
        title: 'Retention cohorts',
        description: 'Analyze retention by week',
        image: <img src="/images/products/web-analytics/retention-cohorts.jpg" width={420} />,
        border: true,
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'UTM tracking',
        description: 'See which campaigns perform best',
        icon: <IconTarget />,
    },
    {
        title: 'Scroll tracking',
        description: 'Discover how much users actually read',
        icon: <IconMouseScrollDown />,
    },
    {
        title: 'Bounce tracking',
        description: 'Find out when users immediately get out of dodge',
        icon: <IconArrowUpLeftDiagonal />,
    },
    {
        title: 'Duration tracking',
        description: 'Monitor how long users are hanging around',
        icon: <IconClock />,
    },
]

const questions = [
    {
        question: 'How many visitors have I had this week?',
    },
    {
        question: "What's my average bounce rate?",
    },
    {
        question: 'Where in the world are my visitors coming from?',
    },
    {
        question: 'Are my users mostly on mobile, tablet, or desktop?',
    },
    {
        question: "What's my most popular blog post from the last month?",
    },
    {
        question: 'What other websites are sending me the most traffic?',
    },
    {
        question: 'How many visitors are coming back to my site regularly?',
    },
]

const comparisonColumnCount = 4
const comparison = [
    {
        feature: 'Pre-configured dashboards',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Visitor and view tracking',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Session and duration tracking',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Bounce rate tracking',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Breakdown by GeoIP',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Breakdown by device and browser',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Web Vitals reporting',
        companies: {
            Matomo: '<a href="https://matomo.org/guide/reports/seo-web-vitals/">On-Premise only</a>',
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Revenue tracking',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog:
                '<span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase text-primary">Beta</span>',
        },
    },
    {
        feature: 'Real-time reporting',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: false,
        },
    },
    {
        feature: 'Open source',
        companies: {
            Matomo: true,
            GA4: false,
            PostHog: true,
        },
    },
    {
        feature: '1st party cookies',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'Cookieless tracking',
        companies: {
            Matomo: true,
            GA4: true,
            PostHog: true,
        },
    },
    {
        feature: 'HIPAA compliance',
        companies: {
            Matomo: true,
            GA4: false,
            PostHog: true,
        },
    },
    {
        feature: 'GDPR compliance',
        companies: {
            Matomo: true,
            GA4: false,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        icon: <IconGraph />,
        color: 'blue',
        product: 'Product analytics',
        description: 'Need to go deeper than a dashboard? Building your own insights and SQL queries from scratch!',
        url: '/product-analytics',
    },
    {
        icon: <IconRewindPlay />,
        color: 'yellow',
        product: 'Session replay',
        description:
            "Get more context by watching what users actually do on your site. Spot the nuances that quantifiable data doesn't tell you.",
        url: '/session-replays',
    },
    {
        icon: <IconMessage />,
        color: 'salmon',
        product: 'Surveys',
        description:
            'Get even more context by sending surveys to users. Arrange interviews. Ask questions. Serve pop-ups.',
        url: '/surveys',
    },
]

export const ProductWebAnalytics = (): JSX.Element => {
    const { ycombinator, significa, creatify } = useStaticQuery(graphql`
        fragment ProductCustomerFragment on Mdx {
            fields {
                slug
            }
            frontmatter {
                logo {
                    publicURL
                }
                logoDark {
                    publicURL
                }
            }
        }
        {
            ycombinator: mdx(slug: { eq: "customers/ycombinator" }) {
                ...ProductCustomerFragment
            }
            significa: mdx(slug: { eq: "customers/significa" }) {
                ...ProductCustomerFragment
            }
            creatify: mdx(slug: { eq: "customers/creatify" }) {
                ...ProductCustomerFragment
            }
        }
    `)

    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState(false)

    return (
        <>
            <SEO
                title="Web analytics - PostHog"
                description="It's like Google Analytics 3, but it still exists..."
                image={`/images/og/web-analytics.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={setActiveProfile}>
                {activeProfile && <Profile profile={{ ...activeProfile }} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="[#36C46F]"
                    icon={<IconPieChart />}
                    product={product.capitalized}
                    title="Monitor your website traffic"
                    description="Web analytics for people who really liked GA3..."
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_web_analytics_2a101a8558.png"
                        alt="Screenshot of web analytics in PostHog"
                        className="w-full max-w-[1360.5px]"
                    />
                </div>

                <section id="customers" className="-mt-56 pt-36">
                    <ul className="list-none p-0 grid md:grid-cols-3 gap-4 mb-10 md:mb-20">
                        <CustomerCard
                            outcome="gets 30% more data than with GA4"
                            quote="Other platforms we looked at dropped data due to adblockers and third-party cookies."
                            customer={ycombinator}
                        />
                        <CustomerCard
                            outcome="switched from Plausible"
                            quote="PostHog is way more powerful and insightful than Plausible. We have more info than we used to have."
                            customer={significa}
                        />
                        <CustomerCard
                            outcome="switched from Google Analytics"
                            quote="Web analytics gives us all the metrics we really care about. It is so much better than GA4."
                            customer={creatify}
                        />
                    </ul>
                </section>
            </div>

            <SmoothScroll exclude={['Installation']} />

            <div id="features">
                <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                    <h3 className="text-3xl text-center mb-8">Features</h3>
                    <ul className={`list-none p-0 grid md:grid-cols-${featuresPerRow} gap-12 mb-8`}>
                        {features.map((feature, index) => {
                            return <Feature {...feature} key={index} />
                        })}
                    </ul>

                    <ul className={`list-none p-0 grid grid-cols-2 md:grid-cols-${subfeaturesItemCount} gap-4`}>
                        {subfeatures.map((subfeature, index) => {
                            return <Subfeature {...subfeature} key={index} />
                        })}
                    </ul>
                </section>

                <section className="bg-accent dark:bg-accent-dark">
                    <Marquee product={product.capitalized}>
                        {questions.map((question, index) => {
                            return <Question {...question} key={index} />
                        })}
                    </Marquee>
                </section>
            </div>
            <section
                id="pricing"
                className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl'} mx-auto px-5 pt-20 pb-10`}
            >
                <h2 className="text-3xl md:text-4xl text-center">Usage-based pricing</h2>
                <div className="max-w-3xl mx-auto bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded p-8 mt-1">
                    <p className="mb-2">
                        Web analytics is currently bundled with <Link to="/product-analytics">product analytics</Link>.
                    </p>
                    <ul className="mb-2">
                        <li>
                            <strong>First 1 million events every month:</strong> Free (get access to both products)
                        </li>
                        <li>
                            <strong>After 1 million events/mo:</strong> Usage is billed through product analytics. Get
                            access to web analytics at no additional cost.
                        </li>
                    </ul>
                    <p className="mb-2">
                        Web analytics is designed to work well with{' '}
                        <Link to={'/blog/analytics-pricing'}>anonymous events</Link>.
                    </p>
                </div>
            </section>

            <div className={`${fullWidthContent ? 'max-w-full px-0 md:px-8' : 'max-w-7xl'} mx-auto mt-12 `}>
                <div id="posthog-vs">
                    <section>
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
                    </section>

                    <section className="mb-20">
                        <h3 className="text-center mb-8">So, what's best for you?</h3>
                        <div className="@container mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                            <VsCompetitor
                                title="Reasons a competitor may be best for you (for now...)"
                                image={
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/competitors-sr.png"
                                        className="max-w-[167px]"
                                    />
                                }
                            >
                                <ul>
                                    <li>
                                        You <em>only</em> need web analytics, nothing else
                                    </li>
                                    <li>You don’t need any integrations other than with Google</li>
                                    <li>You need to migrate data from GA4</li>
                                    <li>You actually really like GA4 😱</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog>
                                <ul>
                                    <li>You want to do more than just web analytics</li>
                                    <li>You don't want to spend weeks setting up dashboards</li>
                                    <li>You need to comply with HIPAA</li>
                                    <li>It's not GA4</li>
                                </ul>
                            </VsPostHog>
                        </div>

                        <p className="text-center text-sm font-medium">
                            Have questions about PostHog? <br className="md:hidden" />
                            <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                            <Link to="/talk-to-a-human">book a demo</Link>.
                        </p>
                    </section>
                </div>

                <section id="tutorials">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Featured tutorials</h3>
                    <p className="mt-0 text-opacity-75 text-center mb-6">
                        Visit the <Link to="/tutorials">tutorials</Link> section for more.
                    </p>

                    <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20mx-5 md:mx-0">
                        <TutorialCard
                            title="How to create a broken link (404) checker"
                            description="This tutorial shows you how to create a broken link checker for a Next.js app that sends a notification in Slack when a user visits a page that doesn’t exist."
                            url="/tutorials/broken-link-checker"
                        />
                        <TutorialCard
                            title="How to use PostHog without cookie banners"
                            description="Normally, PostHog collects information about your users and stores it in a cookie in the users’ browser. This tutorial explains how to use page memory instead."
                            url="/tutorials/cookieless-tracking"
                        />
                        <TutorialCard
                            title="An introduction to identifying users"
                            description="Many of the most valuable insights require an accurate understanding of the user using your product. This tutorial goes over the different ways to identify users and recommendations on how to do it better."
                            url="/tutorials/identifying-users-guide"
                        />
                        <TutorialCard
                            title="A non-technical guide to PostHog data"
                            description="You don’t need to be an engineer, but knowing the formatting and structure of your data, for example, is key to getting the most out of PostHog as a non-technical user."
                            url="/tutorials/non-technical-guide-to-data"
                        />
                    </ul>
                </section>

                <section id="docs" className="mb-20 px-5 md:px-0">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'web analytics')?.children}
                    />
                </section>

                <section id="team" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                    <p className="text-center mb-2">
                        PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                        building {product.lowercase}.
                    </p>
                    <TeamMembers teamName={team} setActiveProfile={setActiveProfile} />
                </section>

                <section id="roadmap" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Roadmap &amp; changelog</h3>

                    <p className="text-center mb-8">Here’s what the team is up to.</p>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <RecentChange team={team} />
                        </div>

                        <div>
                            <h4 className="opacity-60 text-base">Up next</h4>
                            <TeamRoadmap team={team} />
                        </div>
                    </div>
                </section>

                <section id="questions" className="mb-20 px-5">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            View {product.lowercase} questions
                        </CallToAction>
                    </div>

                    <Questions topicIds={[348]} />
                </section>

                <PairsWith items={pairsWithItemCount}>
                    {PairsWithArray.map((card, index) => {
                        return <PairsWithItem {...card} key={index} />
                    })}
                </PairsWith>
            </div>
            <div className="max-w-7xl mx-auto relative">
                <section className="mb-20">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductWebAnalytics
