export function paintErrorMessage(node, message) {
  if (node.nextSibling.dataset.message) {
    node.nextSibling.remove();
  }
  const p = document.createElement("p");
  node.dataset.isError = "true";
  p.className = "errorMessage";
  p.innerText = message;
  p.dataset.message = "errormessage";
  node.parentNode.insertBefore(p, node.nextSibling);
}

export function paintSuccessMessage(node, message) {
  if (node.nextSibling.dataset.message) {
    node.nextSibling.remove();
  }
  node.dataset.isError = "false";
  const p = document.createElement("p");
  p.className = "successMessage";
  p.innerText = message;
  p.dataset.message = "successMessage";
  node.parentNode.insertBefore(p, node.nextSibling);
}
