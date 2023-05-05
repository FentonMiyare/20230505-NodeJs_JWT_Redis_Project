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

const form = document.querySelector('.form__billing');
const name = document.getElementById('name');
const number = document.getElementById('number');
const date = document.getElementById('date');
const cvv = document.getElementById('cvv');

const visa = document.querySelector('.card');

const myForm = document.forms.myForm;
const fields = myForm.querySelectorAll('input,select')


/* USER INPUT ARRAYS*/
const order1 = {
    'Writing': {
      'highSchool': {
        '3hrs': 42,
        '6hrs': 32,
        '12hrs': 28,
        '24hrs': 26,
        '48hrs': 23,
        '3days': 20,
        '5days': 18,
        '7days': 17,
        '9days': 16,
        '10days': 15,
      },
      'college': {
        '3hrs': 48,
        '6hrs': 38,
        '12hrs': 35,
        '24hrs': 32,
        '48hrs': 26,
        '3days': 23,
        '5days': 20,
        '7days': 19,
        '9days': 18,
        '10days': 16,
      },
      'university': {
        '3hrs': 51,
        '6hrs': 42,
        '12hrs': 38,
        '24hrs': 34,
        '48hrs': 28,
        '3days': 25,
        '5days': 23,
        '7days': 21,
        '9days': 20,
        '10days': 18,
      },
      'masters': {
        '3hrs': 0,
        '6hrs': 0,
        '12hrs': 0,
        '24hrs': 38,
        '48hrs': 35,
        '3days': 32,
        '5days': 29,
        '7days': 27,
        '9days': 24,
        '10days': 22,
      }
    }
  }
  
  const order2 = {
    'Rewriting': {
      'highSchool': {
        '3hrs': 35,
        '6hrs': 25,
        '12hrs':23,
        '24hrs': 20,
        '48hrs': 16,
        '3days': 14,
        '5days': 10,
        '7days': 8,
        '9days': 6,
        '10days': 5,
      },
      'college': {
        '3hrs': 38,
        '6hrs': 33,
        '12hrs': 30,
        '24hrs': 26,
        '48hrs': 20,
        '3days': 18,
        '5days': 15,
        '7days': 13,
        '9days': 10,
        '10days': 8,
      },
      'university': {
        '3hrs': 45,
        '6hrs': 38,
        '12hrs': 34,
        '24hrs': 30,
        '48hrs': 24,
        '3days': 21,
        '5days': 18,
        '7days': 15,
        '9days': 12,
        '10days': 10,
      },
      'masters': {
        '3hrs': 0,
        '6hrs': 0,
        '12hrs': 38,
        '24hrs': 33,
        '48hrs': 28,
        '3days': 25,
        '5days': 22,
        '7days': 20,
        '9days': 18,
        '10days': 15,
      }
    }
  }
  
  const order3 = {
    'Editing': {
      'highSchool': {
        '3hrs': 30,
        '6hrs': 21,
        '12hrs': 18,
        '24hrs': 16,
        '48hrs': 12,
        '3days': 10,
        '5days': 8,
        '7days': 6,
        '9days': 4,
        '10days': 3,
      },
      'college': {
        '3hrs': 32,
        '6hrs': 27,
        '12hrs': 25,
        '24hrs': 22,
        '48hrs': 16,
        '3days': 13,
        '5days': 10,
        '7days': 8,
        '9days': 6,
        '10days': 4,
      },
      'university': {
        '3hrs': 36,
        '6hrs': 32,
        '12hrs': 28,
        '24hrs': 26,
        '48hrs': 21,
        '3days': 17,
        '5days': 14,
        '7days': 12,
        '9days': 8,
        '10days': 6,
      },
      'masters': {
        '3hrs': 40,
        '6hrs': 36,
        '12hrs': 34,
        '24hrs': 32,
        '48hrs': 26,
        '3days': 22,
        '5days': 18,
        '7days': 14,
        '9days': 12,
        '10days': 10,
      }
    }
  }
  

/*INPUT NUMBER COUNTER*/
function initCount() {
    // enable active states for buttons in mobile safari
    document.addEventListener("touchstart", function () {}, false);
    setInputButtonState();
}

