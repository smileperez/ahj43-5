import Popup from './popup';

const popup = new Popup();
const button = document.querySelector('.button');
popup.action(button, 'Тема', 'Сообщение');
