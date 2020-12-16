function Pop_up(texte) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:fixed;top:80%;left:10%;background-color:black;color:white;width:fit-Content;height:auto;padding:10px 30px;font-size:20px;border-radius:8px;z-index:999"
  );
  document.body.appendChild(el);
  el.innerHTML = texte;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, 3000);
}

export default Pop_up;
