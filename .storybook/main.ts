module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    {
      name: '@storybook/react-webpack5',
      options: {
        rule: {
          test: [/\.stories\.tsx?$/],
        },
        loaderOptions: {
          prettierConfig: {
            printWidth: 80,
            singleQuote: false,
            options: { parser: 'typescript' },
          },
        },
      },
    },
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  docs: {
    autodocs: true,
  },
}