try {
  function handleNumberInput() {
    setInputButtonState()
  }
} catch (e) {
  console.log(e)
}


function handleNumberInputBlur(event) {
    const value = event.target.value;

    if (event.target.hasAttribute("min") && value < parseFloat(event.target.min))
        event.target.value = event.target.min;

    if (event.target.hasAttribute("max") && value > parseFloat(event.target.max))
        event.target.value = event.target.max;
}

function setInputButtonState() {
    const inputs = document.getElementsByClassName("number-input-text-box");

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

function setNumber(event) {
    let button = event.target;
    let input = document.getElementById(button.dataset.inputId);

    if (input) {
        let value = parseFloat(input.value);
        let step = parseFloat(input.dataset.step);

        if (button.dataset.operation === "decrement") {
            value -= isNaN(step) ? 1 : step;
        } else if (button.dataset.operation === "increment") {
            value += isNaN(step) ? 1 : step;
        }

        if (input.hasAttribute("min") && value < parseFloat(input.min)) {
            value = input.min;
        }

        if (input.hasAttribute("max") && value > parseFloat(input.max)) {
            value = input.max;
        }

        if (input.value !== value) {
            setInputValue(input, value);
          //  setBackgroundColor();
            setInputButtonState();
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
}

window.onload = initCount;
/*END INPUT NUMBER COUNTER*/


/* INPUT UI UPDATES */
selectArr = Array.from(texts);
let selectedAll = selectArr.every(text => {
  return text.value === ''
})


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
  btnNext.addEventListener('click', function(e){
  
  e.preventDefault();
  inputsValid = validateInputs(this);
  
  let getWork = myForm.elements.work;
  let getLevel = myForm.elements.level;
  let getDeadline = myForm.elements.deadline;
  let getQuantity = myForm.elements.quantity;
  let getSpacing = myForm.elements.spacing;
  let getType = myForm.elements.type;
  let getFormat = myForm.elements.format;
  
  let bill;
  
  if (inputsValid) {
    let currentStepNum = parseInt(progressBar.getAttribute('data-current-step'));
    let nextStepNum = (currentStepNum + 1);
    let currentStep = document.querySelector('.step.step-' + currentStepNum);
    let nextStep = document.querySelector('.step.step-' + nextStepNum);
    
    btnPrev.classList.remove('disabled');
    // btnPrev.disabled = false;
    toggle(document.querySelector('#section'+currentStepNum));
    toggle(document.querySelector('#section'+nextStepNum));
    
    if (currentStepNum === 1) {
      addOrderDetail(getWork[0].name, getWork.value);
      addOrderDetail(getLevel.name, getLevel.value);
      addOrderDetail(getDeadline.name, getDeadline.value);
      addOrderDetail(getQuantity.name, getQuantity.value);
      addOrderDetail(getSpacing[0].name, getSpacing.value);
      addOrderDetail(getType.name, getType.value);
      addOrderDetail(getFormat.name, getFormat.value);
      
      if (radios[0].checked) {
        bill = parseInt(order1[getWork.value][getLevel.value][getDeadline.value]) * getQuantity.value;
        //  console.log(bill, typeof(bill))
      } else if (radios[1].checked) {
        bill = parseInt(order2[getWork.value][getLevel.value][getDeadline.value]) * getQuantity.value;
      } else /*if (radios[2].checked)*/ {
        bill = parseInt(order3[getWork.value][getLevel.value][getDeadline.value]) * getQuantity.value;
      }
      
      if (getSpacing.value === 'single') {
        let amount = parseInt(bill * 2);
        balance.textContent = `$${amount}.00`;
        console.log(amount)
      } else {
        let amount = parseInt(bill * 1);
        balance.textContent = `$${amount}.00`;
      }
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
    
    if (name.value === '' || number.value.length !== 19 || date.value.length !== 5 || isNotDate(date) === true || cvv.value.length < 3) {
      e.preventDefault();
    } else {
      toggle(btnSubmit);
      toggle(btnPrev);
      let currentStepNum = parseInt(progressBar.getAttribute('data-current-step'));
      let currentStep = document.querySelector('.step.step-' + currentStepNum);
      currentStep.classList.remove('active');
      currentStep.classList.add('valid');
    };
    
    // 5. if any input is empty show the alert of that input
    let input = document.querySelectorAll('.billing');
    for (i = 0; i < input.length; i++) {
      if (input[i].value === '') {
        input[i].nextElementSibling.style.opacity = '1';
      }
    }
  
})


btnPrev.addEventListener('click', function() {
  let currentStepNum = parseInt(progressBar.getAttribute('data-current-step'));
  let prevStepNum = (currentStepNum - 1);
  let currentStep = document.querySelector('.step.step-' + currentStepNum);
  let prevStep = document.querySelector('.step.step-' + prevStepNum);
  
  btnPrev.classList.remove('disabled')
  //btnNext.disabled = false;
  toggle(document.querySelector('#section' + currentStepNum))
  toggle(document.querySelector('#section' + prevStepNum))
  
  if(currentStepNum == 4){
    toggle(btnSubmit);
    toggle(btnNext);
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


const progressBarOffset = progressBar.offsetHeight;
//  console.log(progressBarOffset); // 100
const progressBarTop = progressBar.offsetTop
//  console.log(progressBarTop); // 456
  
const windowHeight = document.documentElement.clientHeight;
//  console.log(windowHeight); // 664
const stepLabel = document.querySelectorAll('.step-label')
const pBar = document.querySelector('.progress-bar');
  

window.addEventListener('scroll', e => {

  if(window.pageYOffset> progressBarTop - 0) {
      e.preventDefault();
      progressBar.style.position = 'fixed';
      progressBar.style.top = '30px';
      pBar.style.height = '40px'
      stepLabel.forEach(step => step.style.display = 'none');
    } else {
      progressBar.style.position = 'relative';
     // pBar.style.height = '60px';
      stepLabel.forEach(step => step.style.display = 'block')
    }
})


/*FORMDATA*/
// const myForm = document.querySelector('.myForm');
/* radios.forEach(radio => {
  radio.addEventListener('click',e => {
    radio.classList.add('input');
    radio.setAttribute('checked', 'on');
    const checked = radio.hasAttribute('checked');
  })
}); */


function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

console.log(generateID());

const orderDetails = [];

function addOrderDetail(name, value) {
  const orderDetail = {
    name: name,
    value: value,
  };
  console.log('hii', orderDetail)
  orderDetails.push(orderDetail);
  addOrderDetailsDOM(orderDetail);
}

function addOrderDetailsDOM(orderDetail) {
  const item = document.createElement("tr");

  item.innerHTML = `
        <td>
          ${orderDetail.name}: <span>${(orderDetail.value)}</span
          >
        </td>
    `;
  tableList.appendChild(item);
}


// const fields = myForm.querySelectorAll('input,select');

function callbackFunction(event) {
  event.preventDefault();
  const myFormData = new FormData(event.target);
  
  const formDataObj = Object.fromEntries(myFormData.entries());
  // console.log(formDataObj);
  
  formDataObj.spacing = myFormData.getAll('spacing');
  formDataObj.work = myFormData.getAll('work');
  
  const a = formDataObj.work;
  const b = formDataObj.level;
  const c = formDataObj.deadline;
  const d = parseInt(formDataObj.quantity);
  const e = formDataObj.spacing;
  const f = formDataObj.type;
  const g = formDataObj.format;
  
  console.log('number', d);
  const date = new Date();
  const time = date.toLocaleTimeString("en-US", {
  //  timeZone: "America/Los_Angeles",
    hour12: false,
    hour: "numeric",
    minute: "2-digit",
  });
  console.log(time);

};

myForm.addEventListener('submit', callbackFunction);

/* FILE UPLOAD */
function ekUpload(){
  function Init() {

    console.log("Upload Initialised");

    var fileSelect    = document.getElementById('file-upload'),
        fileDrag      = document.getElementById('file-drag'),
        submitButton  = document.getElementById('submit-button');

    fileSelect.addEventListener('change', fileSelectHandler, false);

    // Is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  }

  function fileDragHover(e) {
    var fileDrag = document.getElementById('file-drag');

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }

  function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
  }

  // Output
  function output(msg) {
    // Response
    var m = document.getElementById('messages');
    m.innerHTML = msg;
  }

  function parseFile(file) {

    console.log(file.name);
    output(
      '<strong>' + encodeURI(file.name) + '</strong>'
    );
    
    // var fileType = file.type;
    // console.log(fileType);
    var imageName = file.name;

    var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (true) {
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('file-image').src = URL.createObjectURL(file);
    }
    else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      document.getElementById('response').classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }

  function setProgressMaxValue(e) {
    var pBar = document.getElementById('file-progress');

    if (e.lengthComputable) {
      pBar.max = e.total;
    }
  }

  function updateFileProgress(e) {
    var pBar = document.getElementById('file-progress');

    if (e.lengthComputable) {
      pBar.value = e.loaded;
    }
  }

  function uploadFile(file) {

    var xhr = new XMLHttpRequest(),
      fileInput = document.getElementById('class-roster-file'),
      pBar = document.getElementById('file-progress'),
      fileSizeLimit = 1024; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size <= fileSizeLimit * 1024 * 1024) {
        // Progress bar
        pBar.style.display = 'inline';
        xhr.upload.addEventListener('loadstart', setProgressMaxValue, false);
        xhr.upload.addEventListener('progress', updateFileProgress, false);

        // File received / failed
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4) {
            // Everything is good!

            // progress.className = (xhr.status == 200 ? "success" : "failure");
            // document.location.reload(true);
          }
        };

        // Start upload
        xhr.open('POST', myForm.action, true);
        xhr.setRequestHeader('X-File-Name', file.name);
        xhr.setRequestHeader('X-File-Size', file.size);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(file);
      } else {
        output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
      }
    }
  }

  // Check for the various File API support.
  if (window.File && window.FileList && window.FileReader) {
    Init();
  } else {
    document.getElementById('file-drag').style.display = 'none';
  }
}
ekUpload();

/*BILLING FORM*/

/*  SHOW ERROR  */
function showError(element, error) {
    if(error === true) {
        element.style.opacity = '1';
    } else {
        element.style.opacity = '0';
    }
};

/*  CHANGE THE FORMAT NAME  */
name.addEventListener('input', function() {
    let alert1 = document.getElementById('alert-1');
    let error = this.value === '';
    showError(alert1, error);
    document.getElementById('card-name').textContent = this.value;
});

/*  CHANGE THE FORMAT CARD NUMBER*/
number.addEventListener('input', function(e) {
    this.value = numberAutoFormat();

    //show error when is different of 16 numbers and 3 white space
    let error = this.value.length !== 19;
    let alert2 = document.getElementById('alert-2');
    showError(alert2, error);

    document.querySelector('.card__number').textContent = this.value;
});

function numberAutoFormat() {
    let valueNumber = number.value;
    // if white space change to ''. If is not a number between 0-9 change to ''
    let v = valueNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    // the value got min of 4 digits and max of 16
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 4) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join(' ');
    } else {
        return valueNumber;
    }
};

/*  CHANGE THE FORMAT DATE  */
date.addEventListener('input', function(e) {
    this.value = dateAutoFormat();
    
    // show error if is not a valid date
    let alert3 = document.getElementById('alert-3');
    showError(alert3, isNotDate(this));

    let dateNumber = date.value.match(/\d{2,4}/g);
    document.getElementById('month').textContent = dateNumber[0];
    document.getElementById('year').textContent = dateNumber[1];
});

function isNotDate(element) {
    let actualDate = new Date();
    let month = actualDate.getMonth() + 1; // start january 0 we need to add + 1
    let year = Number(actualDate.getFullYear().toString().substr(-2)); // 2022 -> 22
    // console.log(year);
    let dateNumber = element.value.match(/\d{2,4}/g);
    // console.log(dateNumber);
    let monthNumber = Number(dateNumber[0]);
    
    let yearNumber = Number(dateNumber[1]);
    
    if(element.value === '' || monthNumber < 1 || monthNumber > 12 || yearNumber < year || (monthNumber <= month && yearNumber === year)) {
        return true;
    } else {
        return false;
    }
}

function dateAutoFormat() {
    let dateValue = date.value;
    // if white space -> change to ''. If is not a number between 0-9 -> change to ''
    let v = dateValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    // min of 2 digits and max of 4
    let matches = v.match(/\d{2,4}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 2) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join('/');
    } else {
        return dateValue;
    }
};

/*  CHANGE THE FORMAT CVV  */
cvv.addEventListener('input', function(e) {
    let alert4 = document.getElementById('alert-4');
    let error = this.value.length < 3;
    showError(alert4, error)
});

/* CHECK IF KEY PRESSED IS A NUMBER (input of card number, date and cvv) */
function isNumeric(event) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode > 31)) {
        return false;
    }
};

