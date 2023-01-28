export default class Popup {
  constructor() {
    this.popups = [];
  }

  showPopup(element, title, message) {
    const popupElement = document.createElement('div');
    const popupTitle = document.createElement('div');
    const popupText = document.createElement('div');
    popupElement.classList.add('popup');
    popupTitle.classList.add('title');
    popupText.classList.add('text');
    popupElement.appendChild(popupTitle);
    popupElement.appendChild(popupText);

    popupTitle.textContent = title;
    popupText.textContent = message;

    const id = performance.now();

    this.popups.push({
      id,
      element: popupElement,
    });

    document.body.appendChild(popupElement);
    const { left, bottom } = element.getBoundingClientRect();
    popupElement.style.left = `${left}px`;
    popupElement.style.bottom = `${bottom + 15}px`;

    return id;
  }

  removePopup(id) {
    const popupElement = this.popups.find((p) => p.id === id);

    popupElement.element.remove();
    this.popups = this.popups.filter((p) => p.id !== id);
  }

  action(element, title, text) {
    let activePopups = [];

    element.addEventListener('focus', ((e) => {
      e.preventDefault();
      // console.log('Клик, добавляем попап');

      activePopups.push(this.showPopup(element, title, text));
    }));

    element.addEventListener('blur', ((e) => {
      e.preventDefault();
      // console.log('Фокус пропал, удаляем попап');

      activePopups.forEach((id) => {
        this.removePopup(id);
      });
      activePopups = [];
    }));
  }
}