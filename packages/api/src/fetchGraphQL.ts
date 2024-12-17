import type { z } from "zod";

export async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, any> = {},
  schema?: z.ZodSchema<T>,
): Promise<T> {
  try {
    const response = await axios.post(STRAPI_GRAPHQL_URL, { query, variables });

    if (response.data.errors) {
      console.error("GraphQL Errors:", response.data.errors);
      throw new Error("Failed to fetch GraphQL data");
    }

    const data = response.data.data;
    if (schema) {
      return schema.parse(data);
    }

    return data;
  } catch (error: any) {
    console.error("Fetch GraphQL Error:", error.message);
    throw error;
  }
}
