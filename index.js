/**
 * dsh-claude-mode — Host half.
 *
 * The delivered feature is a browser UI layer: the theme token layer, the
 * composer run/status bar, the command palette (with chat-history search), the
 * turn footer, the assistant read-aloud action, the Conversation header
 * button, and the Settings section. It is registered from the Client half
 * declared in package.json (`dsh.client`), so this Host row has nothing to
 * provide beyond staying installed and toggleable in the Plugin Manager.
 */

/** No Host service dependency. */
export const inject = []

/** Stable package / loader row name. */
export const name = 'dsh-claude-mode'

/**
 * Activate the Host half.
 *
 * Intentionally empty: the bundle is a Client-side UI layer. Keeping the row
 * means Plugin Manager can list, disable, and remove the whole bundle, and
 * that the Client half is mounted with the bundle's lifetime.
 */
export function apply() {}
