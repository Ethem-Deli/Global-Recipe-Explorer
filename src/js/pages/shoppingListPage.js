import { requireAuth } from '../auth/protect.js';

requireAuth();

const listEl = document.getElementById('shoppingList');
const addItemBtn = document.getElementById('addItemBtn');
const clearListBtn = document.getElementById('clearListBtn');
const newItemInput = document.getElementById('newItem');

function getList() {
  return JSON.parse(localStorage.getItem('shoppingList')) || [];
}

function saveList(list) {
  localStorage.setItem('shoppingList', JSON.stringify(list));
}

function renderList() {
  const list = getList();
  listEl.innerHTML = '';
  list.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.onclick = () => {
      list.splice(index, 1);
      saveList(list);
      renderList();
    };
    listEl.appendChild(li);
  });
}

addItemBtn.onclick = () => {
  const item = newItemInput.value.trim();
  if (item) {
    const list = getList();
    list.push(item);
    saveList(list);
    newItemInput.value = '';
    renderList();
  }
};

clearListBtn.onclick = () => {
  localStorage.removeItem('shoppingList');
  renderList();
};

renderList();
