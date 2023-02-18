console.log("Hello");

const fetchData = async () => {
  await new Promise((resolve, reject) => {
    //Request, 뭔가 특정 작업
    console.log("1번");
    setTimeout(() => {
      try {
        resolve("성공데이터");
      } catch (err) {
        reject("실패했음");
      }
    }, 2000);
  }).then((res) => console.log("2번"));
  console.log("3번");
};

fetchData();
