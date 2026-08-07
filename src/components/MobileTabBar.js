'use client';

import Link from 'next/link';

const style = {
  bar: `md:hidden fixed bottom-0 inset-x-0 z-40 flex bg-white border-t border-gray-200`,
  tab: `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[48px] text-gray-500`,
  tabActive: `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[48px] text-gray-900`,
  icon: `w-6 h-6`,
  label: `text-[11px] font-medium`,
};

// Same pathname-matching idea as AuthControls' NavLink ("is this the page
// we're already on"), adapted to a tab bar: instead of swapping the
// current destination for a "Back to Tasks" link, the matching tab is
// just highlighted, since Tasks already has its own persistent tab here.
export default function MobileTabBar({ tabs, pathname }) {
  const isTaskPage = !tabs.some((tab) => !tab.isHome && tab.href === pathname);

  return (
    <nav className={style.bar}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.isHome ? isTaskPage : pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={isActive ? style.tabActive : style.tab}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon className={style.icon} />
            <span className={style.label}>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
