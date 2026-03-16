import http from 'http';

const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<script>
window.onload = function() {
  document.body.innerHTML = '<pre>' + JSON.stringify({
    innerWidth: window.innerWidth,
    outerWidth: window.outerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    scrollbarWidth: window.innerWidth - document.documentElement.clientWidth
  }, null, 2) + '</pre>';
};
</script>
</head>
<body>Test</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});
server.listen(3333, () => console.log('Test server on 3333'));
