/** 
 * 1init stripe and react stripe js
 * 2create a checkOut form  with card element (card element contains : card number expiration data,cvs,zip cord)
 * 3crate account on strip and get the publishable key
 * 4get card information 
 * 5create a payment method 
 * 6use test card to test payment 
 * 7on the server side : init strip   
 *     npm install --save stripe 
 * 8 create a payment intent API with payment method type :['card'] make sure u provide amount in cents (multi price with 100)
 * 9 call payment intent api to get client secrete and store it in state 
 * 10 use confirmCardPayment api with client secrete card info 
 * 11 display confirm card error 
 * 12 display confirm card success  
 * 13 do things after payment -->
* */ 