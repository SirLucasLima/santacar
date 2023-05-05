// The function first removes the question mark at the beginning of the "query" string using the "substr" method with index 1, so that the string can be easily split into a list of individual parameters using the '&' character as a separator.

//Next, the function uses the "reduce" method to iterate over this list of parameters and build an object that contains each of the query parameters as a key-value pair.

//Inside the "reduce" method, the function starts by splitting each parameter into a key and a value using the '=' character as a separator. It then adds the key and value to the "queryParams" object that will be returned at the end of the function.

//Finally, the function returns the "queryParams" object that contains all of the query parameters from the original string in a JavaScript object format.

export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
      const [key, value] = param.split('=');
      acc[key] = value;
      return queryParams;
    }, {});
}
