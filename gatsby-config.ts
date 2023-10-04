import type { GatsbyConfig } from "gatsby";
import * as dotenv from "dotenv";
import NetlifyAdapter from "gatsby-adapter-netlify";

dotenv.config({ path: ".env" });

const CONTENTFUL_CONFIG = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: process.env.CONTENTFUL_HOST,
  localeFilter: (locale: { code: string }) =>
    locale.code === process.env.GATSBY_CONTENTFUL_LOCALE,
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Netlify POC`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: CONTENTFUL_CONFIG,
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: `${__dirname}/src/pages`,
        // ignore: ["!(previews/*)"], // Ignore all files except the preview pages.
        slugify: { separator: "", lowercase: false }, // Remove automatic slugify of ids.
      },
    },
  ],
  adapter: NetlifyAdapter({
    excludeDatastoreFromEngineFunction: false,
  }),
};

export default config;
