const core = require("@actions/core");
const toml = require("@iarna/toml");
const fs = require("fs");

try {
    const file = core.getInput("file");
    const field = core.getInput("field");
    const failMissingField = core.getBooleanInput("fail-missing-field");
    var fields = field.split(".");
    var str = fs.readFileSync(file, "utf8");
    var parsed = toml.parse(str);
    var value = parsed;
    for (const f of fields) {
        if (value?.[f] === undefined) {
            if (failMissingField) {
                throw new Error(`Field '${field}' is missing in '${file}'`);
            }
            value = undefined;
            break;
        }
        value = value[f];
    }
    core.setOutput("value", value);
} catch (error) {
    core.setFailed(error.message);
}
