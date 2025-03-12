import React from 'react';

interface HeadingData {
  text?: string | null;
  url?: string | null;
  depth?: number;
}

/** Get all `a.anchor` tags that are immediate children of `h{2,3}` */
function getHeaderAnchors() {
  return document.querySelectorAll<HTMLAnchorElement>(
    'h2 > .anchor, h3 > .anchor'
  );
}

function getActiveHeaderAnchor(topOffset: number) {
  for (const headerAnchor of getHeaderAnchors()) {
    const { top } = headerAnchor.getBoundingClientRect();

    if (top >= 0 && top <= topOffset) {
      return headerAnchor;
    }
  }

  return null;
}

/**
 * Sets up Table of Contents highlighting. It requires that
 */
export function useTocHighlight(
  linkClassName: string,
  linkActiveClassName: string,
  topOffset: number
) {
  const [lastActiveLink, setLastActiveLink] = React.useState<
    Element | undefined
  >(undefined);
  const [headings, setHeadings] = React.useState<HeadingData[]>([]);

  React.useEffect(() => {
    setHeadings(
      Array.from(getHeaderAnchors(), (anchor): HeadingData => {
        const { parentElement } = anchor;

        return {
          url: anchor.getAttribute('href'),
          text: parentElement?.innerText,
          depth: Number(parentElement?.nodeName.replace('H', '')),
        };
      })
    );
  }, [setHeadings]);

  React.useEffect(() => {
    function setActiveLink() {
      const activeHeaderAnchor = getActiveHeaderAnchor(topOffset);
      const parentId = activeHeaderAnchor?.parentElement?.id;
      // Most of the time there will be no active header returned
      if (!parentId) {
        return;
      }

      const links = document.getElementsByClassName(
        linkClassName
      ) as HTMLCollectionOf<HTMLAnchorElement>;

      for (const link of links) {
        const { href } = link;
        const anchorValue = decodeURIComponent(
          href.substring(href.indexOf('#') + 1)
        );

        if (parentId !== anchorValue) {
          continue;
        }

        if (lastActiveLink) {
          lastActiveLink.classList.remove(linkActiveClassName);
        }

        link.classList.add(linkActiveClassName);
        setLastActiveLink(link);
        break;
      }
    }

    document.addEventListener('scroll', setActiveLink);
    document.addEventListener('resize', setActiveLink);

    setActiveLink();

    return () => {
      document.removeEventListener('scroll', setActiveLink);
      document.removeEventListener('resize', setActiveLink);
    };
  });

  return headings;
}
