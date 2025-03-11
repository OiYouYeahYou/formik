import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { TWButton } from './TWButton';
import { useClipboard } from './useClipboard';
import cn from 'classnames';

// Original: https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-ghcolors.css

/*:: import type { PrismTheme } from '../src/types' */

const theme /*: PrismTheme */ = {
  plain: {
    color: '#293742',
    borderRadius: 12,
    fontFamily: `SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace`,
    fontSize: 14,
    lineHeight: '1.5',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#A7B6C2',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#DB2C6F',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#394B59',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#36acaa',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#00B3A4',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#DB2C6F',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#634DBF',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#1a56db',
      },
    },
  ],
};

const Code = ({
  children,
  codeString,
  className = 'language-js',
  ...props
}: any) => {
  const language = className.replace(/language-/, '');
  const [hasCopied, onCopy] = useClipboard(children.trim());
  return (
    <>
      {/* @ts-ignore */}
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={theme as any}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <div className="relative">
            <div className="absolute top-0 right-0 p-2">
              <button
                type="button"
                onClick={onCopy}
                className={cn(
                  'font-medium inline-flex items-center focus:outline-none transition duration-150 ease-in-out',
                  'ring-1 ring-black ring-opacity-5 border border-gray-300 text-gray-700 bg-white hover:text-gray-500  focus:ring focus:ring-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50',
                  'text-xs rounded-md leading-4 py-1.5 px-2.5',
                  'font-sans'
                )}
              >
                {hasCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre
              className={cn(
                className,
                'bg-gray-50 pb-4 pt-4 pr-4 overflow-scroll mb-4'
              )}
              style={{
                ...style,
                border: '1px solid #eee',
                fontSize: 13,
                lineHeight: '1.5',
              }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {tokens.length > 1 ? (
                    <span
                      aria-hidden="true"
                      className="inline-block w-5 mx-2 text-right text-gray-300 select-none"
                    >
                      {i + 1}
                    </span>
                  ) : (
                    <span className="w-5 mx-2" />
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </div>
        )}
      </Highlight>
    </>
  );
};

export default Code;
