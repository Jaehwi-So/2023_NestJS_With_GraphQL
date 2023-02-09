import axios from "axios";
//비동기
/*
function fetchPost() {
    const result = axios.get("https://koreanjson.com/posts/1");
    console.log(result);
}
*/

//비동기
function fetchPost() {
  const result = axios.get("https://koreanjson.com/posts/1").then((x) => {
    console.log(x.data);
  });
  console.log("end");
}

//동기 (Promise)
async function fetchPost2() {
  const result = await axios.get("https://koreanjson.com/posts/1").then((x) => {
    console.log(x.data);
  });
  console.log("end");
}

//동기 (Async/Await)
async function fetchPost3() {
  const result = await axios.get("https://koreanjson.com/posts/1");
  console.log(result.data);
  console.log("end");
}

fetchPost();
