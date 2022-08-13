import calculatePizzaPrices from "./calculatePizzaPrice";


export default function calculateOrderTotal(order, pizzas){

    //  looop over each item in the order
    return order.reduce((runningTotal, singleOrder) => {
        const pizza = pizzas.find(singlePizza => singlePizza.id === singleOrder.id);
        return runningTotal  + calculatePizzaPrices(pizza.price, singleOrder.size)
    },0)
}
