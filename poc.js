const log = s => {
  const p = document.createElement("p");
  p.innerText = s;
  document.body.appendChild(p);
};

module.exports = { log };