import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<typeof Link> & Omit<ButtonProps, 'component'>;

export const LinkButton = (props: Props): React.ReactNode => {
  return <Button component={Link} {...props} />;
};
