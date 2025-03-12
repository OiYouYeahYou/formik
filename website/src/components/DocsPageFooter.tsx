import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { siteConfig } from 'siteConfig';
import { addTagToSlug, getSlug, removeFromLast } from '../lib/docs/utils';
import { RouteItem } from '../lib/types';
import { ReactionForm } from './ReactionForm';
import cn from 'classnames';

export interface DocsPageFooterProps {
  route: RouteItem;
  href: string;
  prevRoute?: RouteItem;
  nextRoute?: RouteItem;
}

function areEqual(prevProps: DocsPageFooterProps, props: DocsPageFooterProps) {
  return prevProps.route?.path === props.route?.path;
}

interface RouteNavigatorProps {
  route?: RouteItem;
  direction: 'Previous' | 'Next';
  tag: string | undefined;
}

function RouteNavigator({ route, direction, tag }: RouteNavigatorProps) {
  if (!route?.path) {
    return <div className="flex-1" />;
  }

  const { path, title } = route;

  return (
    <NextLink
      href={addTagToSlug(removeFromLast(path, '.'), tag)}
      className={cn(
        'flex-1 max-w-md block border border-gray-200 p-4 rounded-lg hover:text-blue-600 duration-150 ease-out',
        { 'text-right': direction === 'Next' }
      )}
    >
      <span className="text-sm block text-gray-500 mb-1">{direction}</span>
      <span className="text-xl block font-semibold">{title}</span>
    </NextLink>
  );
}


export const DocsPageFooter = React.memo<DocsPageFooterProps>(
  ({ route, href, prevRoute, nextRoute }) => {
    const { query } = useRouter();
    const { tag, slug } = getSlug(query as { slug: string[] });
    const editUrl = `${siteConfig.editUrl}${route?.path}`;

    return (
      <>
        <div className="py-12">
          <div className="space-y-8 md:flex space-between items-center md:space-y-0 md:space-x-8">
            <RouteNavigator route={prevRoute} direction="Previous" tag={tag} />
            <RouteNavigator route={nextRoute} direction="Next" tag={tag} />
          </div>
        </div>
        <div className="border-t border-b py-8">
          <div className="">
            <ReactionForm />
          </div>
        </div>
        <div className="flex my-2">
          <div className="md:flex-1 md:text-right">
            {tag ? (
              <NextLink
                href={href}
                as={slug}
                className="text-gray-600 underline"
              >
                Go to the live version of this page
              </NextLink>
            ) : (
              <a
                href={editUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 underline"
              >
                Edit this page on GitHub
              </a>
            )}
          </div>
        </div>
      </>
    );
  },
  areEqual
);

DocsPageFooter.displayName = 'DocsPageFooter';
