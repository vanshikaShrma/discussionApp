let question = document.querySelector('#que');
let inner2 = document.querySelector('#inner2');
let responseDiv = document.querySelector('.responseDiv');
let content = document.getElementById("subject");
let content1 = document.getElementById("text1");
let innerAdder = document.getElementById("innerAdder");
let listR = document.querySelector('#listR');
let nameR = document.querySelector('#nameR');
let commentR = document.querySelector('#commentR');
let index = -1;
let resolveBt = document.getElementById("resolve");
let section = document.getElementsByClassName("responseDiv")[0];
let search = document.querySelector(".search");

search.addEventListener("input", () => {
    let value = search.value.toUpperCase();
    let itemToSearch = innerAdder.children;
    for(let i=0;i<itemToSearch.length;i++)
    {
        let child1 = itemToSearch[i].childNodes[0];
        let child2 = itemToSearch[i].childNodes[1];
        
        let child1InnerText = child1.innerText;
        let child2InnerText = child2.innerText;
        if(child1InnerText.toUpperCase().indexOf(value)>-1||child2InnerText.toUpperCase().indexOf(value)>-1){
            itemToSearch[i].style.display = "block";
        }
        else{
            itemToSearch[i].style.display = "none";
        }
    }
})


// localStorage.clear()

let count = localStorage.getItem("count") || 1;
localStorage.setItem("count", count);

let arr = getItemLocal() || [];
question.addEventListener("click", dabba);

function dabba() {
    inner2.style.display = "block";
    responseDiv.style.display = "none";
}

let submit = document.getElementById("submit2");

submit.addEventListener("click", all);

function addItemLocal(obj) {
    localStorage.setItem("data", JSON.stringify(obj));
}
function getItemLocal() {
    return JSON.parse(localStorage.getItem("data"));
}

function all() {
         arr = getItemLocal() || []
    if (content.value == "") alert('Entries Required');
    else {
        let obj = {
            id: count++,
            subject: content.value,
            text: content1.value,
            response: [] ,
            question_star : false
        };
        localStorage.setItem("count", count);
        createItem(obj);
        arr.push(obj);
        addItemLocal(arr);

        content.value = "";
        content1.value = "";
    }
}

function createItem(element) {
    let newdiv = document.createElement('div');
    newdiv.classList.add("a1");
    newdiv.setAttribute("id", element.id);
    let para = document.createElement('h3');
    para.innerText = element.subject;
    para.classList.add("para");
    add_star(para);
    let para1 = document.createElement('p');
    para1.innerText = element.text;
    para1.classList.add("para1");

    newdiv.appendChild(para);
    newdiv.appendChild(para1); // Fixed the order
    innerAdder.appendChild(newdiv);
}

window.onload = function () {
    let array = getItemLocal() || [];
    array.forEach(element => {
        createItem(element);
    });
}

let uniqueId = null;
innerAdder.addEventListener("click", function (e) {
    let localArray = getItemLocal() || [];
    const targetDiv = e.target.closest('.a1'); // Updated to use closest parent with 'a1' class

    if (targetDiv) {
        uniqueId = targetDiv.id;
        index = localArray.findIndex(curElem => curElem.id == uniqueId);

        let sub = targetDiv.querySelector('h3').innerText;
        let ques = targetDiv.querySelector('p').innerText;

        let queR1 = document.querySelector('#queR1');
        let paraR = document.querySelector('#paraR');

        queR1.innerText = sub;
        paraR.innerText = ques;
        inner2.style.display = "none";
        responseDiv.style.display = "block";

        listR.innerHTML = "";
        let selectedQuestion = localArray.find(element => element.id == uniqueId);
        if (selectedQuestion && selectedQuestion.response.length > 0) {
            hide.style.display = "block";
            ansR.style.display = "block";

            selectedQuestion.response.forEach(item => {
                console.log(item);
                
                let itemR = document.createElement('li');
                itemR.setAttribute("id", "itemR");

                let ansRH = document.createElement('h3');
                let ansRP = document.createElement('p');

                ansRH.setAttribute("id", "ansRH");
                ansRP.setAttribute("id", "ansRP");

                ansRH.innerText = item.name;
                ansRP.innerText = item.comment;

                itemR.appendChild(ansRH);
                itemR.appendChild(ansRP);
                add_likeDislike(itemR,item,localArray);
                listR.appendChild(itemR);
            });
        } else {
            hide.style.display = "none";
            ansR.style.display = "none";
        }
    }
});

resolveBt.addEventListener("click", () => { // Moved outside to ensure single binding
    let localArray = getItemLocal() || [];
    if (index > -1) {
        localArray.splice(index, 1);
        addItemLocal(localArray);
        document.getElementById(uniqueId).remove(); // Correct removal from DOM
    }
    responseDiv.style.display = "none";
    inner2.style.display = "block";
});

let submitR = document.querySelector('#submitR');
submitR.addEventListener("click", resAdd);

let hide = document.querySelector('#hide');
let ansR = document.querySelector('.ansR');

