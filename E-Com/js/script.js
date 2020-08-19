/* global cart */

function add_to_cart(pid,pname,price)
{
    
   let cart = localStorage.getItem("cart");
    if(cart===null)
    {
        //no cart yet
    let products=[];
    let product={ productId:pid, productName:pname, productQuantity:1, productPrice:price};
    products.push(product);
    localStorage.setItem("cart",JSON.stringify(products));
    console.log("Product is added for the first time");
    
    }else
    {
        //cart is already present
        let pcart=JSON.parse(cart);
        let oldProduct =pcart.find((item)=> item.productId ==pid);
        
        if(oldProduct)
        {
            //increase qty
            oldProduct.productQuantity=oldProduct.productQuantity +1;
            pcart.map((item)=>{
                
               if(item.productId===oldProduct.productId)
               {
                   item.productQuantity=oldProduct.productQuantity;
               }
                
            });
            
            localStorage.setItem("cart",JSON.stringify(pcart));
            console.log("product Qty increase");
            alert("product Qty increased");
            
        }else
        {
            //add product
            let product={ productId:pid ,productName:pname, productQuantity:1, productPrice:price};
            pcart.push(product);
            localStorage.setItem("cart",JSON.stringify(pcart));
            console.log("Product is added");
            alert("Product is added");
        }
    }
updateCart();

}



//update cart

function updateCart()
{
   let cartString = localStorage.getItem("cart");
   let cart=JSON.parse(cartString);
   if (cart==null || cart.length==0)
   {
       console.log("cart is empty !!");
       $(".cart-item").html("( 0 )");
       $(".cart-body").html("<h3>Cart does not have any items</h3>" );
       $(".checkout-btn").attr('disabled',true);
   }else{
       //cart not empty
       console.log("Product is added ha ");
       
       $(".cart-item").html(`( ${cart.length} )`);
       
       let table=`
         <table class='table'>
        <thead class='thead-light'>
        <tr>
         <th>item Name </th>
         <th>Price</th>
         <th>Quantity</th>
         <th> Total Price</th>
         <th> Action</th>
         

         </tr>  
</thead>
        
        
        
`;
        let totalPrice = 0;
      cart.map((item) => {
          
          table +=`
              <tr>
            <td> ${item.productName}</td>
            <td>&#8377; ${item.productPrice}</td>
            <td>  ${item.productQuantity} </td>
            <td> &#8377; ${item.productQuantity*item.productPrice}</td>
            <td><button onclick='deleteItemCart(${item.productId})' class="btn btn-danger btn-sm" >Remove</button></td>
            </tr>
`;
          totalPrice+= item.productPrice*item.productQuantity;
      });
        
   
   
   
  table=table+`
<tr><td colspan='5' class="text-right font-weight-bold m-5" style="font-size:25px;"> Total Price :- &#8377; ${totalPrice} </td></tr>
</table>`;
   $(".cart-body").html(table);
   $(".checkout-btn").attr('disabled',false);
    }
   
   
}


//delete Item
function deleteItemCart(pid)
{
   let cart = JSON.parse(localStorage.getItem('cart'));
    
    let newcart = cart.filter((item) => item.productId != pid);
localStorage.setItem('cart',JSON.stringify(newcart));
alert("Product is Removed");
 updateCart();
}




$(document).ready(function (){
    updateCart();
});


function goTocheckout(){
    window.location="checkout.jsp"
}