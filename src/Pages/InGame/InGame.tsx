import React from 'react';
import { UserInfoI } from '../../types/props';

export default function InGame(props:{UserInfo:UserInfoI}) {
  const { UserInfo } = props;
  return (
    <div>
      InGame 페이지입니다.
    </div>
  );
}
