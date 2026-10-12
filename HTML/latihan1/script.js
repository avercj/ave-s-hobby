// DOM Selection
// document.getElementById() >> mengembalikan element
const judul = document.getElementById('judul');  
judul.style.color = 'lightpink';
judul.style.backgroundColor = 'grey';  
judul.innerHTML = 'Melisa Ave';  

//document.getElementsByTagName() >> mengembalikan HTML collections
const p = document.getElementsByTagName('p');
p[0].style.backgroundColor = 'grey';
p[1].style.backgroundColor = 'grey';
p[2].style.backgroundColor = 'grey';
p[3].style.backgroundColor = 'grey';

const h1 = document.getElementsByTagName('h1');
h1.stle.fontSize = '35px';

//document.getElementsByClassName()
const p1 = document.getElementsByClassName('p1')[0];
p1.innerHTML = 'ini diubah dari javascript';