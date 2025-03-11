import * as React from 'react';
import { forwardRefWithAs } from './forwardRefWithAs';
import cx from 'classnames';
import { useButton } from 'react-aria';

export const TWButton = forwardRefWithAs<{}, 'button'>(
  ({ className, ...props }, ref) => {
    const { children } = props;

    let { buttonProps } = useButton(
      {
        ...props,
        elementType: 'button',
      } as any,
      ref
    );

    return React.createElement('button', {
      ...props,
      className: cx(
        'font-medium inline-flex items-center focus:outline-none transition duration-150 ease-in-out',
        'ring-1 ring-black ring-opacity-5 border border-gray-300 text-gray-700 bg-white hover:text-gray-500  focus:ring focus:ring-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50',
        'text-xs rounded-md leading-4 py-1.5 px-2.5',
        className
      ),
      children,
      ...buttonProps,
      ref,
    });
  }
);

TWButton.displayName = 'TWButton';
