import './style.scss';
import { pizza } from './framework_javascript';
import { toppingArray } from './framework_javascript';
import { data } from './data';

document.getElementById('pizza').innerHTML = pizza;

const image_holder = document.getElementById('image_holder');
const pizza_image = document.createElement('IMG');
pizza_image.setAttribute('src', './images/pizza_canvas.png');
// pizza_image.setAttribute('class', "toppingImg");
// pizza_image.classList.add("toppingImg");
// pizza_image.className = "toppingImg";

let topping = [];

const topping_loader = () => {
    data.toppings.forEach((topping1, idx) => {
        topping[idx] = {};
        topping[idx].left = document.createElement('IMG');
        topping[idx].left.setAttribute('src', `./images/${topping1.file_prefix}_left.png`);
        // topping[idx].left.setAttribute('class', "toppingImg");
        // topping[idx].left.classList.add("toppingImg");
        // topping[idx].left.className = "toppingImg";

        topping[idx].right = document.createElement('IMG');
        topping[idx].right.setAttribute('src', `./images/${topping1.file_prefix}_right.png`);
        // topping[idx].right.setAttribute('class', "toppingImg");
        // topping[idx].right.classList.add("toppingImg");
        // topping[idx].right.className = "toppingImg";
    });
};
topping_loader();

const special_pizzas = document.getElementById("special_pizzas");
special_pizzas.innerHTML = `
<div id="special1" class="btn topping_font">The Italian</div>
<div id="special2" class="btn topping_font">Spicy Italian</div>
<div id="special3" class="btn topping_font">Vegetarian</div>
<div id="special4" class="btn topping_font">Meatzza</div>
<div id="special5" class="btn topping_font">The Crime</div>
`;

let counter = 0;
Array.from(toppingArray).forEach(function (element) {
    element.innerHTML += `<div class="toppings_box">
    <div class="grid-container">
        <div class="grid-item"><img src="./images/single_${data.toppings[counter].file_prefix}.png" width="80" height="60"></div>
        <div class="grid-item topping_font">${data.toppings[counter].name}</div>
        <div class="grid-item blank-grid"></div> 
        <div class="grid-item blank-grid"></div>
        <div class="grid-item">
            <div class="topping_amount">
                <label class="container">
                    <input class="img_radio extra_radio extraBtn" type="radio" name="topping_amount_${element.id}" value="Extra" />
                    <img class="topping_resize" src="./images/Extra.png">
                </label>
                <label class="container">
                    <input class="img_radio normal_radio normalBtn" type="radio" name="topping_amount_${element.id}" value="Normal" />
                    <img class="topping_resize" src="./images/Normal.png">
                </label>
                <label class="container">
                    <input class="img_radio none_radio noneBtn" type="radio" name="topping_amount_${element.id}" value="None" checked />
                    <img class="topping_resize" src="./images/None.png">
                </label>
            </div>
        </div>
        <div class="grid-item">
            <div class="portion_of_pizza">
            <label>
                <input class="img_radio left_radio" type="radio" name="pizza_portion_${element.id}" value="left" />
                <img class="img_resize" src="./images/PizzaPortionLeft.png">
            </label>
            <label>
                <input class="img_radio full_radio" type="radio" name="pizza_portion_${element.id}" value="full" checked/>
                <img class="img_resize" src="./images/PizzaPortionFull.png">
            </label>
            <label>
                <input class="img_radio right_radio" type="radio" name="pizza_portion_${element.id}" value="right" />
                <img class="img_resize" src="./images/PizzaPortionRight.png">
            </label>
        </div>
</div>`;

    counter++;
});

var extraBtn = document.getElementsByClassName("extraBtn");
var normalBtn = document.getElementsByClassName("normalBtn");
var noneBtn = document.getElementsByClassName("noneBtn");
var sizeList = document.getElementsByClassName("size_radio");

var totalPrice = 0;
var sizePrice = 0;
var toppingCounter = 0;
var dealCost = 0;

