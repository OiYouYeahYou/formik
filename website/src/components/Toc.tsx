import * as React from 'react';
import cx from 'classnames';
import { useTocHighlight } from './useTocHighlight';
import styles from './Toc.module.css';

const TOP_OFFSET = 100;

export const Toc: React.FC<{}> = () => {
  const headings = useTocHighlight(
    styles.contents__link,
    styles['contents__link--active'],
    TOP_OFFSET
  );

  if (!headings?.length) {
    return <ul className="space-y-3"></ul>;
  }

  return (
    <ul className="space-y-3">
      {headings
        .filter(({ url }) => url)
        .map((headingData, i) => {
          const { url, depth, text } = headingData;

          return (
            <li
              key={`heading-${url}-${i}`}
              className={cx('text-sm ', {
                'pl-2': depth === 3,
                hidden: depth! > 3,
              })}
            >
              <a className={styles.contents__link} href={url!}>
                {text}
              </a>
            </li>
          );
        })}
    </ul>
  );
};
