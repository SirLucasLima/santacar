
// '/users/:id'
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  return new RegExp(Array.from(path.matchAll(routeParametersRegex)))
}