import { Preview } from '@storybook/react';
import { defaultTheme, Provider } from '@adobe/react-spectrum';

const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider theme={defaultTheme}>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * {
              font-family: 'JetBrains Mono', monospace !important;
            }
          `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,400;1,100&display=swap"
          rel="stylesheet"
        />
        <Story />
      </Provider>
    ),
  ],
};
export default preview;
