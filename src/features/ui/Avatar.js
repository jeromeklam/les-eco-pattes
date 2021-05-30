import React from 'react';
import PropTypes from 'prop-types';
import { default as RAvatar } from 'react-avatar';
import { getFullName } from '../user';

export default function Avatar(props) {
  let source = null;
  if (props.user.user_avatar && props.user.user_avatar !== '') {
    source = props.user.user_avatar;
    if (source.indexOf('data:') < 0) {
      source = `data:image/jpeg;base64,${props.user.user_avatar}`;
    } else {
      source = props.user.user_avatar;
    }
  }
  return (
    <RAvatar
      className={props.className}
      email={props.user.user_email}
      name={getFullName(props.user)}
      src={source}
      size={props.size}
    />
  );
}

Avatar.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
};

Avatar.defaultProps = {
  className: "rounded-circle",
  size: '38',
};
