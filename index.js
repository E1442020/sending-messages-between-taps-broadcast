const name = document.querySelector(".input-name");
const age = document.querySelector(".input-age");
const sendButton = document.querySelector(".btn");
const form = document.querySelector(".form");
const dataContainer = document.querySelector(".data-container");
const bc = new BroadcastChannel("test-channel");
const dataEmpty = document.querySelector(".data-empty");

const addDataToContainer = (data) => {
  // if (!isMessageFound) {
  //     isMessageFound = true
  //     messagesContainer.innerHTML = ""
  // }
  dataContainer.innerHTML += `
    <div class="data-content">
        <h3> ${data.name}</h3>
        <p> ${data.age}</p>
    </div>
    `;
};
bc.onmessage = (msg) => {
  addDataToContainer(msg.data);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(user);
  const user = {
    name: name.value,
    age: age.value,
  };
//   const arr = [];
//   arr.push(user);
  if (user.age.length > 0&&user.name.length>0) {
    dataEmpty.style.display = "none";
  }
  if (name.value.trim().length === 0 || age.value.trim().length === 0) {
    alert("data field is required");
    return;
  }

  addDataToContainer(user);
  bc.postMessage(user);
  name.value = "";
  age.value = "";
});
