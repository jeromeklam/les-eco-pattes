import React from 'react';
import classnames from 'classnames';

export default function Copyright(props) {
  return (
    <div className={classnames('common-copyright', props.className)}>
      <div className="text-center mt-2">
        <p>
          &copy;{' '}
          <a
            href="https://github.com/jeromeklam/freeasso"
            target="_blank"
            rel="noopener noreferrer"
          >
            FreeAsso
          </a>{' '}
          2019-2021
        </p>
      </div>
    </div>
  );
}
