# commsg

```bash
Usage: commsg [options]
Description: Prints git command to commit with a conventional commit message.
Options:
    --*                        Any flag acts as a prefix for the commit message
    --breaking-change, -bc, -b Indicate a breaking change
    --preserve-quotes, -pq, -q Preserve quotes in the commit message
    --
```

```bash
npx commsg --fix "removes 'npm hooks' command" -b "The 'npm hooks' command has been removed"
```

Simply prints:

```bash
git commit -m "fix\!: removes \`npm hooks\` command" -m "BREAKING CHANGE: The \`npm hooks\` command has been removed"
```

Features:

- converts `'` to backtick.
- adds `!` if it's breaking chagne even if it doesn't have breaking change text.
