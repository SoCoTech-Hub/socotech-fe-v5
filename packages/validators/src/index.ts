import { z } from "zod";

export const unused = z.string().describe(
  `This lib is currently not used as we use strapi for simple schemas
   But as the application grows and you need other validators to share
   with back and frontend, you can put them in here
  `,
);