// TIME TINGS
console.log(
  monthDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  }),
);

// SETTING THE DEADLINE TIME
const timeOptions = {
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
};

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

let day = monthDate.getDay()
let time = monthDate.getTime()
console.log(days[day])
console.log(monthDate.toLocaleTimeString('en-US', timeOptions));


//let monthDate = new Date();
// monthDate.setHours(monthDate.getHours() + 3);
//monthDate.setHours(monthDate.getHours() + 6);
monthDate.setHours(monthDate.getHours() + 12);

alert( monthDate ); 

/*
const date = new Date();
let a = date.getTime(1000 * 60 * 60 * 24)

console.log(new Date(a).getTime())

const time = date.toLocaleTimeString("en-US", {
  //  timeZone: "America/Los_Angeles",
  hour12: true,
  hour: "numeric",
  minute: "2-digit",
});

*/



/* TEAM PAGE

<div class="profile">
            <div class="profile-bg"></div>
            <div class="profile__container">
              <div class="profile-image">
                <!--a class="camera" href="#">
                  <i class="fas fa-camera"></i>
                </a-->
                <img srcset="/img/users/12.jpg" src="/img/users/12.jpg" alt="profile picture">
              </div>
              <div class="profile-info">
                <h3 class="first-name"><span>Angela</span></h3>
                <h3 class="second-name">Yun He</h3>
                <h4>ABOUT</h4>
                <p>
                  hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>
          
                <div class="social-media-icons">
                  <!--a href="https://twitter.com/zephybite" target="_blank">
                                  <i class="fab fa-twitter"></i>
                              </a>
                  <a href="https://codepen.io/zephyo" target="_blank">
                                  <i class="fab fa-codepen"></i>
                              </a>
                  <a href="https://github.com/zephyo" target="_blank">
                                  <i class="fab fa-github"></i>
                              </a>
                  </a>
                  <a href="https://medium.com/@zephyo" target="_blank">
                                  <i class="fab fa-medium"></i>
                              </a-->
                </div>
              </div>
            </div>
            <div class="statistics">
              <!--button class="icon arrow left"></button>
              <button class="icon arrow right"></button-->
              <p><strong>1229</strong>
              ORDERS</p>
              <p><strong>684</strong> REVIEWS</p>
              <button class="profile__button"><a href="/order.html">Hire me</a></button>
              <!--p><strong>6</strong> Likes</p-->
            </div>
            <button class="icon close"></button>
          </div>
          
          <div class="profile">
            <div class="profile-bg"></div>
            <div class="profile__container">
              <div class="profile-image">
                <!--a class="camera" href="#">
                  <i class="fas fa-camera">hjdhd</i>
                </a-->
                <img srcset="/img/users/11.jpg" src="/img/users/11.jpg" alt="profile picture">
              </div>
              <div class="profile-info">
                <h3 class="first-name">Alex</h3>
                <h3 class="second-name"><span>Don</span></h3>
                <h4>ABOUT</h4>
                <p>
                  hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>
          
                <div class="social-media-icons">
                  
                </div>
              </div>
            </div>
            <div class="statistics">
              <!--button class="icon arrow left"></button>
              <button class="icon arrow right"></button-->
              <p><strong>924</strong> ORDERS</p>
              <p><strong>484</strong> REVIEWS</p>
              <button class="profile__button"><a href="/order.html">Hire me</a></button>
              <!--p><strong>6</strong> Likes</p-->
            </div>
            <button class="icon close"></button>
          </div>
          
          <div class="profile">
            <div class="profile-bg"></div>
            <div class="profile__container">
              <div class="profile-image">
                <!--a class="camera" href="#">
                  <i class="fas fa-camera"></i>
                </a-->
                <img srcset="/img/users/9.jpg" src="/img/users/9.jpg" alt="profile picture">
              </div>
              <div class="profile-info">
                <h3 class="first-name">Gabriel</h3>
                <h3 class="second-name"><span>Lewis</span></h3>
                <h4>ABOUT</h4>
                <p>
                  hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>
          
                <div class="social-media-icons">
                  
                </div>
              </div>
            </div>
            <div class="statistics">
              <!--button class="icon arrow left"></button>
              <button class="icon arrow right"></button-->
              <p><strong>708</strong> ORDERS</p>
              <p><strong>340</strong> REVIEWS</p>
              <button class="profile__button"><a href="/order.html">Hire me</a></button>
              <!--p><strong>6</strong> Likes</p-->
            </div>
            <button class="icon close"></button>
          </div>
          
          <div class="profile">
            <div class="profile-bg"></div>
            <div class="profile__container">
              <div class="profile-image">
                <!--a class="camera" href="#">
                  <i class="fas fa-camera"></i>
                </a-->
                <img srcset="/img/users/8.jpg" src="/img/users/8.jpg" alt="profile picture">
              </div>
              <div class="profile-info">
                <h3 class="first-name"><span>Lisa</span></h3>
                <h3 class="second-name">Kimberly</h3>
                <h4>ABOUT</h4>
                <p>
                  hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>
          
                <div class="social-media-icons">
                  
                </div>
              </div>
            </div>
            <div class="statistics">
              <!--button class="icon arrow left"></button>
              <button class="icon arrow right"></button-->
              <p><strong>629</strong> ORDERS</p>
              <p><strong>213</strong> REVIEWS</p>
              <button class="profile__button"><a href="/order.html">Hire me</a></button>
              <!--p><strong>6</strong> Likes</p-->
            </div>
            <button class="icon close"></button>
          </div>
          
          <div class="profile">
            <div class="profile-bg"></div>
            <div class="profile__container">
              <div class="profile-image">
                <!--a class="camera" href="#">
                  <i class="fas fa-camera"></i>
                </a-->
                <img srcset="/img/users/13.jpg" src="/img/users/13.jpg" alt="profile picture">
              </div>
              <div class="profile-info">
                <h3 class="first-name"><span>James</span></h3>
                <h3 class="second-name">Brown</h3>
                <h4>ABOUT</h4>
                <p>
                  hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>
          
                <div class="social-media-icons">
                  
                </div>
              </div>
            </div>
            <div class="statistics">
              <!--button class="icon arrow left"></button>
              <button class="icon arrow right"></button-->
              <p><strong>498</strong> ORDERS</p>
              <p><strong>164</strong> REVIEWS</p>
              <button class="profile__button"><a href="/order.html">Hire me</a></button>
              <!--p><strong>6</strong> Likes</p-->
            </div>
            <button class="icon close"></button>
          </div>
          
          <div class="profile">
            <div class="profile-bg"></div>
            <div class="profile__container">
              <div class="profile-image">
                <!--a class="camera" href="#">
                  <i class="fas fa-camera"></i>
                </a-->
                <img srcset="/img/users/16.jpg" src="/img/users/16.jpg" alt="profile picture">
              </div>
              <div class="profile-info">
                <h3 class="first-name"><span>Tamika</span></h3>
                <h3 class="second-name">Jones</h3>
                <h4>ABOUT</h4>
                <p>
                  hello hello, I'm angela, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>
          
                <div class="social-media-icons">
                  
                </div>
              </div>
            </div>
            <div class="statistics">
              <!--button class="icon arrow left"></button>
              <button class="icon arrow right"></button-->
              <p><strong>429</strong> ORDERS</p>
              <p><strong>184</strong> REVIEWS</p>
              <button class="profile__button"><a href="/order.html">Hire me</a></button>
              <!--p><strong>6</strong> Likes</p-->
            </div>
            <button class="icon close"></button>
          </div>
*/