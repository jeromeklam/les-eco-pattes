import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
export const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

export { default as PageNotFound } from './PageNotFound';
export { default as DesktopHeader } from './DesktopHeader';
export { default as DesktopFooter } from './DesktopFooter';
export { default as DesktopSidebar } from './DesktopSidebar';
export { default as MobileHeader } from './MobileHeader';
export { default as MobileFooter } from './MobileFooter';
export { default as MobileMenu } from './MobileMenu';
export { default as DesktopListLine } from './DesktopListLine';
export { default as DesktopListHeader } from './DesktopListHeader';
export { default as DesktopListFooter } from './DesktopListFooter';
export { default as DesktopListLines } from './DesktopListLines';
export { default as MobileListHeader } from './MobileListHeader';
export { default as MobileListFooter } from './MobileListFooter';
export { default as MobileListLines } from './MobileListLines';
export { default as ResponsiveListHeader } from './ResponsiveListHeader';
export { default as ResponsiveListFooter } from './ResponsiveListFooter';
export { default as ResponsiveListLines } from './ResponsiveListLines';
export { default as MobileListLine } from './MobileListLine';
export { default as DesktopListLineCol } from './DesktopListLineCol';
export { default as MobileListLineCol } from './MobileListLineCol';
export { default as DesktopListTitle } from './DesktopListTitle';
