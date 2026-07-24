'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../src/App'), { ssr: false });

export default function AppClient({ type }) {
  return <App type={type} />;
}
