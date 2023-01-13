function gone(){
  cover.style.display="none"
  /*왜 클릭을 해도 z-index값이 바뀌질 않을까? => -이 들어가는 경우 카멜 케이스로 작성하자*/
}

function showMenu(){
  lb.style.left = "0"
}
function hideMenu(){
  lb.style.left = "-170px"
}

// style 가져올 때에는 id를 가져오는 것이다.
/* css로 position absolute로 선언하여 조작하던 var를 js 함수 실행시 원래 style 변수를 아예 제거하고 새로운 element.style 변수를 선언하여 값을 조절하여 @media 값이 먹히질 않는 문제가 생겼다. 
 조금더 알아보니 js로 인해서 html의 변수가 자동으로 선언된 것이고 이는 css로 변경이 불가능하였다*/

/*사진 전환*/


p_ = document.querySelectorAll(".smaPic");

pics = [];
let a = p_.length;
for (i=0; i<a; i++) {
 pics.push(p_[i].src);
}
/*htmlelement에서 src 값을 가져온 순수 배열을 정의함*/


/*아직 타입이 안바뀜?? 왜 length 오류*/
/*배열인줄 알고 고생하다가 typeof로 node method 발견 / 그냥 배열로 바꿈 / 근데 그러면 이미지 src 주소 대신에 object html image element를 가져오는 오류 발생 그래서 노드로 모든거 하기로 결정 / 했는데 노드 메소드 사용법이 불편해서 array로 변경후 위 오류인 htmlelement를 .src를 붙여서 이미지가 src에 맞게 값을 대입할 수 있도록 변경함*/

function change_l(){
  pics.push(pics.shift());
  for (i=0; i<pics.length; i++) {
  document.getElementById(i).src = pics[i];
  }/*기존에는 .src로 속성을 불러와야하지만 리스트 값에 애초에 src만 담아서 바로 값을 입력하면 된다.*/
}
/*지멋대로 입력하는 오류 발생 함수를 실행하면 리스트 요소의 순서는 잘 작동됨 그러나 그 요소가 따는 src를 가져오면 1번 클릭시 2번씩 떙겨지는 상황 발생 / console로 보니 리스트에서 존재하는 요소들이 src가 아니라 img 값 전체를 가져오고 있음 그래서 그걸 빼서 마지막으로 옮기면 src 값을 옮기는 것이 아니다.*/
function change_r(){
  pics.unshift(pics.pop());
  for (i=0; i<pics.length; i++) {
  document.getElementById(i).src = pics[i];
  }
}

/*사진 클릭 전환*/
function showBig() {
  let newPic = this.src;
  big.setAttribute("src", newPic);
}

let bigP = document.querySelector("#big");
let smallP = document.querySelectorAll(".smaPic");

for(i=0; i<smallP.length; i++) {
  smallP[i].onclick = showBig;
}

/*D-DAY counter*/

function cal() {
  const sec = (new Date().getTime()-new Date('August 8 2019 0:00:00').getTime()) / 1000;
  const d = Math.ceil(sec/3600/24);
  const h = Math.ceil(sec/3600)%24;
  const m = Math.ceil(sec/60)%60;
  const s = Math.ceil(sec)%60;
  /*밀리sec 이므로 1000으로 나눔, 날 시간 분 초등 나누는 것과 그 나머지 값을 각각 넣어준다 */
  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;
}
setInterval(cal, 1000);
/*매시간 값을 업데이트 1000는 밀리초단위*/

function input(value) {
  return value < 10 ? "0" + value : value;
/*10보다 작은 값에 대해서는 앞에 0을 붙여준다*/
}

function get_day() {
  const get_days = document.getElementById('count').value;
  const r_sec = (get_days-1)*(3600*24*1000) + new Date('August 7 2019 0:00:00').getTime();

  const r_days = new Date(r_sec);
  const r_years = r_days.getFullYear() + ".";
  const r_months = (r_days.getMonth()+1) + ".";
  const r_day = (r_days.getDate()+1) + '.';
  const num_name = r_days.getDay();
  let num_name_list = ["Mon","Tues","Wednes","Thurs","Fri","Satur","Sun"]
  const r_name = num_name_list[num_name] + "day";
  const result = r_years + " " + r_months + " " + r_day + " " + r_name;
  document.getElementById("days_result").innerText = result;

  const count = (get_days)*(3600*24*1000);
  const r_count = Math.ceil((new Date() - new Date('August 8 2019 0:00:00').getTime()) / (3600*24*1000));
  console.log(r_count);
  /*today가 출력 안되는 오류 발생 / 일단 날짜 계산은 제대로 작동할 수 있게 변수 하나로 같이 써던 코드를 두개로 쪼갬
그 이후 변수 선언을 바꾸고 현재 시간 - 기준 시간 / 단위 한 숫자(오늘 몇일인지) 그것과 입력받은 숫자를 비교하여 출력하는 방식으로 바꿈*/
    if (get_days > r_count) {
      const left_days = (get_days - r_count);
      document.getElementById("left_days").innerText = "D-day : " + Math.ceil(left_days);
  } else if (get_days == r_count) {
      document.getElementById("left_days").innerText = "Today";
  } else {
      const left_days = (new Date()-r_count)/(1000*24*3600);
      document.getElementById("left_days").innerText = "Please input future :)";
  }  
}

