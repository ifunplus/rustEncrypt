importScripts(`/static/wasm/myaes.js`);

WebAssembly.compileStreaming(fetch(`/static/wasm/myaes_bg.wasm`)).then((mod) =>
  WebAssembly.instantiate(mod, { imports: {} }).then((instance) => {
    self.wasm = instance.exports;
  })
);

async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
  })
  let result = await response.arrayBuffer()

  console.log(".......response",result)
  let rawData = decrypt(new Uint8Array(result), url) //string
  return rawData
}

self.onmessage = async function (e) {
  const { payload, type } = e.data;
  const { url } = payload;
  if (type === "fetch") {
    let rawData = await fetchData(url);
    self.postMessage({ type: "done", payload: { data: rawData } });
  }
};
