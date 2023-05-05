// This line defines an async function called middleware that takes in two parameters: req (an HTTP request object) and res (an HTTP response object).
export async function middleware(req, res) {
  // This section of the code sets up an empty array called buffers and loops through each chunk of data in the incoming HTTP request (req). The for await...of loop allows the function to handle streaming data, which is useful for handling large amounts of data in real-time. Each chunk of data is pushed into the buffers array.
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // This section of the code attempts to parse the incoming data in the buffers array as a JSON object. If the parsing is successful, the resulting object is stored in the req.body property. If the parsing fails (e.g., the incoming data is not valid JSON), the req.body property is set to null.
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  // This line sets the Content-type header of the outgoing HTTP response to application/json, which tells the client that the response is in JSON format.
  res.setHeader('Content-type', 'application/json')
}