/*todolist 만들기 : 일단 제목과 표 그리고 list html을 입력해야하고 값을 추가하는 함수와 값을 제거하는 함수 그리고 완료된 항목을 표기하는 함수 이렇게 구현할 필요가 있다. 추가하는 함수는 클릭을 하면 li를 추가하는 것이고 삭제하는 함수는 옆에 x표를 넣거나 또는 삭제하려는 값을 입력하면 매칭하는 값을 제거해주는 쪽으로 구현을 할 생각이다.*/

/*사용자가 입력한 값을 리스트에 추가하려면 nodelist method를 이용해야한다. 이때 태그를 먼저 생성하고 그 태그에 값을 자식요소로 넣는 방식으로 해야한다. 만들어진 li 값 을 append.child() 구문으로 대입하면 된다.*/
function add() {
  let new_add = document.getElementById("input_value").value;
  /*입력 값 가져오기 이것을 태그에 넣어야한다. document.getElementById("input_value")인 경우 ol node list 값을 가져온다. 이떄 입력 값 그대로를 가져오려면 끝에 .value를 추가하면 된다.*/
  // love save
  // localstorage.setItem("list", new_add);
  
  let li = document.createElement("li");
  /*li 태그 제작*/
  li.appendChild(document.createTextNode(new_add));
  /*값만 가져왔으므로 new_add를 textnode로 변경 li > 입력값*/
  
  document.getElementById("to_list").appendChild(li);
  /*ol list 값 > li > 입력값*/
  document.getElementById("input_value").value="";
  /*창 빈칸으로 만들기*/
  /*li 바로 옆에다가 X표를 입력하여 삭제하는 것을 만들어보자 span을 이용*/
  var s_tag = document.createElement("span");
  /*먼저 span 태그 만들기*/
  var x = document.createTextNode("\u00D7");
  /*span > x(text-node 선언) */
  s_tag.appendChild(x);
  s_tag.className = "close";  
  /*span의 class 값 넣어주기 close로*/
  li.appendChild(s_tag);
  /*이어서 x 표 넣어주기*/
  /*새로 넣은 리스트에 한해서*/
  li.className = "list";
  /*새로 입력한 값이 style 적용 안되는 문제는 새로 만들어진 li에 class가 선언되지 않아서 였고 그래서 여기서 직접 class를 넣어줌 처음에는 실행 순서 차인줄 알고 고생함*/
  

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
/*새로 작성된 리스트들에 한해서 클릭시 사라지는 기능*/
}

var myNodelist = document.getElementsByClassName("list");
/*모든 li을 가져오게 하니까 발생*/
var i;
for (i = 0; i < myNodelist.length; i++) {

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);

// love //nodelist to array
// var save_array = Array.from(myNodelist)
// //save
// for (i=0; i< save_array.length; i++) {
//   localStorage.setItem(i, save_array[i]);
// }

// VM13169:1 Uncaught TypeError: localStorage is not a function at <anonymous>:1:1 오류 발생
//myNodelist: "function stringify() { [native code] }"

  
}
/*문제 발생 값을 li 태그로 잡으니까 다른 ul요소들도 삭제되기 시작*/

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
  //love console.log(this.parentElement.innerText)
  var div = this.parentElement;
  div.style.display = "none";
  }
/*이미 작성된 리스트들에 한해서 클릭시 사라지는 기능*/
}

// 화면 축소시 그림 크기 화면에 맞추어 축소하는 js 만들기. 웬일로 한번에 성공 나이스~!

const body = document.getElementsByTagName("body");

window.onresize = function(event){
const innerWidth = window.innerWidth;
if (innerWidth <= "1000") { 
  document.getElementById("1").style.height = "180px";
  document.getElementById("2").style.height = "230px";
  document.getElementById("3").style.height = "180px";

  document.getElementById("1").style.width = "90px";
  document.getElementById("2").style.width = "100px";
  document.getElementById("3").style.width = "90px";

  document.getElementById("0").style.display = "none";
  document.getElementById("4").style.display = "none"; 

  document.getElementById("do_head").style.width = "300px";
  document.getElementById("to_list").style.width = "300px";
}
else {
  document.getElementById("1").style.height = "250px";
  document.getElementById("2").style.height = "300px";
  document.getElementById("3").style.height = "250px";

  document.getElementById("1").style.width = "125px";
  document.getElementById("2").style.width = "150px";
  document.getElementById("3").style.width = "125px";

  document.getElementById("0").style.display = "";
  document.getElementById("4").style.display = ""; 

  document.getElementById("do_head").style.width = "450px";
  document.getElementById("to_list").style.width = "450px";
}
}