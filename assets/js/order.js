'use strict'

let btnNext = document.querySelector('.btn-next');
let btnPrev = document.querySelector('.btn-prev');
let btn = document.querySelector('.button-container .btn');
let progressBar = document.querySelector('#checkout-progress');
let btnSubmit = document.querySelector('.btn-submit');
const table = document.getElementById("#table");
let balance = document.querySelector('.bill span');
let tableList = document.querySelector('#tableList');
let radios = document.querySelectorAll('[type=radio]');
let texts = document.querySelectorAll('select');
let addonBtn = document.querySelectorAll('.addon__button');
let addonBtnOne = document.querySelector('.addon__button:nth-child(1)');
let addonBtnTwo = document.querySelector('.addon__button:nth-child(2)');
let addonBtnThree = document.querySelector('.addon__button:nth-child(3)');

const form = document.querySelector('.form__billing');
const name = document.getElementById('name');
const number = document.getElementById('number');
const date = document.getElementById('date');
const cvv = document.getElementById('cvv');

const visa = document.querySelector('.card');

const myForm = document.forms.myForm;
const fields = myForm.querySelectorAll('input,select')
const inputs = document.getElementsByClassName("number-input-text-box");


/*** 7 ***/
// PROGRESS BAR START

const progressBarOffset = progressBar.offsetHeight;
//  console.log(progressBarOffset); // 100
const progressBarTop = progressBar.offsetTop
//  console.log(progressBarTop); // 456
  
const windowHeight = document.documentElement.clientHeight;
//  console.log(windowHeight); // 664
const stepLabel = document.querySelectorAll('.step-label')
const pBar = document.querySelector('.progress-bar');
const h3 = document.querySelector('#margin40');
  

window.addEventListener('scroll', e => {

  if(window.pageYOffset> progressBarTop + 20) {
      e.preventDefault();
      // progressBar.style.display = 'block';
      progressBar.style.position = 'fixed';
      h3.style.height = '100px';
      h3.style.width = '100%';
      //h3.style.backgroundColor = 'red';
      progressBar.style.top = '4px';
      progressBar.style.left = '2%';
      progressBar.style.right = '2%';
      //pBar.style.height = '40px';
      stepLabel.forEach(step => step.style.opacity = '0');
    } else {
      progressBar.style.position = 'relative';
      //pBar.style.height = '40px';
      h3.style.height = '0px';
      stepLabel.forEach(step => step.style.opacity = '1');
    }
})

// PROGRESS BAR STOP


/* USER INPUT ARRAYS*/

// let form = document.forms.myForm;
let selectDemoA = document.getElementById('select-1');
let selectDemoB = document.getElementById('select-2');

let getWork = myForm.elements.Work;
let getLevel = myForm.elements.Level;
let getDeadline = myForm.elements.Deadline;
let getQuantity = myForm.elements.Quantity;
let getSpacing = myForm.elements.Spacing;
let getType = myForm.elements.Type;
let getFormat = myForm.elements.Format;
//getTitle, getPaperDetails, getDoc
let getTitle = myForm.elements.Title;
let getPaperDetails = myForm.elements.PaperDetails;
let getDoc = {}
// getDoc.name = myForm.elements.fileUpload.name

myForm.Work.onchange = calculator;
myForm.Deadline.onchange = calculator;
myForm.Quantity.oninput = calculator;
myForm.Spacing.onchange = calculator;

let bill;

let btnDec = document.querySelector('.button-decrement');
let btnInc = document.querySelector('.button-increment');

// add an event listener for the change event
// const spacing = document.querySelectorAll('input[name="Spacing"]');
const radioButtons = document.querySelectorAll('input[name="Work"]');

/*** 1 ***/
for(const radioButton of radioButtons){
  radioButton.addEventListener('change', computeSelected);
  radioButton.addEventListener('click', computeSelected);
  radioButton.addEventListener('change', calculator);
}


let workArr = [];
let pagesArr = [];
let dLineX


