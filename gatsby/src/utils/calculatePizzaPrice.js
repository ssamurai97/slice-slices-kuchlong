

const sizes = {
    S : .75,
    M: 1,
    L: 1.25
};


export default function calculatePizzaPrices(cents, size){
    return cents * sizes[size];
}

