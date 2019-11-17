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
