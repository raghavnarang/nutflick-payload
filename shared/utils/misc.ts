import { Database } from "@/lib/supabase/db-schema";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export function slugify(str: string) {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-word characters
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, "") // Trim hyphens from the beginning of the string
    .replace(/-+$/, ""); // Trim hyphens from the end of the string
}

export const getUniqueSlug = async (
  title: string,
  dbClient: ReturnType<
    typeof createServerClient<Database> | typeof createClient<Database>
  >
) => {
  let titleToSlugify = title;
  do {
    const slug = slugify(titleToSlugify);

    const { count, error } = await dbClient
      .from("product")
      .select("*", { count: "exact", head: true })
      .eq("slug", slug);

    if (error) {
      console.log(error);
      throw Error("Unable to generate unique slug for product");
    }

    if (count === 0) {
      return slug;
    } else {
      const splitted = slug.split("-");
      const mayBeNumber = splitted[splitted.length - 1];
      const postfixNumber = isNaN(+mayBeNumber) ? 1 : +mayBeNumber + 1;

      titleToSlugify = `${title} ${postfixNumber}`;
    }
  } while (true);
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;