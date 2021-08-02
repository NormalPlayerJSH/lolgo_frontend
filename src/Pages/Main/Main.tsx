import React from 'react';
import { UserInfoI } from '../../types/props';

export default function Main(props:{UserInfo:UserInfoI}) {
  const { UserInfo } = props;
  return (
    <div>
      Main 페이지입니다.
      <br />
      {UserInfo.name}
    </div>
  );
}
