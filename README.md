# setup-packer

The `sudomateo/setup-packer` action is a JavaScript action that sets up
HashiCorp [Packer](https://www.packer.io) in your GitHub Actions workflow by:

- Installing a specific version of Packer and adding it to `PATH`.

## Example Workflow

```yaml
name: Packer Workflow

on:
  - push

jobs:
  setup_packer:
    runs-on: ubuntu-latest
    name: Build Packer image
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Packer
        uses: sudomateo/setup-packer@v1
        id: setup_packer
        with:
          packer-version: 'latest'

      - name: Print packer-version output
        run: echo "${{ steps.setup_packer.outputs.packer-version }}"

      - name: Run packer init
        run: packer init example.pkr.hcl

      - name: Run packer build
        run: packer build example.pkr.hcl
```

## Usage

This action can run on Ubuntu, Windows, and macOS GitHub-hosted runners.

The default configuration installs the latest version of Packer from
https://releases.hashicorp.com/packer/.

```yaml
steps:
  - uses: sudomateo/setup-packer@v1
```

A version of Packer can be specified using the `packer-version` input.

```yaml
steps:
  - uses: sudomateo/setup-packer@v1
    with:
      packer-version: 1.8.0
```

The `packer-version` input supports
[semver](https://www.npmjs.com/package/semver) versioning.

```yaml
steps:
  - uses: sudomateo/setup-packer@v1
    with:
      packer-version: "~1.7.0"
```

Subsequent steps can access the `packer-version` output to see which version of
Packer was installed.

```yaml
steps:
  - id: setup_packer
    uses: sudomateo/setup-packer@v1

  - run: echo "${{ steps.setup_packer.outputs.packer-version }}"
```

## Inputs

- `packer-version` - (required) The version of Packer to install. Supports
  [semver](https://www.npmjs.com/package/semver) versioning. Defaults to
  `latest`.

## Outputs

- `packer-version` -  The version of Packer that was installed.