function resAdd() {
    hide.style.display = "block";
    ansR.style.display = "block";

    let obj1 = {
        id: 1,
        name: nameR.value,
        comment: commentR.value,
        like:0,
        dislike:0,
        diff:0
    };

    arr.forEach(element => {
        if (element.id == uniqueId) {
            element.response.push(obj1);
        }
    });

    localStorage.setItem("data", JSON.stringify(arr));

    let itemR = document.createElement('li');
    itemR.setAttribute("id", "itemR");
    let ansRH = document.createElement('h3');
    let ansRP = document.createElement('p');
    ansRH.setAttribute("id", "ansRH");
    ansRP.setAttribute("id", "ansRP");

    ansRH.innerText = nameR.value;
    ansRP.innerText = commentR.value;

    itemR.appendChild(ansRH);
    itemR.appendChild(ansRP);
    add_likeDislike(itemR , obj1 , arr);
    
    listR.appendChild(itemR);

    nameR.value = "";
    commentR.value = "";
}

function add_likeDislike(itemR , obj1 , arr){
    const div1 = document.createElement('div');
    div1.classList.add("buttons1");
    itemR.appendChild(div1);

    const div2 = document.createElement('div');
    div2.classList.add("like");
    div1.appendChild(div2);

    const item1 = document.createElement('i');
    item1.classList.add("fa-regular" , "fa-thumbs-up");
    div2.appendChild(item1);
    // item1.setAttribute("id" , "like");

    const item2 = document.createElement('p');
    item2.classList.add("likeCount");
    item2.innerText = obj1.like;
    div2.appendChild(item2);

    const div3 = document.createElement('div');
    div3.classList.add("dislike");
    div1.appendChild(div3);

    const item4 = document.createElement('i');
    item4.classList.add("fa-regular" , "fa-thumbs-down");
    div3.appendChild(item4);
    // item4.setAttribute("id" , "dislike");

    const item5 = document.createElement('p');
    item5.classList.add("dislikeCount");
    item5.innerText = obj1.dislike;
    div3.appendChild(item5);


    item1.addEventListener("click" , (event)=>{
        event.stopPropagation();
        // item1.style.color = "red";
        // item4.style.color = "black";
        item2.innerText = parseInt(item2.innerText)+1;
        //count1 = item2.innerText;

        obj1.like = item2.innerText;
        obj1.diff = obj1.like - obj1.dislike;
        sortResponse(arr);
        addItemLocal(arr);
        updateResponseDisplay(arr);
        
    })

    item4.addEventListener("click" , (event)=>{
        event.stopPropagation();
        item4.style.color = "red";
        item1.style.color = "black";
        item5.innerText = parseInt(item5.innerText)+1;
        //count1 = item2.innerText;

        obj1.dislike = item5.innerText;
        obj1.diff = obj1.like - obj1.dislike;
        sortResponse(arr);
        addItemLocal(arr);
        updateResponseDisplay(arr);
    })

}
function sortResponse(arr)
{
    arr.forEach(item=>{
        item.response.sort((a,b)=> (b.like-b.dislike) - (a.like-a.dislike));
    })
    addItemLocal(arr);
}
function updateResponseDisplay(arr)
{
    listR.innerHTML = "";
    arr[index].response.forEach(item =>{
        add_response(item,arr)
    })
}
function add_response(item , arr)
{
    let itemR = document.createElement('li');
    itemR.setAttribute("id", "itemR");
    let ansRH = document.createElement('h3');
    let ansRP = document.createElement('p');
    ansRH.setAttribute("id", "ansRH");
    ansRP.setAttribute("id", "ansRP");

    ansRH.innerText = item.name;
    ansRP.innerText = item.comment;

    itemR.appendChild(ansRH);
    itemR.appendChild(ansRP);
    add_likeDislike(itemR , item , arr);
    
    listR.appendChild(itemR);

    nameR.value = "";
    commentR.value = "";
}

function add_star(para)
{
    const star = document.createElement('i');
    star.classList.add("fa-regular" , "fa-star");
    para.style.position= "relative";
    star.setAttribute("id" , "star_icon");
    para.appendChild(star);

    let array1 = getItemLocal();


    star.addEventListener("click" , (e)=>{
    let a1 = e.target.parentNode.parentNode;
    console.log(a1);
    
    let a1ID = parseInt(a1.id);
    let index = findIndexOfArray(a1ID);
    console.log(index);
    
        e.stopPropagation();
        if(e.target.tagName === "I")
        {
            let array1 = getItemLocal();
            if(array1[index].question_star){
                array1[index].question_star=false;
                star.style.color = "black";
                let element = array1.splice(index,1)[0];
                array1.push(element);
                innerAdder.appendChild(a1);
            }
            else{
                array1[index].question_star= true;
                star.style.color = "orange"; 
                let temp = array1.splice(index, 1)[0];
                array1.unshift(temp);

                innerAdder.insertBefore(a1, innerAdder.firstChild);

            }
            addItemLocal(array1);
        }
    })
}

function findIndexOfArray(a1ID)
{
    console.log(a1ID);
    
    let array1 = getItemLocal()||[];
    console.log(array1);
    
    return array1.findIndex(item => item.id == a1ID);
}