function computeSelected() {
  let selectedWork;
  
  if (this.checked) {
    selectedWork = this.value;
    this.parentElement.classList.add('add__check')
  }
  
  if (selectedWork === 'Writing') {
    selectDemoA.onchange = populateWrite;
      
    addonBtnOne.classList.add('add__check')

    populateWrite().then(selectDemoB.addEventListener('change', () => {
      let selcArr = Array.from(selectDemoB.options);
      let selected = selcArr.filter(option => option.selected).map(option => option)
      
      dLineX = selected[0].text
      
      workArr.push(selected[0].value)
      
      calculator();
      // balance.textContent = `$${selected[0]}.00`;
      })).catch(err => {
        //setStatusMessag("Failed to connect");
        console.log(err)
      });
  } else {
      addonBtnOne.classList.remove('add__check')
  }
  
  if (selectedWork === 'Rewriting') {
    selectDemoA.onchange = populateReWrite;

    addonBtnTwo.classList.add('add__check')
    
    populateReWrite().then(selectDemoB.addEventListener('change', () => {
      let selected = Array.from(selectDemoB.options).filter(option => option.selected).map(option => option);
      
      dLineX = selected[0].text
      
      workArr.push(selected[0].value)
      calculator()
      // balance.textContent = `$${selected[0]}.00`;
    })).catch(err => {
      //setStatusMessag("Failed to connect");
      console.log(err)
    });
  } else {
    addonBtnTwo.classList.remove('add__check')
  }
  
  if (selectedWork === 'Editing') {
    selectDemoA.onchange = populateEdit;

    addonBtnThree.classList.add('add__check')
    
    populateEdit().then(selectDemoB.addEventListener('change', () => {
      let selected = Array.from(selectDemoB.options).filter(option => option.selected).map(option => option);
      
      dLineX = selected[0].text
      
      workArr.push(selected[0].value)
      calculator()
      // balance.textContent = `$${selected[0]}.00`;
    })).catch(err => {
      //setStatusMessag("Failed to connect");
      console.log(err)
    });
  } else {
    addonBtnThree.classList.remove('add__check')
  }
}

  
let arr = ["|Select...", "High School|High School", "College|College", "University|University", "Master's|Master's"];



for (let prop in arr) {
  if(arr.hasOwnProperty(prop)) {
    let parts = arr[prop].split("|");
    
    // new Option(text, value, defaultSelected, selected);
    let opt = new Option(parts[1], parts[0])
    selectDemoA.appendChild(opt);
  }
}



 // 2
const populateWrite = async function(s1, s2) {
  
  s1 = selectDemoA;
  s2 = selectDemoB;
  s2.innerHTML = "";
  let optionArray;
  
  if (s1.value == "High School") {
    optionArray = ["|Select...", "42|3 hrs", "32|6 hrs", "28|12 hrs", "26|24 hrs", "23|48 hrs", "20|3 days", "18|5 days", "17|7 days", "16| 9 days", "15|10+ days"];
  } else if (s1.value == "College") {
    optionArray = ["|Select...", "48|3 hrs", "38|6 hrs", "35|12 hrs", "32|24 hrs", "26|48 hrs", "23|3 days", "20|5 days", "19|7 days", "18| 9 days", "16|10+ days"];
  } else if (s1.value == "University") {
    optionArray = ["|Select...", "51|3 hrs", "42|6 hrs", "38|12 hrs", "34|24 hrs", "28|48 hrs", "25|3 days", "23|5 days", "21|7 days", "20|9 days", "18|10+ days"];
  } else if (s1.value == "Master's") {
    optionArray = ["|Select...", "38|24 hrs", "35|48 hrs", "32|3 days", "29|5 days", "27|7 days", "24|9 days", "22|10+ days"];
  }
  
  for (const option in optionArray) {
    if(optionArray.hasOwnProperty(option)) {
      let pair = optionArray[option].split("|");
      let newOption = document.createElement("option");
      newOption.value = pair[0];
      newOption.innerHTML = pair[1];
      s2.options.add(newOption);
    }
  }
  
}

