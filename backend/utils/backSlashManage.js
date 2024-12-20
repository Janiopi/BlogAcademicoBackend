function addBackSlash(inputString) {
    // Add an extra backslash to escape any backslashes in the string
    const escapedString = inputString.replace(/\\/g, "\\\\");
    return escapedString;
}

function removeBackSlash(inputString) {
    // Remove escaped backslashes, i.e., replace \\ with \
    const unescapedString = inputString.replace(/\\\\/g, "\\");
    return unescapedString;
}

module.exports = { addBackSlash, removeBackSlash };
