let input = document.getElementById("input");
const list = document.getElementById("list");

function addList(task) {
  const container = document.createElement("div");
  const li = document.createElement("li");
  li.innerText = task.txt;
  container.appendChild(li);
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });
  container.appendChild(checkbox);
  //UPDATE FUNCTIONALITY
  const updatebtn = document.createElement("button");
  updatebtn.innerHTML = "Update";
  updatebtn.addEventListener("click", () => {
    let promptText = prompt("Enter your updated text here ");
    task.txt = promptText;
    if (promptText != null) {
      li.innerText = promptText;
    }
    fetch("http://localhost:6090/updateTask", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("error occured");
          return;
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  container.appendChild(updatebtn);
  //DELETE FUNCTIONALITY
  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = "Delete";
  deletebtn.addEventListener("click", () => {
    fetch("http://localhost:6090/deleteTask", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("error occured");
          return;
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    container.remove();
  });
  container.appendChild(deletebtn);
  list.appendChild(container);
}
//DISPLAY LIST ON RELOAD
function display() {
  fetch("http://localhost:6090/displayTasks", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Error occured");
        return;
      }
      return response.text();
    })
    .then((data) => {
      console.log(typeof data);
      data = JSON.parse(data);
      data.forEach((task) => {
        addList(task);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
//APPEND LIST ON THE CLICK OF BUTTON 
btn.addEventListener("click", () => {
  let task = {
    txt: input.value,
    id: Date.now(),
  };
  console.log(task.txt);
  fetch("http://localhost:6090/addTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) {
        console.log("Error occured");
        return;
      }
      return response.text();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  addList(task);
});
display();
