let socket = new WebSocket("ws://localhost:5500");
socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
    socket.send('OPEN!') // работает отправка на бек

    socket.onmessage = function (message) {
        console.log(message.data) // работает получение с бека

        //НЕ РАБОТАЕТ ОТПРАВКА В ОСНОВНОЙ СКРИПТ
        self.addEventListener("message", function (event) {
            event.source.postMessage(message.data);
        });
    };
};






