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
    console.log(draw(n, data.name));
    if(data.items) {
        n++;
        for(const key in data.items) {
            tree(data.items[key], n);
        }
    }
}

function draw(n, name) {
    let tab = '';
    let sp = '└— ';
    let i = 0;
    while (i !== n) {
        tab = tab + '..';
        i++
    }

   return `${n - 1 <= 0 ? '': tab}${tab ? sp : ''}${name}`
}

tree(json);

module.exports = {
    draw,
    tree
}