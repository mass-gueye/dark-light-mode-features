// slidin effect
let TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    let elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
// slidin effect end

// official project js for
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon')

const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

const textBox = document.getElementById('text-box')

// switch theme dynamically
let checked = false;

// dark or light images
const imageMode = (color = 'light') => {
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

const darkLightMode = () => {
    checked ?  nav.style.background = 'rgb(0 0 0 /50%)' : nav.style.background = 'rgb(255 455 255 /50%)';
    checked ? textBox.style.background = 'rgb(255 455 255 /50%)' : textBox.style.background = 'rgb(0 0 0 /50%)';
    checked ? toggleIcon.children[0].textContent = 'Dark Mode' : toggleIcon.children[0].textContent = 'Light  Mode';
    checked ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon') : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    checked ? imageMode('dark') : imageMode('light');
   
}

// dark mode styles
// const darkMode = () => {
//     // nav.style.background = 'rgb(0 0 0 /50%)';
//     // textBox.style.background = 'rgb(255 455 255 /50%)';
//     // toggleIcon.children[0].textContent = 'Dark Mode';
//     // toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//     // imageMode('dark')
// }

// const lightMode = () => {
//     // nav.style.background = 'rgb(255 455 255 /50%)';
//     // textBox.style.background = 'rgb(0 0 0 /50%)';
//     // toggleIcon.children[0].textContent = 'Light  Mode';
//     // toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//     imageMode('light')
// }


const switchTheme = (event) => {
    checked = event.target.checked;
    if (checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme','dark')
        darkLightMode()
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme','light')
        darkLightMode()
    }

}

// event listener
toggleSwitch.addEventListener('change', switchTheme);

// Check Local Storage for theme

const currentTheme = localStorage.getItem('theme');

if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark') {
        checked = true;
        toggleSwitch.checked = true;
        darkLightMode()
    }
    
}else {
    checked = false;
    toggleSwitch.checked = false;
    darkLightMode()
}

