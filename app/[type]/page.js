import { notFound } from 'next/navigation';
import taskTypes from '../../src/taskTypes';
import AppClient from '../AppClient';

export function generateStaticParams() {
  return taskTypes.map((t) => ({ type: t.type }));
}

export default async function Page({ params }) {
  const { type } = await params;
  const taskType = taskTypes.find((t) => t.type === type);
  if (!taskType) notFound();

  return <AppClient type={type} />;
}
