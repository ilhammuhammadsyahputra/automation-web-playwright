export const USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce'
  }
};

export const URLS = {
  base: 'https://www.saucedemo.com'
};

/**
 * Converts a product display name into its data-test attribute slug.
 * e.g. "Sauce Labs Backpack" -> "sauce-labs-backpack"
 */
export function toDataTestSlug(itemName: string): string {
  return itemName.toLowerCase().replace(/ /g, '-');
}
