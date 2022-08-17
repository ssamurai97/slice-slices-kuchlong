 const nodemailer = require('nodemailer')


 function generateOrderEmail({order, total}){
  return `<div>
             <h2>your Recent Order for ${total}</h2>
             <p> please start walking over, we will have your order ready in 
             next 15 minuntes.</p>
             <ul>
                ${order.map((item) =>
                     `<li>
                          <img src="${item.thumbnail}" alt="${item.name}">
                           ${item.size} ${item.name} - ${item.price}
                       </li>
                       `
                   ).join('')}
              </ul>
              <p>Your total is <strong>$${total}</strong> due at pickup</p>
               <style>
                 ul {
                   list-style: none;
                 }
                 </style>
            </div>
      `;
 }


const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }

})


 async function wait(ms = 0){
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
 }

exports.handler = async (event, context) => {

    await wait();

  const body = JSON.parse(event.body)
    console.log(body)

    // check if the have filled out honeypot
    if(body.tallSmile){
        return {
            statusCode: 400,
            body: JSON.stringify({message: "Boop beep bop zzz good bye"}),
        }
    }
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  // send the success on error message
  for( const field of requiredFields){
    // console.log(`checking the field works ${field} good`)
    if(!body[field]){
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Opps! you are missing the ${field} field`,
        })
      };
    }
  }

  // make sure they actually have items in that order
    if(!body.order.length){
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `You did  not order anything`
            })
        }
    }

 // send the mail
  const info = await transport.sendMail({
    from: "slices's slices <kuchlong@kuchlong.sudanesesamurai.com>",
    to: `${body.name} <${body.email}>`,
    subject: " New order",
    html: generateOrderEmail({order: body.order, total: body.total})
  })

  // console.log(info)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Success"})
  }
}
