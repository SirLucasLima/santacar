// The function first defines a regular expression called routeParametersRegex that matches any string that starts with a colon (:) followed by one or more letters (lowercase or uppercase). This is used to identify parameters in the path string.

// Next, the function uses the replaceAll() method to replace any occurrences of routeParametersRegex in the path string with a regular expression that matches a group named after the parameter name (e.g. (?<id>[a-z0-9\-_]+)). This regular expression matches any string of lowercase letters, numbers, hyphens, or underscores.

// The function then concatenates the resulting regular expression string with a pattern that matches an optional query string ((?<query>\?(.*))?). This creates a regular expression that matches the entire URL, including any parameters and query string.

// Finally, the function creates a new RegExp object using the resulting regular expression string and returns it. This regular expression can be used to match URLs that follow the pattern defined by the path parameter, and any parameters or query string values can be extracted from the resulting match object using named capture groups.

export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const paramsWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${paramsWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}