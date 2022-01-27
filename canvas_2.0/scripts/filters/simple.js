function add(pix, val)
{
    return Math.max(Math.min(pix+val, 255), 0);
}

function subtract(pix, val)
{
    return Math.max(Math.min(pix-val, 255), 0);
}

function multiply(pix, val)
{
    return Math.max(Math.min(pix*val, 255), 0);
}

function divide(pix, val)
{
    return Math.max(Math.min(pix/val, 255), 0);
}

export {add, subtract, multiply, divide}