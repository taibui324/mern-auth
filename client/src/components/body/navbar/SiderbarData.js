import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Edit Bio',
    path: '/',
    icon: <AiIcons.AiFillEdit/>,
    cName: 'nav-text'
  },
  {
    title: 'Add Link',
    path: '/profile',
    icon: <AiIcons.AiOutlineLink/>,
    cName: 'nav-text'
  },
  {
    title: 'Change Photos',
    path: '/profile',
    icon: <AiIcons.AiTwotoneEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Customization',
    path: '/profile',
    icon: <AiIcons.AiFillEye/>,
    cName: 'nav-text'
  }
 
];
