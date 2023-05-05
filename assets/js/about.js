const windowHeight = document.documentElement.clientHeight;
const _1 = document.querySelector("._1");
const _2 = document.querySelector("._2");
const _3 = document.querySelector("._3");
let count = [90000, 10000, 0];
let sCount = [100000, 25000, 850];


function countFunc(count,sCount,elem) {
  window.addEventListener('scroll', e=>{
    if(window.scrollY > elem.offsetTop - windowHeight + 200) {
    setInterval(() => {
      if(count === sCount) {
        clearInterval(count);
      } else {
        count += 10;
        elem.textContent = count + '+';
        }
      }, 10);
    }
  })
    
}
  
countFunc(count[0], sCount[0], _1);
countFunc(count[1], sCount[1], _2);
countFunc(count[2], sCount[2], _3);
