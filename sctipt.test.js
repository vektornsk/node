const m = require('./script');

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


it('test draw', () => {
    let result = m.draw(0, 1);
    expect(result).toBe("1");

    result = m.draw(1, 2);
    expect(result).toBe("└— 2");

    result = m.draw(2, 3);
    expect(result).toBe("....└— 3");
});

it('test', () => {
    const draw = jest.fn();
    m.tree(json, 0, draw);
    expect(draw).toHaveBeenCalledTimes(6);
});