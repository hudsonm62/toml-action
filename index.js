const core = require("@actions/core");
const toml = require("@iarna/toml");
const fs = require("fs");

try {
    const file = core.getInput("file");
    const field = core.getInput("field");
    const failMissingField = core.getBooleanInput("fail-missing-field");
    var fields = field.split(".");
    var str = fs.readFileSync(file);
    var parsed = toml.parse(str);
    var value = parsed;
    fields.forEach(function (f) {
        if (value?.[f] === undefined && failMissingField) {
            throw new Error(`Field '${field}' is missing in '${file}'`);
        }
        value = value[f];
    });
    core.setOutput("value", value);
} catch (error) {
    core.setFailed(error.message);
}
