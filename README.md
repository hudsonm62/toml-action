# Read TOML

A simple action to read a single field from a TOML file and output the value stored in that field.

```yaml
- uses: hudsonm62/toml-action@v1
  with:
    file: path/to/file.toml
    field: parent.child.field
  id: read_toml

- run: echo "The value is ${{ steps.read_toml.outputs.value }}"
```

## Inputs

| Name                 | Description                                  | Required | Default |
| -------------------- | -------------------------------------------- | -------- | ------- |
| `file`               | The TOML file to read from                   | Yes      |         |
| `field`              | The field inside the TOML file to read       | Yes      |         |
| `fail-missing-field` | Whether to fail if the field is missing/null | No       | `true`  |

## Outputs

| Name    | Description                              |
| ------- | ---------------------------------------- |
| `value` | The data stored in `field` inside `file` |