const calculateTotalPrice = () => {
    dealCost = 0;
    toppingCounter = 0;
    totalPrice = -1;
    sizePrice = 0;
    Array.from(sizeList).forEach(function(element){
        if(element.checked){
            Array.from(data.sizes).forEach(function(pizzaSize){
                if(element.value == pizzaSize.size){
                    sizePrice = pizzaSize.cost;
                }
            })
        }
    })
    let counter = 0;
    var img = document.getElementById('specialImg');
    img.style.display = 'none';
    Array.from(toppingArray).forEach(function (element) {
        if (extraBtn[counter].checked) {
            totalPrice += 2;
            toppingCounter += 2;
        }
        else if (normalBtn[counter].checked) {
            totalPrice += 1;
            toppingCounter += 1;
        }
        else if (noneBtn[counter].checked) {
            totalPrice += 0;
        }
        counter++;
    });
    if (toppingCounter >= 5) {
        dealCost = -1;
        img.style.display = 'block';
    }
    else {
        dealCost = 0;
    }
    totalPrice += dealCost;
    if (totalPrice == -1) {
        totalPrice = 0;
    }
    totalPrice += sizePrice;
    document.getElementById("total").innerHTML = "Your current total is: $" + totalPrice + ".00";
}

for(let iterator of document.querySelectorAll(".extraBtn,.normalBtn,.noneBtn,.size_radio")){
    iterator.addEventListener('click', calculateTotalPrice);
}

calculateTotalPrice();

const canvas = document.getElementById('pizza_view');

canvas.width = 630;
canvas.height = 630;
const ctx = canvas.getContext('2d');

let anchovy_left = false;
let anchovy_right = false;
let anchovy_display = false;
let bacon_left = false;
let bacon_right = false;
let bacon_display = false;
let bell_peppers_left = false;
let bell_peppers_right = false;
let bell_peppers_display = false;
let cheese_left = false;
let cheese_right = false;
let cheese_display = false;
let ham_left = false;
let ham_right = false;
let ham_display = false;
let jalepenos_left = false;
let jalepenos_right = false;
let jalepenos_display = false;
let olives_left = false;
let olives_right = false;
let olives_display = false;
let pepperoni_left = false;
let pepperoni_right = false;
let pepperoni_display = false;
let pineapple_left = false;
let pineapple_right = false;
let pineapple_display = false;
let sausage_left = false;
let sausage_right = false;
let sausage_display = false;

document.getElementById("add_to_order").addEventListener('click', addToOrder);

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

