let plusbtn = document.querySelector(".fa-plus");
let modal = document.querySelector(".modal");
let mainCont = document.querySelector(".main-cont");
let selectedPriority;
let selPriority = document.querySelector(".priority-cont");
let uid = new ShortUniqueId();



// adding localStorage
function loadTickets(priority){  
let allTickets = localStorage.getItem("allTickets");
allTickets = JSON.parse(allTickets);
if (allTickets != null) {
  if(priority){
    console.log(priority);
    allTickets=allTickets.filter((ticket)=>{
      return priority.includes(ticket.priority);
    })
  }

  for (let ticket of allTickets) {
    let id = ticket.id;
    let task = ticket.task;
    let priority = ticket.priority;
    let newTicket = document.createElement("div");
    newTicket.classList.add("ticket");
    newTicket.innerHTML = `<div class="ticket-priority col-${priority} "></div>
        <div class="ticket-id"><span class="uuid">#${id}</span> <span class="editbtn editable"><i class="fas fa-edit "></i></span> </div>
        <p contenteditable="false" spellcheck="false" class="ticket-text">${task}</p>`;
    mainCont.appendChild(newTicket);

    newTicket.addEventListener("click", (e) => {
      // console.log(e.target.parentNode);
      if (e.target.classList.contains("selected")) {
        e.target.classList.remove("selected");
      } else if (e.target.classList.contains("ticket")) {
        e.target.classList.add("selected");
      }
    });
  }
}
}
loadTickets();


document.querySelectorAll(".priority-item").forEach((priority) => {

  priority.addEventListener("click", (e) => {
    mainCont.innerHTML="";
    if (e.target.classList.contains("filtered")) {
      e.target.classList.remove("filtered");
      let filtered=document.querySelectorAll('.priority-item.filtered');
      
      filtered=Array.from(filtered);
      console.log(filtered);
      for (let i = 0; i < filtered.length; i++) {
      filtered[i] = filtered[i].classList[1].split("-")[1];
       } //console.log(filtered);
      (filtered.length)?loadTickets(filtered):loadTickets();
    }else {
      e.target.classList.add("filtered");
      let filtered=document.querySelectorAll('.priority-item.filtered');
     
      filtered=Array.from(filtered);
      // console.log(filtered);
      for (let i = 0; i < filtered.length; i++) {
      filtered[i] = filtered[i].classList[1].split("-")[1];
       } //console.log(filtered);
      (filtered.length)?loadTickets(filtered):loadTickets();
    }
  });
});


// loadTickets(filtered);
  

//  priority highlighter


    // _________________________________filter

    // let allTickets_Priority = document.querySelectorAll(".ticket");
    // allTickets_Priority.forEach((ticket) => {
    //   let selfilter = document.querySelectorAll(".priority-item.filtered");
    //   let arrFilter = [];
    //   for (let i = 0; i < selfilter.length; i++) {
    //     arrFilter[i] = selfilter[i].classList[1].split("-")[1];
    //   }
    //   arrFilter.contains("yellow");
    //   console.log(arrFilter);
    //   let ticket_priority = ticket
    //     .querySelector(".ticket-priority")
    //     .classList[1].split("-")[1];
    //   if (arrFilter.contains(ticket_priority) === false) {
    //     ticket.remove();
    //   }
    // });

    // if filter is clicked ,other colors ticket will be removed display:none;
    // filter clicked > [yellow,red,blue] > new [tickets with]

    // _____________________________________________________
  // });


let modalvisible = false;
plusbtn.addEventListener("click", showModal);
let delbtn = document.querySelector(".fa-times");
// console.log(delbtn);
delbtn.addEventListener("click", (e) => {
  let selected = document.querySelectorAll(".ticket.selected");
  selected.forEach((ticket) => {
    let id = ticket.querySelector(".uuid");
    id = id.innerText;
    let allTickets = localStorage.getItem("allTickets");
    allTickets = JSON.parse(allTickets);
    let data = allTickets.filter((val, i) => {
      return "#" + val.id != id;
    });
    // console.log(data);
    localStorage.setItem("allTickets", JSON.stringify(data));
    ticket.remove();
  });
});

function showModal(e) {
  // console.log("clicked");
  modalvisible = !modalvisible;
  if (modalvisible) {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `<textarea class="modal-text" spellcheck="false" placeholder="Type Something here"></textarea>
           <div class="priority-cont">
           <div class="priority col-yellow active"></div>
           <div class="priority col-blue "></div>
           <div class="priority col-red"></div>
           <div class="priority col-green"></div>
           </div>`;
    mainCont.appendChild(modal);

    modal.addEventListener("keypress", (e) => {
      let key = e.key;
      // console.log(key);
      if (key == "Enter") {
        appendTicket();
      }
    });
    let textArea = document.querySelector(".modal-text");
    // textArea.click();
    textArea.focus();
    selectedPriority = "yellow";
    document.querySelectorAll(".priority").forEach((item) => {
      item.addEventListener("click", (e) => {
        selectedPriority = e.target.classList[1].split("-")[1];

        let selectedPriorNode = document.querySelector(".active");
        selectedPriorNode.classList.remove("active");
        e.target.classList.add("active");
        // textArea.click();
        textArea.focus();
      });
    });
  } else {
    document.querySelector(".modal").remove();
  }
}

function appendTicket() {
  let id = uid();
  let textArea = document.querySelector(".modal-text");
  let newTicket = document.createElement("div");
  newTicket.classList.add("ticket");
  newTicket.innerHTML = `<div class="ticket-priority col-${selectedPriority} "></div>
    <div class="ticket-id"><span class="uuid">#${id}</span> <span class="editbtn editable"><i class="fas fa-edit "></i></span> </div>
    <p  spellcheck="false" class="ticket-text">${textArea.value.trim()}</p>`;

  if (textArea.value.trim()) {
    mainCont.appendChild(newTicket);
  }
  let allTickets = localStorage.getItem("allTickets");

  if (allTickets == null) {
    let data = [
      { id: id, task: textArea.value.trim(), priority: selectedPriority },
    ];
    localStorage.setItem("allTickets", JSON.stringify(data));
  } else {
    let data = JSON.parse(allTickets);
    data.push({
      id: id,
      task: textArea.value.trim(),
      priority: selectedPriority,
    });
    localStorage.setItem("allTickets", JSON.stringify(data));
  }

  document.querySelector(".modal").remove();
  modalvisible = false;

  newTicket.querySelector('.ticket-text').addEventListener("click", (e) => {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      // console.log("hello 136");
    } else {
      e.target.classList.add("selected");
    }
  });

  textArea.value = "";
}

// to add delete feature first add selected class on click on target ticket
// then add eventlistener to delete btn, which delete all elements which have slected class

// now add all tasks to local storage

// let editbtn=document.querySelector('.editbtn');
// console.log(editbtn);
// editbtn.addEventListener('click',(e)=>{
// let ticketText=document.querySelector('.ticket-text');
// let attrVal=ticketText.getAttribute('contenteditable');
// console.log(attrVal);
// if(attrVal=='false'){
//     ticketText.setAttribute('contenteditable','true');
// }
// else{
//     ticketText.setAttribute('contenteditable','false');
// }
// });

// function addClass(node){
//     node.addEventListener('.click',(e)=>{
//         if(e.target.classList.contains('active')){

//             e.target.classList.remove('active');
//         }
//         else{
//             e.target.classList.add('active');
//         }
//     });
// }
