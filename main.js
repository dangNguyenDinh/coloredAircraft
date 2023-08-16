//sound
function soundPlay(idSound){
  var audio = document.getElementById(idSound);
  audio.play();
}



var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    things = [],
    thingsCount = 124,
    mouse = {
      x: -100,
      y: -100
    },
    minDist = 150;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object image
var image = new Image();
image.src = `./assetForAirCraft/rock${Math.floor(Math.random()*2 + 1)}.png`;
// image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Love_heart_uidaodjsdsew.gif/1200px-Love_heart_uidaodjsdsew.gif';
// image.src = 'https://static.wixstatic.com/media/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png/v1/fill/w_320,h_272,fp_0.50_0.50/2cd43b_57438aebde5a4b0fa20c6880a9fafabf~mv2.png';

for (var i = 0; i < thingsCount; i++) {
  let opacity = Math.random() + 0.4;
  let thingWidth = (Math.floor(Math.random() * 20) + 20) * (opacity + 0.4);
  let thingHeight = image.naturalHeight / image.naturalWidth * thingWidth;
  let speed = Math.random() * 1 + 0.5;
  things.push({
    width: thingWidth,
    height: thingHeight,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - thingHeight,
    speed: speed,
    vY: speed,
    vX: 0,
    d: Math.random() * 1.2 - 0.6, // wind or something like that
    stepSize: (Math.random()) / 20,
    step: 0,
    angle: Math.random() * 180 - 90,
    rad: Math.random(),
    opacity: opacity,
    _ratate: Math.random() // ratate 正負
  });
}

