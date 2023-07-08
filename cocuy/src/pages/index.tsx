import React from "react";
import { defaultTheme, Flex, lightTheme, Provider, View } from "@adobe/react-spectrum";

export interface PageProps {
  children: React.ReactNode;
}
export function Page (props: PageProps) {
  return (
      <Provider theme={defaultTheme}>
        <Flex width="100vw" minHeight="100vh" alignItems="center">
          <View
            margin="auto"
            width={{
              S: '640px',
              M: '768px',
              L: '1024px',
              XL: '1280px',
              XXL: '1536px'
            }}
          >
            {props.children}
          </View>
        </Flex>
      </Provider>
  );
}

export default Page;