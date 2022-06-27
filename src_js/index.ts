
// let myWorker = new Worker("/sw.js")

// myWorker.onmessage = function(e){
//   const {type,payload} = e.data
//   if(type==='done'){
//     console.log("rawData1::",payload.data)
//     const box1 = document.getElementById("box1");
//     box1.innerHTML = JSON.stringify(payload.data)
//     myWorker.terminate();
//   }
// }

// myWorker.postMessage({type:"fetch",payload:{url:'model.json'}})




let myWorker1 = new Worker("/sw_buffer.js")

myWorker1.onmessage = function(e){
  const {type,payload} = e.data
  if(type==='done'){
    console.log("rawData2::",payload.data)
    const box2 = document.getElementById("box2");
    box2.innerHTML = JSON.stringify(payload.data)
    myWorker1.terminate();
  }
}

myWorker1.postMessage({type:"fetch",payload:{url:'model.json'}})