import Head from 'next/head';
import { ReactNode } from 'react';

type HeadProps = {
  title?: string;
  desc?: string;
  children?: ReactNode;
};
export default function DynamicHead({ title, desc, children }: HeadProps) {
  if (children) {
    return <>{children}</>;
  }
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={desc} />
    </Head>
  );
}
