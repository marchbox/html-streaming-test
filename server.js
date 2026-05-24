import { createServer } from "node:http";

function wait(ms) {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
}

const server = createServer(async (_, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Transfer-Encoding": "chunked",
  });

  res.write(`
    <!doctype html>
    <html lang="en">
    <meta charset="utf-8">
    <title>HTML streaming test</title>
    <script src="https://unpkg.com/template-for-polyfill"></script>
    <p>Hello…</p>
    <p><?marker name="foo"></p>
  `);

  await wait(3000);

  res.write(`
    <div>
  `);

  await wait(3000);

  res.write(`
    <template shadowrootmode="open">
  `);

  await wait(3000);

  res.write(`
    <span>world!</span>
  `);

  await wait(3000);

  res.write(`
    </template>
  `);

  await wait(3000);

  res.write(`
    </div>
  `);

  await wait(3000);

  res.write(`
    <template for="foo">
      This is <?marker name="foo">
    </template>
  `);

  await wait(3000);

  res.write(`
    <template for="foo">
      cool!
    </template>
  `);

  await wait(3000);

  res.end(`
    <footer>The end</footer>
    </html>
  `);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
