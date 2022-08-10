Создать небольшой WebSocket Server на Node.js (Либо на https://www.npmjs.com/package/ws либо с использованием https://www.npmjs.com/package/socket.io). 
Примечание: Socket.io отличается наличием fallbacks на случай если Web Sockets не работают на данном устройстве
На FE создать index.html c основным скриптом, подключить к нему Service Worker (создать его отдельным файлом), подключить Service Worker к Web Socket Server.
Примечание: смотрите практическую часть урока, последний час записи для подробностей;
Отправлять нотификации через WS Server через разумный интервал, проверить, что Service Worker получает сообщения от Web Socket Server.
Из Service Worker отправить сообщения на основной скрипт и отображать в виде Web Notifications.