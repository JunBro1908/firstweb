"use strict"

const socket = io();

const nickname = document.querySelector('#nickname')
const chatlist = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

sendButton.addEventListener("click", () =>{
  const param = {
    name: nickname.value,
    msg: chatInput.value
  }
  socket.emit("chatting", param)
  chatInput.value = null;
  // 입력한 값을 이제 자동으로 없애주는 식 한줄
})


socket.on("chatting", (data)=>{
  // const li = document.createElement("li");
  // li.innerText = (data.name + '님이 -' + data.msg); 
  // chatlist.appendChild(li)
  const {name, msg, time} = data;
  const item = new LiModel(name, msg, time);
  item.makeLi()
})

function LiModel(name, msg, time) {
  this.name = name;
  this.msg = msg;
  this.time = time;
  var p1 = document.getElementById("chat_start");
  
  this.makeLi = () => {
    const li = document.createElement("li");
    li.classList.add(nickname.value === this.name ? "sent":"received")
    const dom = "<span class='profile'><img src='/images/poster/poster11.png'><span class='user'>" + this.name + "</span></span><span class='message'>"+this.msg+"</span><span class='time'>" + this.time + "</span>";

    li.innerHTML = dom;
    chatlist.insertBefore(li,chatlist.firstChild)
/* li 요소를 추가할때 div가 추가되면서 위 아래로 커지는 상태가 된다. 그런데 화면이 고정되어있어서 아래 새로운 글자들이 무시되는 현상이 발생한다. 아예 다 없애고 노드 리스트 표현을 역순으로 선언하고 css로 reverse 시켜서 해결 그 와중에 center 기능은 다 없앰 이래서 양쪽으로 다 늘어난 것임*/
  }
}