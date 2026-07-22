declare const NPM_PACKAGE_VERSION:
  | `${string}.${string}.${string}`
  | `${string}.${string}.${string}+${string}`
  | `${string}.${string}.${string}-${string}`
  | `${string}.${string}.${string}-${string}+${string}`;

export const VERSION = NPM_PACKAGE_VERSION;
