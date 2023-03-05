const name = document.querySelector(".input-name");
const age = document.querySelector(".input-age");
const sendButton = document.querySelector(".btn");
const form = document.querySelector(".form");
const dataContainer = document.querySelector(".data-container");
const bc = new BroadcastChannel("test-channel");
const dataEmpty = document.querySelector(".data-empty");

const addDataToContainer = (data) => {
  dataEmpty.style.display = "none";
  dataContainer.innerHTML += `
    <div class="data-content">
        <h4> ${data.name}</h4>
        <h4> ${data.age}</h4>
        
    </div>
    <hr/>
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

  if (name.value.trim().length === 0 || age.value.trim().length === 0) {
    alert("data field is required");
    return;
  }

  addDataToContainer(user);
  bc.postMessage(user);
  name.value = "";
  age.value = "";
});
