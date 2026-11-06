    return {
      inject: ['slots', 'locale', 'sessions', 'theme'],
      apply(ctx) {
        try {
          return applyClaudeMode(ctx)
        } catch (error) {
          if (typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('[dsh-claude-mode] apply failed', error)
          }
          throw error
        }
      },
    }
  },
})
