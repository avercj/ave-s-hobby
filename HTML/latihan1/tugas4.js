"use strict";


var nama = "";
var jumlah = 0;
var pilihan = [];      
var terpilih = "";     
var email = "";

var app = document.getElementById("app");



function el(tag, props, children) {
  var e = document.createElement(tag);
  for (var k in (props || {})) {
    if (k === "text") e.textContent = props[k];
    else e[k] = props[k];
  }
  (children || []).forEach(function (c) { e.appendChild(c); });
  return e;
}

function baris(labelText, input) {
  return el("div", { className: "row" }, [
    el("label", { text: labelText, htmlFor: input.id }),
    input
  ]);
}

function langkah(id) {
  var s = el("section", { className: "step", id: id });
  app.appendChild(s);
  return s;
}

function hapusSetelah(id) {           
  var s = document.getElementById(id);
  while (s && s.nextElementSibling) app.removeChild(s.nextElementSibling);
}

function kunci(section, terkunci) {   
  section.querySelectorAll("input, select, button").forEach(function (c) {
    c.disabled = terkunci;
  });
}

function tampilError(id, pesan) {
  document.getElementById(id).textContent = pesan;
}


function buatLangkah1() {
  var s = langkah("l1");
  var inNama = el("input", { type: "text", id: "nama", placeholder: "Teks Nama", maxLength: 50 });
  var inJml  = el("input", { type: "number", id: "jml", min: 1, max: 10, step: 1, value: 2 });
  var btn    = el("button", { text: "OK", type: "button" });

  s.appendChild(baris("Nama :", inNama));
  s.appendChild(baris("Jumlah Pilihan :", inJml));
  s.appendChild(btn);
  s.appendChild(el("p", { className: "error", id: "err1" }));

  btn.onclick = function () {
    var n = inNama.value.trim();
    var j = inJml.value.trim();

    if (n === "") {
      tampilError("err1", "Nama wajib diisi.");
      inNama.focus(); return;
    }
    if (n.length < 2) {
      tampilError("err1", "Nama minimal 2 huruf.");
      inNama.focus(); return;
    }
    if (!/^[A-Za-z\u00C0-\u024F.' -]+$/.test(n)) {
      tampilError("err1", "Nama hanya boleh berisi huruf, spasi, titik, atau apostrof.");
      inNama.focus(); return;
    }
    if (j === "" || !/^\d+$/.test(j)) {
      tampilError("err1", "Jumlah pilihan harus berupa bilangan bulat positif.");
      inJml.focus(); return;
    }
    var angka = parseInt(j, 10);
    if (angka < 1 || angka > 10) {
      tampilError("err1", "Jumlah pilihan harus antara 1 sampai 10.");
      inJml.focus(); return;
    }

    tampilError("err1", "");
    nama = n;
    jumlah = angka;
    hapusSetelah("l1");
    kunci(s, true);
    buatLangkah2();
  };
  inNama.focus();
}


function buatLangkah2() {
  var s = langkah("l2");

  for (var i = 1; i <= jumlah; i++) {
    s.appendChild(baris("Pilihan " + i + " :", el("input", {
      type: "text", id: "p" + i, placeholder: "Teks Pilihan " + i, maxLength: 40
    })));
  }

  var btn = el("button", { text: "OK", type: "button" });
  s.appendChild(btn);
  s.appendChild(el("p", { className: "error", id: "err2" }));
  document.getElementById("p1").focus();

  btn.onclick = function () {
    var cek = [];                                   
    for (var i = 1; i <= jumlah; i++) {
      var inp = document.getElementById("p" + i);
      var t = inp.value.trim();
      if (t === "") {
        tampilError("err2", "Teks Pilihan " + i + " belum diisi.");
        inp.focus(); return;
      }
      if (cek.indexOf(t.toLowerCase()) !== -1) {
        tampilError("err2", "Teks Pilihan " + i + " sama dengan pilihan sebelumnya. Gunakan teks yang berbeda.");
        inp.focus(); return;
      }
      cek.push(t.toLowerCase());
    }

    pilihan = [];                                   
    for (var k = 1; k <= jumlah; k++) {
      pilihan.push(document.getElementById("p" + k).value.trim());
    }

    tampilError("err2", "");
    hapusSetelah("l2");
    kunci(s, true);
    buatLangkah3();
  };
}


function buatLangkah3() {
  var s = langkah("l3");
  var dd = el("select", { id: "dd" });

  for (var i = 0; i < pilihan.length; i++) {        
    dd.appendChild(el("option", { value: pilihan[i], text: pilihan[i] }));
  }

  var btn = el("button", { text: "OK", type: "button" });
  s.appendChild(baris("Pilihan :", dd));
  s.appendChild(btn);
  s.appendChild(el("p", { className: "error", id: "err3" }));

  btn.onclick = function () {
    if (dd.value === "") {
      tampilError("err3", "Pilih salah satu opsi.");
      dd.focus(); return;
    }
    terpilih = dd.value;
    tampilError("err3", "");
    hapusSetelah("l3");
    kunci(s, true);
    buatLangkah4();
  };
}


function buatLangkah4() {
  var s = langkah("l4");
  var inMail = el("input", { type: "text", id: "email", placeholder: "email@domain.com", maxLength: 80 });
  var btn = el("button", { text: "OK", type: "button" });

  s.appendChild(baris("Email :", inMail));
  s.appendChild(btn);
  inMail.focus();

 
var pola = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;


  btn.onclick = function () {
    var v = inMail.value.trim();
    if (!pola.test(v)) {
      alert("Format email tidak valid!\nContoh yang benar: nama@domain.com\nSilakan masukkan ulang.");
      inMail.value = "";
      inMail.focus();
      return;
    }
    email = v;
    hapusSetelah("l4");
    kunci(s, true);
    buatHasil();
  };
}


function buatHasil() {
  var s = langkah("hasil");

  s.appendChild(el("p", {
    text: "Hallo, nama saya " + nama + ", email saya " + email +
          " , saya mempunyai sejumlah " + jumlah + " pilihan yaitu " + pilihan.join(", ") +
          ", dan saya memilih " + terpilih
  }));

  var ulang = el("button", { text: "Ulangi", type: "button", className: "ghost" });
  ulang.onclick = function () {
    app.textContent = "";
    buatLangkah1();
  };
  s.appendChild(ulang);
}


buatLangkah1();