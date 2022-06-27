importScripts(`/static/wasm/myaes.js`);

WebAssembly.compileStreaming(fetch(`/static/wasm/myaes_bg.wasm`)).then((mod) =>
  WebAssembly.instantiate(mod, { imports: {} }).then((instance) => {
    console.log("******instance",instance)
    self.wasm = instance.exports;
  })
);

async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
  });

  const reader = response.body.getReader();
  const stream = await new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close();
            finish(url);
            return;
          }
          
          controller.enqueue(decrypt_buffer(value, url));
          push();
        });
      }
      push();
    },
  });

  return await new Response(stream, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=Xbot.glb",
      "Content-Transfer-Encoding": "binary",
    },
  })
    .json().then((res) => {
      return res;
    });
}

self.onmessage = async function (e) {
  const { payload, type } = e.data;
  const { url } = payload;
  if (type === "fetch") {
    let rawData = await fetchData(url);
    self.postMessage({ type: "done", payload: { data: rawData } });
  }
};
