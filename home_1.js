const json = {
    "name": 1,
    "items": [
        {
            "name": 2,
            "items": [{"name": 3}, {"name": 4}]
        },
        {
            "name": 5,
            "items": [{"name": 6}]
        }
    ]
};

function tree(data, n = 0) {
    draw(n, data);
    if(data.items) {
        n++;
        for(const key in data.items) {
            tree(data.items[key], n);
        }
    }
}

function draw(n, data) {
    let tab = '';
    let sp = '└— ';
    let i = 0;
    while (i !== n) {
        tab = tab + '..';
        i++
    }
    console.log(`${n - 1 <= 0 ? '': tab}${tab ? sp : ''}${data.name}`)
}

tree(json);