const populateReWrite = async function(s1, s2) {
  
  s1 = selectDemoA;
  s2 = selectDemoB;
  s2.innerHTML = "";
  let optionArray;
  
  if (s1.value == "High School") {
    optionArray = ["|Select...", "35|3 hrs", "25|6 hrs", "23|12 hrs", "20|24 hrs", "16|48 hrs", "14|3 days", "10|5 days", "8|7 days", "6| 9 days", "5|10+ days"];
  } else if (s1.value == "College") {
    optionArray = ["|Select...", "38|3 hrs", "33|6 hrs", "30|12 hrs", "26|24 hrs", "20|48 hrs", "18|3 days", "15|5 days", "13|7 days", "10| 9 days", "8|10+ days"];
  } else if (s1.value == "University") {
    optionArray = ["|Select...", "45|3 hrs", "38|6 hrs", "34|12 hrs", "30|24 hrs", "24|48 hrs", "21|3 days", "18|5 days", "15|7 days", "12|9 days", "10|10+ days"];
  } else if (s1.value == "Master's") {
    optionArray = ["|Select...", "38|12 hrs", "33|24 hrs", "28|48 hrs", "25|3 days", "22|5 days", "20|7 days", "18|9 days", "15|10+ days"];
  }
  
  for (const option in optionArray) {
    if(optionArray.hasOwnProperty(option)) {
      let pair = optionArray[option].split("|");
      let newOption = document.createElement("option");
      newOption.value = pair[0];
      newOption.innerHTML = pair[1];
      s2.options.add(newOption);
    }
    
  }
}

const populateEdit = async function(s1, s2) {

  s1 = selectDemoA;
  s2 = selectDemoB;
  s2.innerHTML = "";
  let optionArray;
  
  if (s1.value == "High School") {
    optionArray = ["|Select...", "30|3 hrs", "21|6 hrs", "18|12 hrs", "16|24 hrs", "12|48 hrs", "10|3 days", "8|5 days", "6|7 days", "4| 9 days", "3|10+ days"];
  } else if (s1.value == "College") {
    optionArray = ["|Select...", "32|3 hrs", "27|6 hrs", "25|12 hrs", "22|24 hrs", "16|48 hrs", "13|3 days", "10|5 days", "8|7 days", "6| 9 days", "4|10+ days"];
  } else if (s1.value == "University") {
    optionArray = ["|Select...", "36|3 hrs", "32|6 hrs", "28|12 hrs", "26|24 hrs", "21|48 hrs", "17|3 days", "18|5 days", "12|7 days", "8|9 days", "6|10+ days"];
  } else if (s1.value == "Master's") {
    optionArray = ["|Select...", "40|3 hrs", "36|6 hrs", "34|12 hrs", "32|24 hrs", "26|48 hrs", "22|3 days", "18|5 days", "14|7 days", "12|9 days", "10|10+ days"];
  }

  for (const option in optionArray) {
    if (optionArray.hasOwnProperty(option)) {
      let pair = optionArray[option].split("|");
      let newOption = document.createElement("option");
      newOption.value = pair[0];
      newOption.innerHTML = pair[1];
      s2.options.add(newOption);
    }
  }
}

  
/*INPUT NUMBER COUNTER*/
function initCount() {
    // enable active states for buttons in mobile safari
    document.addEventListener("touchstart", function () {}, false);
    setInputButtonState();
}


function handleNumberInput() {
    setInputButtonState();
  }


function handleNumberInputBlur(event) {
    const value = event.target.value;

    if (event.target.hasAttribute("min") && value < parseFloat(event.target.min))
        event.target.value = event.target.min;

    if (event.target.hasAttribute("max") && value > parseFloat(event.target.max))
        event.target.value = event.target.max;
}


function setInputButtonState() {
  // const inputs = document.getElementsByClassName("number-input-text-box");

  for (let input of inputs) {
    if (input.id.length > 0) { // during value transition the old input won't have an id
      const value = input.value;
      const parent = input.parentElement.parentElement;

    if (parent.children[0] && input.hasAttribute("min"))
      parent.children[0].disabled = value <= parseFloat(input.min);

      if (parent.children[2] && input.hasAttribute("max"))
      parent.children[2].disabled = value >= parseFloat(input.max);
    }
  }
    
}

/*** 2 ***/
btnInc.addEventListener('click', setNumber);
btnDec.addEventListener('click', setNumber);