function addToOrder() {
    modal.style.display = "block";
    document.getElementById('total_amount').innerHTML = `The total cost of your pizza was ${totalPrice}.00`;
    resetAllToppings();
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("special1").addEventListener('click', function(){createSpecialPizza(data.prebuilt1[0])});
document.getElementById("special2").addEventListener('click', function(){createSpecialPizza(data.prebuilt2[0])});
document.getElementById("special3").addEventListener('click', function(){createSpecialPizza(data.prebuilt3[0])});
document.getElementById("special4").addEventListener('click', function(){createSpecialPizza(data.prebuilt4[0])});
document.getElementById("special5").addEventListener('click', function(){createSpecialPizza(data.prebuilt5[0])});
for(let iterator of document.querySelectorAll("#special1,#special2,#special3,#special4,#special5")){
    iterator.addEventListener('click', calculateTotalPrice)
}

const extraRadioBtn = document.getElementsByClassName("extra_radio");
const normalRadioBtn = document.getElementsByClassName("normal_radio");
const noneRadioBtn = document.getElementsByClassName("none_radio");
const leftRadioBtn = document.getElementsByClassName("left_radio");
const fullRadioBtn = document.getElementsByClassName("full_radio");
const rightRadioBtn = document.getElementsByClassName("right_radio");

var imageWidth = 624;
var imageHeight = 620;

const loop = () => {
    ctx.clearRect(0, 0, 0, 0);
    ctx.drawImage(pizza_image, 0, 0, imageWidth, imageHeight);
    if (anchovy_display) {
        if (anchovy_left) {
            ctx.drawImage(topping[0].left, 0, 0, imageWidth, imageHeight);
        }
        if (anchovy_right) {
            ctx.drawImage(topping[0].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (bacon_display) {
        if (bacon_left) {
            ctx.drawImage(topping[1].left, 0, 0, imageWidth, imageHeight);
        }
        if (bacon_right) {
            ctx.drawImage(topping[1].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (bell_peppers_display) {
        if (bell_peppers_left) {
            ctx.drawImage(topping[2].left, 0, 0, imageWidth, imageHeight);
        }
        if (bell_peppers_right) {
            ctx.drawImage(topping[2].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (cheese_display) {
        if (cheese_left) {
            ctx.drawImage(topping[3].left, 0, 0, imageWidth, imageHeight);
        }
        if (cheese_right) {
            ctx.drawImage(topping[3].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (ham_display) {
        if (ham_left) {
            ctx.drawImage(topping[4].left, 0, 0, imageWidth, imageHeight);
        }
        if (ham_right) {
            ctx.drawImage(topping[4].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (jalepenos_display) {
        if (jalepenos_left) {
            ctx.drawImage(topping[5].left, 0, 0, imageWidth, imageHeight);
        }
        if (jalepenos_right) {
            ctx.drawImage(topping[5].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (olives_display) {
        if (olives_left) {
            ctx.drawImage(topping[6].left, 0, 0, imageWidth, imageHeight);
        }
        if (olives_right) {
            ctx.drawImage(topping[6].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (pepperoni_display) {
        if (pepperoni_left) {
            ctx.drawImage(topping[7].left, 0, 0, imageWidth, imageHeight);
        }
        if (pepperoni_right) {
            ctx.drawImage(topping[7].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (pineapple_display) {
        if (pineapple_left) {
            ctx.drawImage(topping[8].left, 0, 0, imageWidth, imageHeight);
        }
        if (pineapple_right) {
            ctx.drawImage(topping[8].right, 0, 0, imageWidth, imageHeight);
        }
    }
    if (sausage_display) {
        if (sausage_left) {
            ctx.drawImage(topping[9].left, 0, 0, imageWidth, imageHeight);
        }
        if (sausage_right) {
            ctx.drawImage(topping[9].right, 0, 0, imageWidth, imageHeight);
        }
    }

    for (let i = 0; i < extraRadioBtn.length; i++) {
        if (extraRadioBtn[i].checked) {
            eval(data.toppings[i].file_prefix + "_display = true;");
        }
    }
    for (let i = 0; i < normalRadioBtn.length; i++) {
        if (normalRadioBtn[i].checked) {
            eval(data.toppings[i].file_prefix + "_display = true;");
        }
    }
    for (let i = 0; i < noneRadioBtn.length; i++) {
        if (noneRadioBtn[i].checked) {
            eval(data.toppings[i].file_prefix + "_display = false;");
        }
    }
    for (let i = 0; i < leftRadioBtn.length; i++) {
        if (leftRadioBtn[i].checked) {
            eval(data.toppings[i].file_prefix + "_left = true;");
            eval(data.toppings[i].file_prefix + "_right = false;");
        }
    }
    for (let i = 0; i < fullRadioBtn.length; i++) {
        if (fullRadioBtn[i].checked) {
            eval(data.toppings[i].file_prefix + "_left = true;");
            eval(data.toppings[i].file_prefix + "_right = true;");
        }
    }
    for (let i = 0; i < rightRadioBtn.length; i++) {
        if (rightRadioBtn[i].checked) {
            eval(data.toppings[i].file_prefix + "_left = false;");
            eval(data.toppings[i].file_prefix + "_right = true;");
        }
    }
};

setInterval(loop, 100);

function resetAllToppings() {
    noneRadioBtn[0].checked = true;
    fullRadioBtn[0].checked = true;
    noneRadioBtn[1].checked = true;
    fullRadioBtn[1].checked = true;
    noneRadioBtn[2].checked = true;
    fullRadioBtn[2].checked = true;
    noneRadioBtn[3].checked = true;
    fullRadioBtn[3].checked = true;
    noneRadioBtn[4].checked = true;
    fullRadioBtn[4].checked = true;
    noneRadioBtn[5].checked = true;
    fullRadioBtn[5].checked = true;
    noneRadioBtn[6].checked = true;
    fullRadioBtn[6].checked = true;
    noneRadioBtn[7].checked = true;
    fullRadioBtn[7].checked = true;
    noneRadioBtn[8].checked = true;
    fullRadioBtn[8].checked = true;
    noneRadioBtn[9].checked = true;
    fullRadioBtn[9].checked = true;
}

function createSpecialPizza(prebuiltObject) {
    let prebuiltPizza = prebuiltObject;
    resetAllToppings();
    let counter = 0;
    Array.from(sizeList).forEach(function(element){
        if(element.value == prebuiltPizza.size){
            element.checked = true;
        }
    })
    data.toppings.forEach(function(listTopping){
        if(prebuiltPizza.toppings.includes(listTopping.file_prefix)){
            normalRadioBtn[counter].checked = true;
            fullRadioBtn[counter].checked = true;
        }
        counter++;
    })
}

const setCanvasSize = () => {
    if(window.innerWidth <= 700){
        canvas.width = (document.getElementById("image_holder").offsetWidth);
        canvas.height = canvas.width;
        imageHeight = canvas.height;
        imageWidth = canvas.width;
    }
    else{
        canvas.width = imageWidth = 624;
        canvas.height = imageHeight = 620;
    }
}

window.addEventListener("resize", setCanvasSize)
window.addEventListener("onload", setCanvasSize)
