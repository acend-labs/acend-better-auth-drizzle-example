import { auth } from "@/lib/auth/auth";

const AUTH_PREFIX = "/api/v1/auth"; // Adjust to match your Better Auth mount point

// Function to add prefix to paths
function addPrefixToPaths(paths: Record<string, any>, prefix: string) {
  const prefixedPaths: Record<string, any> = {};
  for (const [path, methods] of Object.entries(paths)) {
    const prefixedPath = `${prefix}${path}`;
    prefixedPaths[prefixedPath] = methods;
  }
  return prefixedPaths;
}

// Function to update tags in paths
function updatePathTags(paths: Record<string, any>) {
  const updatedPaths: Record<string, any> = {};
  for (const [path, methods] of Object.entries(paths)) {
    const updatedMethods: Record<string, any> = {};
    for (const [method, operation] of Object.entries(
      methods as Record<string, any>,
    )) {
      updatedMethods[method] = {
        ...operation,
        tags: operation.tags?.map((tag: string) =>
          tag === "Default" ? "Better Auth" : tag,
        ) || ["Better Auth"],
      };
    }
    updatedPaths[path] = updatedMethods;
  }
  return updatedPaths;
}

// Generate and export the Better Auth OpenAPI configuration
export async function getBetterAuthOpenAPIConfig() {
  const betterAuthSchema = await auth.api.generateOpenAPISchema();

  return {
    components: {
      schemas: betterAuthSchema.components.schemas,
      securitySchemes: betterAuthSchema.components.securitySchemes,
    },
    transform: (spec: Record<string, unknown>) => {
      // Add prefix to Better Auth paths
      const prefixedAuthPaths = addPrefixToPaths(
        betterAuthSchema.paths,
        AUTH_PREFIX,
      );

      // Update tags from 'Default' to 'Better Auth'
      const updatedAuthPaths = updatePathTags(prefixedAuthPaths);

      // Update tags in the tags array
      const updatedTags = betterAuthSchema.tags.map((tag: any) =>
        tag.name === "Default"
          ? {
              ...tag,
              name: "Better Auth",
              description: "Better Auth authentication endpoints",
            }
          : tag,
      );

      // Merge with existing paths
      return {
        ...spec,
        paths: {
          ...(typeof spec.paths === "object" && spec.paths !== null
            ? spec.paths
            : {}),
          ...updatedAuthPaths,
        },
        tags: [...(Array.isArray(spec.tags) ? spec.tags : []), ...updatedTags],
        security: betterAuthSchema.security,
      };
    },
  };
}