function setNumber(event) {
  let button = event.target;
  let input = document.getElementById(button.dataset.inputId);

  if (input) {
    let value = parseFloat(input.value);
    let step = parseFloat(input.dataset.step);

    if (button.dataset.operation === "decrement") {
      value -= isNaN(step) ? 1 : step;
    // console.log(value)
    } else if (button.dataset.operation === "increment") {
      value += isNaN(step) ? 1 : step;
    //  console.log(value)
    }

    if (input.hasAttribute("min") && value < parseFloat(input.min)) {
      value = input.min;
    }

    if (input.hasAttribute("max") && value > parseFloat(input.max)) {
      value = input.max;
    }

    if (input.value !== value) {
      setInputValue(input, value);
      // setBackgroundColor();
      setInputButtonState();
      pagesArr.push(value)
      calculator()
    }
  }
}

function setInputValue(input, value) {
  let newInput = input.cloneNode(true);
  const parentBox = input.parentElement.getBoundingClientRect();

  input.id = "";

  newInput.value = value;
    
  if (value > input.value) {
    // right to left
    input.parentElement.appendChild(newInput);
    input.style.marginLeft = -parentBox.width + "px";
  } else if (value < input.value) {
    // left to right
    newInput.style.marginLeft = -parentBox.width + "px";
    input.parentElement.prepend(newInput);
    window.setTimeout(function () {
      newInput.style.marginLeft = 0
    }, 20);
  }

  window.setTimeout(function () {
    input.parentElement.removeChild(input);
  }, 250);
  
  return value
}

/*** 3 ***/
window.onload = initCount;
/*END INPUT NUMBER COUNTER*/


const spacing = document.querySelectorAll('input[name="Spacing"]');

/*** 4 ***/
for(const spaceButton of spacing){
  spaceButton.addEventListener('change', calculator)
}

selectDemoB.onchange = calculator

function calculator() {
  let result, k, initial;
  let price = parseInt(workArr[workArr.length-1]);
  let value = parseInt(pagesArr[pagesArr.length-1]);
  initial = +value;
  if (!initial) initial = 1
  if (!price) return
  // if (myForm.Spacing.value === 'Double') {
  //   k = 0.5;
  //   result = Math.round(initial * price * k);
  //   balance.textContent = `$${result}.00`;
  // } else {
  //   k = 1;
  //   result = Math.round(initial * price * k);
  //   balance.textContent = `$${result}.00`;
  // }
  balance.style.opacity = '0';
  // Create a DB latency
  setTimeout(() => {
    if (myForm.Spacing.value === 'Double') {
      k = 0.5;
      result = Math.round(initial * price * k);
      // balance.style.transition = 'all 0.4 ease-in-out'
      balance.style.opacity ='1'
      balance.textContent = `$${result}.00`;
    } else {
      k = 1;
      result = Math.round(initial * price * k);
      // balance.style.transition = 'all 0.4 ease-in-out'
      balance.style.opacity ='1'
      balance.textContent = `$${result}.00`;
    }
  }, 450)

 //  console.log(result);
}

/*** 5 ***/
calculator()


/* INPUT UI UPDATES 
selectArr = Array.from(texts);
let selectedAll = selectArr.every(text => {
  return text.value === ''
})
*/

/*** 6 ***/
progressBar.style.position = 'relative';
btnPrev.classList.add('disabled');

let show = (elem) => {
	elem.style.display = 'block';
};

let hide = (elem) => {
	elem.style.display = 'none';
};

let toggle = (elem) => {
	if (window.getComputedStyle(elem).display === 'block') {
		hide(elem);
		return;
	}
	
	show(elem);
};


initMultiStepForm();


