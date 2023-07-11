import { Flex, ProgressCircle } from '@adobe/react-spectrum';
import React from 'react';

/* eslint-disable-next-line */
export interface LoaderProps {}

export function Loader(props: LoaderProps) {
  return (
    <Flex justifyContent="center" alignItems="center">
      <ProgressCircle aria-label="Loading…" isIndeterminate />
    </Flex>
  );
}

export default Loader;