function drawThings() {
  things.map((thing) => {
    ctx.beginPath();
    thing.rad = (thing.angle * Math.PI) / 180;
    ctx.save();
    var cx = thing.x + thing.width / 2;
    var cy = thing.y + thing.height / 2;
    ctx.globalAlpha = thing.opacity;
    ctx.setTransform(
      Math.cos(thing.rad),
      Math.sin(thing.rad),
      -Math.sin(thing.rad),
      Math.cos(thing.rad),
      cx - cx * Math.cos(thing.rad) + cy * Math.sin(thing.rad),
      cy - cx * Math.sin(thing.rad) - cy * Math.cos(thing.rad)
    );
    ctx.drawImage(image, thing.x, thing.y, thing.width, thing.height);
    ctx.restore();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawThings();
}

function update() {
  things.map((thing) => {
    var dist = Math.sqrt((thing.x - mouse.x) ** 2 + (thing.y - mouse.y) ** 2);
    
    if (dist < minDist) {
      var force = minDist / (dist * dist),
          xcomp = (mouse.x - thing.x) / dist,
          ycomp = (mouse.y - thing.y) / dist,
          deltaV = force * 2; // deplay when hover mouse

      thing.vX -= deltaV * xcomp;
      thing.vY -= deltaV * ycomp;
      
      if (thing.d * xcomp > 0) {
        thing.d = 0 - thing.d;
      }
    } else {
      thing.vX *= .98;

      if (thing.vY < thing.speed) {
        thing.vY = thing.speed
      }

      thing.vX += Math.cos(thing.step += (Math.random() * 0.05)) * thing.stepSize;
    }
    
    thing.y += thing.vY;
    thing.x += thing.vX + thing.d;
    
    var _angle = Math.random() + 0.2;
    // stuff.angle += _angle;
    if (thing._ratate == 0) {
      thing.angle += _angle;
    } else {
      thing.angle -= _angle;
    }
    
    if (thing.y > canvas.height) {
      reset(thing);
    }

    if (thing.x > canvas.width || thing.x < (0 - thing.width)) {
      reset(thing);
    }
  });
}

function reset(thing) {
  thing.opacity = Math.random() + 0.4;
  thing.width = (Math.floor(Math.random() * 20) + 20) * (thing.opacity + 0.4);
  thing.height = image.naturalHeight / image.naturalWidth * thing.width;
  thing.x = Math.floor(Math.random() * canvas.width);
  thing.y = 0 - thing.height;
  thing.speed = Math.random() * 1 + 0.5
  thing.vY = thing.speed;
  thing.vX = 0;
  // thing.angle = 0;
  // thing.size = 0;
  thing._ratate = Math.random();
}

canvas.addEventListener('mousemove', function(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
//bên trên là code đi copy, dưới này mới là của tôi:((((
const plane = document.getElementById("mouse");

plane.style.display = 'none';
var planeMode;
var allPlaneMode = document.querySelectorAll(".airCraft");

for(let i=0;i<5;i++){
    allPlaneMode[i].addEventListener("click", ()=>{
        planeMode = i;
        soundPlay("selectSound");
        document.querySelector("#ok").style.display = "block";
        for(let j=0;j<5;j++){
          if(j!=i){
              allPlaneMode[j].style.display = "none";
          }
        } 
        switch(planeMode){
            case 0:
                plane.src = "./assetForAirCraft/plane.png";
                break;
            case 1:
                plane.src = "./assetForAirCraft/plane2.png";
                break;
            case 2:
                plane.src = "./assetForAirCraft/plane3.gif";
                break;
            case 3:
                plane.src = "./assetForAirCraft/plane4.png";
                break;
            case 4:
                plane.src = "./assetForAirCraft/plane5.png";
                break;
}
    })
}


document.querySelector("#ok").onclick = ()=>{

    document.querySelector("#selectPlane").style.display = "none";
    document.querySelector("#selectMode").style.display = "block";

}



var mode;
var allMode = document.querySelectorAll(".mode");
for(let i=0;i<3;i++){
    allMode[i].addEventListener("click", ()=>{
        mode = i;
        soundPlay("selectSound");
        document.querySelector("#play").style.display = "block";
        for(let j=0;j<3;j++){
            if(i!=j){
                allMode[j].style.display = "none";
            }
        }  
        
    })
}




//hết file cũ

document.querySelector("#play").onclick = ()=>{
    // xóa mấy phần tử cũ đi
    document.querySelector("#marginLeft").style.display = 'block';
    document.querySelector("#marginRight").style.display = 'block';
    document.querySelector("canvas").remove();
    document.querySelector("#selectMode").remove();
    document.querySelector("#wrapper").style.cursor = "none";
    document.querySelector("#mouse").style.display = 'block';

    //bắt đầu cái mới
    if(document.querySelector("input").checked){
        soundPlay("backgroundMusic2");
    }else{
        soundPlay("backgroundMusic");
    }
    let wrapper = document.querySelector("#wrapper");
    let windowHeight = window.innerHeight;
    //khai báo một vài biến linh tinh
    var gameOver = false;
    let time = 0;
    let timePlay = 0;
    var timePlayElement = document.querySelector("#marginRight");
    let rockArr = [];
    let rockCount = 0;
    var groundBlood = 3;
    
    
    //đoạn code này lấy trên chatgpt. nhưng dễ hiểu:))))
    /*ghép ảnh máy bay vào con trỏ chuột mà không sử dụng CSS, làm ntn có thể trích
    xuất địa chỉ ảnh để kiểm tra các thứ */
    document.addEventListener("mousemove", (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      
      plane.style.left = mouseX + "px";
      plane.style.top = mouseY + "px";
    });
    
    
    //di chuyển
    function move(object){
        var time = Math.random()*2+0.5;
        object.style.animation = `falling ${time}s linear`;
        setTimeout(()=>{
            object.style.display = "none";
        }, time*1000);
        
    }
    //constructor
    function Rock1(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.createNewRock = function(){
            var randomNumber = Math.floor(Math.random()*8+1);
            var newRock = document.createElement("img");
            newRock.src = `./assetForAirCraft/rock${randomNumber}.png`;
            newRock.alt = "rock";
            newRock.className = "rock1";
            if(randomNumber == 7){
              newRock.className = "rock1 rock7";
            }else if(randomNumber == 8){
              newRock.className = "rock1 rock8";
            }else{
              newRock.style.width = `${Math.floor(Math.random()*3+8)}vw`;
            }
            console.log(newRock.src)
            newRock.style.position = 'absolute';
            newRock.style.left = `${posX}vw`;
            wrapper.appendChild(newRock);
            move(newRock);
            return newRock;
        }
        this.rockImg = this.createNewRock();
        this.exploded = function(){
            this.rockImg.display = "none";
            this.rockImg.remove();
        }
    }
    
    
    //Khai báo mấy cái linh tinh, đọc tên sẽ hiểu
    
    let isShooting = true;
    /*airCraft là cái đi theo con trỏ chuột nên sẽ tính theo con trỏ
    chuột luôn. Phần này quay lại lập trình hướng cấu trúc :)))
    code giải trí khi kiến thức còn ít, đòi hỏi gì nhiều */
    
    function ifAirCraftBeShot(){
        var posYPlane = plane.offsetTop;
        var posXPlane = plane.offsetLeft;
        var widthPlane = plane.offsetWidth;
        // trong trường hợp này offsetWidth và clientWidth cho ra kết quả như nhau:)) 
        var heightPlane = plane.clientHeight;
    
        for(let i=0;i<rockCount;i++){
            var rock = rockArr[i].rockImg;
            //xét nằm ngoài nhé, nghĩa là không va chạm
            if (!((rock.offsetLeft + rock.offsetWidth < posXPlane || rock.offsetLeft > posXPlane+widthPlane)
               || (rock.offsetTop + rock.clientHeight < posYPlane || rock.offsetTop > heightPlane + posYPlane))){
              if(rock.className == "rock1 rock7"){ //ăn máu
                groundBlood++;
                rock.remove();
              }else{
                gameOver = true;
                console.log("game over");
                
                switch(planeMode){
                    case 0:
                        plane.src = "./assetForAirCraft/planeOnFire.png";
                        break;
                    case 1:
                        plane.src = "./assetForAirCraft/plane2OnFire.png";
                        break;
                    case 2:
                        plane.src = "./assetForAirCraft/plane3.gif";
                        break;
                    case 3:
                        plane.src = "./assetForAirCraft/plane4OnFire.png";
                        break;
                    case 4:
                        plane.src = "./assetForAirCraft/plane5OnFire.png";
                        break;
                }
                document.querySelector("#planeBlood").style.width = `0vw`;
                soundPlay("deadSound");
                return true;
              }
                
            }
        }
        return false;
    }
    
    function shooting(){
        if(isShooting == true){
            wrapper.addEventListener("mousemove", function sht(event){
               wrapper.removeEventListener("mousemove", sht);
                var posXBullet = event.clientX + plane.offsetWidth /2;
                var posYBullet = event.clientY;
                var newBullet = document.createElement("img");
                newBullet.src = './assetForAirCraft/bullet.png';
                newBullet.alt = "bullet";
                newBullet.className = "bullet";
                newBullet.style.position = 'absolute';
                wrapper.appendChild(newBullet);
                newBullet.style.top = `${posYBullet}px`;
                newBullet.style.left = `${posXBullet}px`;
                document.querySelector("style").textContent =
                `
                @keyframes shooting {
                    0%{
                        position: absolute;
                        top: ${posYBullet}px;
                    }
                    100%{
                        position: absolute;
                        top: -1000px;
                    }
                }`;
                newBullet.style.animation = 'shooting 3s linear';
                
    
                setTimeout(()=>{
                    newBullet.style.display = "none";
                    newBullet.remove();  //xem nếu đã đến top trên thì xóa đạn đi 
                },3000);
            })
        }
        
        /*console.log(allBullet) cái này đê test*/
    }
    
    function ifRockBeShot(){
        var rockArr = document.querySelectorAll(".rock1");
        var rockCount = rockArr.length;
        var bulletArr = document.querySelectorAll(".bullet");
        var bulletCount = bulletArr.length;
        for(let i=0;i<rockCount;i++){
            var currentRock = rockArr[i];
            for(let j=0;j<bulletCount;j++){
                var currentBullet = bulletArr[j];
                    //xét nó nằm ngoài
                    if(!((currentRock.offsetTop + currentRock.clientHeight < currentBullet.offsetTop ||
                        currentRock.offsetTop > currentBullet.clientHeight + currentBullet.offsetTop )||
                        (currentRock.offsetLeft + currentRock.offsetWidth < currentBullet.offsetLeft ||
                        currentRock.offsetLeft > currentBullet.offsetLeft + currentBullet.offsetWidth))
                        ){ 
                          if(rockArr[i].className != "rock1 rock7" && rockArr[i].className != "rock1 rock8") {
                            soundPlay("boom");
                            currentRock.style.display = "none";
                            currentRock.remove();
                            currentBullet.style.display = 'none';
                            currentBullet.remove();
                          }
                        }
            }
        }
    }
    
    
    //vòng lặp chính
    let mainInterval = setInterval(()=>{
        for(let i=0;i<rockCount;i++){        
    
        //xét xem có bị tràn ra ngoài không. nếu có thì xóa phần tử đó đi
            if(rockArr[i].rockImg.offsetTop > windowHeight*8/9){
                rockCount--;
                rockArr[i].rockImg.style.display = "none";
                rockArr[i].rockImg.remove();
                rockArr.splice(i,1);
                if(rockArr[i].className != "rock1 rock7" && rockArr[i].className != "rock1 rock8"){
                  groundBlood --;
                }
                console.log(groundBlood);
            };  
        }
        
        //hiển thị thanh máu
        var groundBloodElement = document.querySelector("#groundBlood");
        if(groundBlood == 2){
            groundBloodElement.style.width = `${18*3/4}vw`;
        }else if(groundBlood == 1){
            groundBloodElement.style.width = `${18*2/4}vw`;
        }else if(groundBlood == 0){
            groundBloodElement.style.width = `${18/4}vw`;
        }else if(groundBlood < 0){
            groundBloodElement.style.width = `0vw`;
            gameOver = true;
        }
        //console.log(rockArr) cái này để test 

        var hardMode;
        if(mode == 0){
          hardMode = 6;
        }else if(mode == 1){
          hardMode = 4;
        }else if(mode == 2){
          hardMode = 2;
        }
       //xét thời gian đá rơi
        if(time%hardMode == 0 && Math.floor(Math.random()*3 % 3) == (0 || 1)) {
            var rock1 = new Rock1(Math.random() * 80 + 10, 0); //chỉ tạo ở khoảng giữa
            //rock1.createNewRock(); không sử dụng vì ở trên đã dùng
            //thêm viên đá vừa tạo vào mảng đá
            rockArr.push(rock1);
            rockCount++;  
        }
        //giới hạn lượt bắn thôi
        
        ifAirCraftBeShot();
        shooting();
        ifRockBeShot();
        if(gameOver == true){
            document.querySelector("#gameover").style.display = 'block';
            setTimeout(()=>{
                document.querySelector("#playAgain").style.display = "block";
                wrapper.style.cursor = "block";
                document.querySelector("#playAgain").onclick = ()=>{
                    window.location.href = "index.html";
                }
            },2000);
            clearInterval(mainInterval);
        }
        //hiển thị thời gian đã chơi
        if(time % 10 == 0){
            timePlay ++;
            timePlayElement.textContent = `time: ${timePlay}`;
        }
        time ++;
        
    }, 100);
   
    //   var rock1 = new Rock1(Math.random() * 100, 0);
    //         //rock1.createNewRock(); không sử dụng vì ở trên đã dùng
    //         //thêm viên đá vừa tạo vào mảng đá
    //         rockArr.push(rock1);
    //         rockCount++;  
    // ifAirCraftBeShot();
    
    /* 
    đoạn code dưới đây hay đấy, để làm một phần tử có thể kéo thả. 
    nhưng không làm được với mobile nên cũng đéo cần nữa.
    
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          // if present, the header is where you move the DIV from:
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          // otherwise, move the DIV from anywhere inside the DIV:
          elmnt.onmousedown = dragMouseDown;
        }
    
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
      
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
      
      
      dragElement(plane); */
    
}