function initMultiStepForm() {
  btnNext.addEventListener('click', function(e) {
  
    e.preventDefault();

    window.scrollTo(0, myForm.offsetTop)

    let inputsValid = validateInputs(this);
    
    if (inputsValid) {
      let currentStepNum = parseInt(progressBar.getAttribute('data-current-step'));
      let nextStepNum = (currentStepNum + 1);
      let currentStep = document.querySelector('.step.step-' + currentStepNum);
      let nextStep = document.querySelector('.step.step-' + nextStepNum);
      
      btnPrev.classList.remove('disabled');
      // btnPrev.disabled = false;
      toggle(document.querySelector('#section'+currentStepNum));
      toggle(document.querySelector('#section'+nextStepNum));

      window.scrollTo(0, document.querySelector('#section'+currentStepNum).offsetTop-50)
      window.scrollTo(0, document.querySelector('#section'+nextStepNum).offsetTop-50)
      
      if (currentStepNum === 1) {
        addOrderDetail(getWork.name, getWork.value);
        addOrderDetail(getLevel.name, getLevel.value);
        addOrderDetail(getDeadline.name, dLineX);
        addOrderDetail(getQuantity.name, getQuantity.value);
        addOrderDetail(getSpacing[0].name, getSpacing.value);
        addOrderDetail(getType.name, getType.value);
        addOrderDetail(getFormat.name, getFormat.value);
      }

      if (currentStepNum === 2) {
        addOrderDetail(getTitle.name, getTitle.value);
        addOrderDetail(getPaperDetails.name, getPaperDetails.value);
        addOrderDetail(getDoc.name, getDoc.value)
      }
      
      if(nextStepNum === 4) {
        toggle(btnNext);
        toggle(btnSubmit);
      }
      
      progressBar.classList.remove('.step-' + currentStepNum)
      progressBar.classList.add('.step-' + (currentStepNum + 1));
      
      currentStep.classList.remove('active');
      currentStep.classList.add('valid');
      
      
      nextStep.classList.add('active');
      progressBar.removeAttribute('class');
      progressBar.classList.add('step-' + nextStepNum);
      progressBar.setAttribute('data-current-step', nextStepNum);
    }
})


/*BILLING FORM*/

btnSubmit.addEventListener('click', function(e) {
      toggle(btnSubmit);
      toggle(btnPrev);
      let currentStepNum = parseInt(progressBar.getAttribute('data-current-step'));
      let currentStep = document.querySelector('.step.step-' + currentStepNum);
      currentStep.classList.remove('active');
      currentStep.classList.add('valid');
  
})

btnPrev.addEventListener('click', function() {
  let currentStepNum = parseInt(progressBar.getAttribute('data-current-step'));
  let prevStepNum = (currentStepNum - 1);
  let currentStep = document.querySelector('.step.step-' + currentStepNum);
  let prevStep = document.querySelector('.step.step-' + prevStepNum);

  // window.scrollTo(0, myForm.offsetTop)
  
  btnPrev.classList.remove('disabled')
  //btnNext.disabled = false;
  toggle(document.querySelector('#section' + currentStepNum))
  toggle(document.querySelector('#section' + prevStepNum))

  window.scrollTo(0, document.querySelector('#section' + currentStepNum).offsetTop-50)
  window.scrollTo(0, document.querySelector('#section' + prevStepNum).offsetTop-50)
  
  if(currentStepNum == 4){
    toggle(btnSubmit);
    toggle(btnNext);
    let section4 = document.querySelector('#section4');
    section4.style.minHeight = '100px';
  }
  if(currentStepNum == 1) {
    return false;
  }
  if(prevStepNum == 1){
    btnPrev.classList.add('disabled')
    // btnPrev.disabled = true;
  }
  
  progressBar.classList.remove('.step-' + currentStepNum)
  progressBar.classList.add('.step-' + (prevStepNum));
  
  currentStep.classList.remove('active');
  prevStep.classList.add('active')
  prevStep.classList.remove('valid');
  progressBar.removeAttribute('class')
  progressBar.classList.add('step-' + prevStepNum)
  progressBar.setAttribute('data-current-step', prevStepNum);
})

  function validateInputs(ths) {
    let inputsValid = true;

    const inputs = ths.parentElement.parentElement.querySelectorAll("input, select");
    for (let i = 0; i < inputs.length; i++) {
            const valid = inputs[i].checkValidity();
            if (!valid) {
                inputsValid = false;
                inputs[i].classList.add("invalid-input");
                showNotification();
            } else {
                inputs[i].classList.remove("invalid-input");
            }
        }
        return inputsValid;
    }
    
  function checkValidity(x) {
    if(x.validity.valueMissing) {
      return true;
    }
  }
}


/*FORMDATA*/

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}


/*** 8 ***/
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

console.log(generateID());


