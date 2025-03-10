import * as React from 'react';
import Link from 'next/link';
import { ExternalLink } from './ExternalLink';
import { FormiumLogo } from './FormiumLogo';
import { siteConfig } from 'siteConfig';
export interface FooterProps {}

interface FooterLink {
  content: string;
  href: string;
}

const linksResources: FooterLink[] = [
  { content: 'Docs', href: '/docs/overview' },
  { content: 'Learn', href: '/docs/tutorial' },
  { content: 'Guides', href: '/docs/guides/validation' },
  { content: 'API Reference', href: '/docs/api/formik' },
  { content: 'Blog', href: '/blog' },
];
const linksCommunity: FooterLink[] = [
  { content: 'User Showcase', href: '/users' },
  { content: 'Funding', href: 'https://opencollective.com/formik' },
  { content: 'Community Chat', href: siteConfig.discordUrl },
  { content: 'Project Forum', href: `${siteConfig.repoUrl}/discussions` },
  { content: 'Releases', href: `${siteConfig.repoUrl}/releases` },
  // This is old-hat; moving it here in case someone wants it back
  // There was extra explicit styles that were not following convention either
  // { content: 'Star', href: 'https://github.com/formium/formik' },
];
const linksAbout: FooterLink[] = [
  {
    content: 'Home',
    href: 'https://formium.io?utm_source=formik-site&utm_medium=footer-link&utm_campaign=formik-website',
  },
  { content: 'GitHub', href: 'https://github.com/formium' },
  { content: 'Twitter', href: 'https://twitter.com/formiumhq' },
  {
    content: 'Content Sales',
    href: 'https://formium.io/contact/sales?utm_source=formik-site&utm_medium=footer-link&utm_campaign=formik-website',
  },
];

function FooterLinks({
  heading,
  links,
}: {
  heading: string;
  links: FooterLink[];
}) {
  const id = React.useId();

  return (
    <div className="mt-12 lg:mt-0">
      <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
        {heading}
      </h4>
      <ul className="mt-4">
        {links.map(({ content, href }) => {
          const Elem = href.startsWith('/') ? Link : ExternalLink;

          return (
            <li key={`${id}:${href}`} className="mt-4">
              <Elem
                href={href}
                className="text-base leading-6 text-gray-500 hover:text-gray-900"
              >
                {content}
              </Elem>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export const Footer: React.FC<FooterProps> = props => {
  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto py-12 lg:py-16 px-4 lg:px-0 ">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:grid lg:grid-cols-3 gap-8 lg:col-span-2">
            <FooterLinks heading="Resources" links={linksResources} />
            <FooterLinks heading="Community" links={linksCommunity} />
            <FooterLinks heading="About Formium" links={linksAbout} />
          </div>
          <div className="mt-8 lg:mt-0">
            <h4 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
              Subscribe to our newsletter
            </h4>
            <p className="mt-4 text-gray-500 text-base leading-6">
              The latest Formik news, articles, and resources, sent to your
              inbox.
            </p>
            <form
              action="https://api.formik.com/submit/palmerhq/formik-newsletter"
              method="post"
              className="mt-4 lg:flex lg:max-w-md"
            >
              <input type="hidden" name="_honeypot" value="" />
              <input
                aria-label="Email address"
                type="email"
                name="email"
                required={true}
                className="appearance-none w-full px-4 py-2 outline-none border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out lg:max-w-xs"
                placeholder="Enter your email"
              />
              <span className="mt-2 lg:mt-0 lg:ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue active:bg-blue-700 transition ease-in-out duration-150"
                >
                  Notify me
                </button>
              </span>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 lg:flex lg:items-center lg:justify-between">
          <div className="mt-8 text-base leading-6  lg:mt-0 lg:order-1">
            <ExternalLink href="https://formium.io?utm_source=formik-site&utm_medium=footer-logo&utm_campaign=formik-website">
              <FormiumLogo />
            </ExternalLink>
            <div className="text-gray-400 text-xs pt-1">
              Copyright &copy; 2020 Formium, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';
