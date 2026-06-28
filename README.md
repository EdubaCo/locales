# edubaco/locales

Public translation repository for **Eduba** UI strings. Translators contribute here; the
content is consumed back by the Eduba monorepo as a git submodule at `packages/shared/locales`.

## Structure

```
en/   # English source (21 namespaces — the reference for all other locales)
ar/   # Arabic
fa/   # Persian (Farsi)
```

Each locale directory contains one JSON file per namespace (e.g. `common.json`, `workflow.json`).
All locales must have the exact same set of keys as `en/`; the `validate-keys.mjs` check
enforces this on every PR.

## Contributing

1. Fork this repo, add or edit JSON files in the relevant locale directory.
2. Run `node validate-keys.mjs` to confirm key parity with `en/`.
3. Open a PR with a DCO sign-off: `git commit -s`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

## License

[MIT](LICENSE) — contributions are inbound MIT (ADR-0073).