let fileSelect = document.getElementById('file-upload');
let fileDrag = document.getElementById('file-drag');
let pFileBar = document.getElementById('file-progress');
let submitButton  = document.getElementById('submit-button');
let m = document.getElementById('messages');

function Init() {
  fileSelect.addEventListener('change', fileSelectHandler, false);

  var xhr = new XMLHttpRequest();
  if (xhr.upload) {
    // File Drop
    fileDrag.addEventListener('dragover', fileDragHover, false);
    fileDrag.addEventListener('dragleave', fileDragHover, false);
    fileDrag.addEventListener('drop', fileSelectHandler, false);
  }
}

function fileDragHover(e) {
   e.stopPropagation();
    e.preventDefault();
    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }

let files; 

function fileSelectHandler(e) {
    // Fetch FileList object
    files = e.currentTarget.files || e.dataTransfer.files;
    pFileBar.style.display = 'inline';
    pFileBar.value = '100'
    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (let i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
    console.log("Files Uploaded",files)
    return files
  }

// Output
  function output(msg) {
    // Response
    m.innerHTML = msg;
  }

  function parseFile(file) {
    output(
      '<strong>' + encodeURI(file.name) + '</strong>'
    );
    
    var imageName = file.name;

    // Added |doc|pdf
    var isGood = (/\.(?=gif|jpg|png|jpeg|doc|pdf|odt)/gi).test(imageName);
    if (isGood) {
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('file-image').src = URL.createObjectURL(file);
    } else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      document.getElementById('response').classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }


function uploadFile(file) {
  let fileSizeLimit = 1024; // In MB
  
  if (file.size <= fileSizeLimit * 1024 * 1024) {
    // Start upload
    getDoc.name = 'File Uploaded'
    getDoc.value = file.name
    getDoc.fileUploaded = file
    console.log("on upload", file)
  } else {
    output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
  }
}

// Check for the various File API support.
if (window.File && window.FileList && window.FileReader) {
  Init();
} else {
  document.getElementById('file-drag').style.display = 'none';
}


const orderDetails = [];
let formDataDL, deadll;

/*** 9 ***/
function addOrderDetail(name, value) {
  const orderDetail = {
    name: name,
    value: value,
  };
  // console.log(orderDetail)
  orderDetails.push(orderDetail);
  const s = document.querySelector('#section3')
  s.addEventListener('DOMContentLoaded', addOrderDetailsDOM(orderDetail))
  
}


function addOrderDetailsDOM(orderDetail) {
  let pages, paper, format, level, deadline, quantity, space, title, paperDetails, doc;
  
  pages = pagesArr[pagesArr.length -1];
  pages === undefined ? pages = 1 : pages = pagesArr[pagesArr.length -1];
  
  paper = document.querySelector('#paper');
  paper.innerHTML = `${getWork.value} for <span>${getLevel.value}</span>`
  format = document.querySelector('#format');
  format.innerHTML = `${getFormat.name} <span>${getFormat.value}</span>`
  level = document.querySelector('#level');
  level.innerHTML = `${getType.name} <span>${getType.value}</span>`
  deadline = document.querySelector('#deadline');
  
  let deadL = new Date();
  const timeOptions = {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
  };
  
  let dayss = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
    
  let dLDay;
  
  if (dLineX === '3 hrs') {
    deadL.setHours(deadL.getHours() + 3);

    deadll = deadL
    
    dLDay = dayss[deadL.getDay()];
    
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
    
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else if (dLineX === '6 hrs') {
    deadL.setHours(deadL.getHours() + 6);
    
    dLDay = dayss[deadL.getDay()];
    
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
    
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else  if(dLineX === '12 hrs') {
    deadL.setHours(deadL.getHours() + 12);
    
    dLDay = dayss[deadL.getDay()];
    
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
    
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else if (dLineX === '24 hrs') {
    deadL.setHours(deadL.getHours() + 24);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
  
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else  if(dLineX === '48 hrs') {
    deadL.setHours(deadL.getHours() + 48);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
    
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else  if(dLineX === '3 days') {
    deadL.setHours(deadL.getHours() + 72);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
    
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else if (dLineX === '5 days') {
    deadL.setHours(deadL.getHours() + 120);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
  
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else if (dLineX === '7 days') {
    deadL.setHours(deadL.getHours() + 168);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
  
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else if (dLineX === '9 days') {
    deadL.setHours(deadL.getHours() + 216);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
  
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  } else if (dLineX === '10+ days') {
    deadL.setHours(deadL.getHours() + 240);
    
    dLDay = dayss[deadL.getDay()];
    deadll = deadL
    formDataDL = `${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}`
  
    deadline.innerHTML = `${getDeadline.name} <span>${deadL.toLocaleTimeString('en-US', timeOptions)}, ${dLDay}</span>`
  }
  
  //deadline.innerHTML = `${getDeadline.name} <span>${dLineX}</span>`
  quantity = document.querySelector('#quantity');
  quantity.innerHTML = `${getQuantity.name} <span>${pages}</span>`
  space = document.querySelector('#space');
  space.innerHTML = `${getSpacing[0].name} <span>${getSpacing.value}</span>`;
  //getTitle, getPaperDetailes, getDoc
  title = document.querySelector('#title');
  title.innerHTML = `${getTitle.name} <span>${getTitle.value}</span>`
  paperDetails = document.querySelector('#paper__details');
  paperDetails.innerHTML = `${getPaperDetails.name} <span>${getPaperDetails.value}</span>`
  doc = document.querySelector('#doc');
  doc.innerHTML = `${getDoc.name} <span>${getDoc.value}</span>`
}


function callbackFunction(event) {
  event.preventDefault();

  /* FILE UPLOAD */
  const myFormData = new FormData();

  // const formDataObj = Object.fromEntries(myFormData.entries());
  let getPages = pagesArr[pagesArr.length -1] || 1;
  
  let form = event.currentTarget;

  console.log("DEADLINE", deadll)
  //Get URL for api endpoint
  let url = "http://localhost:5000/api/v1/orders";
  // "http://localhost:5000/api/v1/orders";
  // form.action;
  
  const applicationState = {
    work: getWork.value,
    level: getLevel.value,
    deadline: formDataDL,// deadll,
    pages: getPages,
    spacing: getSpacing.value,
    type: getType.value,
    format: getFormat.value,
    title: getTitle.value,
    paperDetails: getPaperDetails.value,
    name: "fileUpload",
    fileUpload: getDoc.fileUploaded
  }
  
  myFormData.append('work', applicationState.work);
  myFormData.append('level', applicationState.level);
  myFormData.append('deadline', applicationState.deadline);
  myFormData.append('pages', applicationState.pages);
  myFormData.append('spacing', applicationState.spacing);
  myFormData.append('category', applicationState.type);
  myFormData.append('format', applicationState.format);
  myFormData.append('title', applicationState.title);
  myFormData.append('paperDetails', applicationState.paperDetails);
  myFormData.append('name', applicationState.name);
  myFormData.append('fileUpload', applicationState.fileUpload)

  const formDataObj = Object.fromEntries(myFormData.entries());
  console.log(formDataObj);
  
  // SENDING FORMDATA CODE TO SERVER
  console.log("FILE SIZE", applicationState.fileUpload.size,)
  console.log("FILE NAME", getDoc.value)
  
  fetch(url, {
		method: 'POST',
		headers: {
      'X-File-Name': `${getDoc.value}`,
      'X-File-Size': `${applicationState.fileUpload.size}`,
      'Content-type': 'multipart/form-data; charset=utf-8;',
			Accept: "application/json"
		},
		body: formDataObj // JSON.stringify(formDataObj),
	})
	.then(async res => {
    const json = await res.json();
		if (res.ok) {// return res.json();
      alert(json.message)
      return json
    }

    throw new Error(json.message)
    // return await Promise.reject(json);
	})
	.then((data) => {
		console.log(data);
		alert(data);
	})
	.catch(e => {
		// console.warn(e);
		alert(`An error occured: ${e.message}`)
	});
  
}

/*** 10 ***/
myForm.addEventListener('submit', callbackFunction);

// TIME TINGS
const discount = document.querySelector('#discount');
const monthDate = new Date();
let discountDate = monthDate.getMonth() + 1;

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

if(discountDate >= 12) discountDate = 0;

discount.textContent = `${months[discountDate]} 1st`;
