const insertDatabase = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Insert Database : " + data);
      resolve();
    }, 1000);
  });
};

const data = ["Apple", "Banana", "Carrot", "Donut"];

const func = async () => {
  for (let i = 0; i < data.length; i++) {
    await insertDatabase(data[i]);
  }
  console.log("Complete");
};

const func2 = async () => {
  for (let i of data) {
    await insertDatabase(i);
  }
  console.log("Complete");
};

const func3 = async () => {
  data.forEach(async (x) => {
    await insertDatabase(x);
  });
  console.log("Complete");
};

const func4 = async () => {
  const promises = [];
  for (let i of data) {
    const promise = insertDatabase(i);
    promises.push(promise);
  }
  await Promise.all(promises);
  console.log("Complete");
};

let start = new Date();
await func4();
let end = new Date();
console.log("During time : " + (end - start));
