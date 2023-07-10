import React from 'react';
import { defaultTheme, Flex, Provider, View } from '@adobe/react-spectrum';

export interface PageProps {
  children: React.ReactNode;
  wrap?: boolean;
}
export function Page({ children, wrap = false }: PageProps) {
  return (
    <Provider theme={defaultTheme}>
      <Flex
        width="100vw"
        minHeight="100vh"
        alignItems="center"
        {...(wrap
          ? {
              alignContent: 'start',
              wrap: 'wrap',
            }
          : {})}
      >
        <View
          margin="auto"
          width={{
            S: '640px',
            M: '768px',
            L: '1024px',
            XL: '1280px',
            XXL: '1536px',
          }}
        >
          {children}
        </View>
      </Flex>
    </Provider>
  );
}

export default Page;
