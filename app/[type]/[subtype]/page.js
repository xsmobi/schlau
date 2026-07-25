import { notFound } from 'next/navigation';
import taskTypes from '../../../src/taskTypes';
import AppClient from '../../AppClient';

const filterableTypes = taskTypes.filter((t) => t.hasFilter);

export function generateStaticParams() {
  return filterableTypes.flatMap((taskType) => {
    const { menu } = taskType.generate();
    return menu.map((item) => ({ type: taskType.type, subtype: String(item.nr) }));
  });
}

export default async function Page({ params }) {
  const { type, subtype } = await params;
  const taskType = filterableTypes.find((t) => t.type === type);
  if (!taskType) notFound();

  const { menu } = taskType.generate();
  if (!menu.some((item) => String(item.nr) === subtype)) notFound();

  return <AppClient type={type} subtype={Number(subtype)} />;
}
