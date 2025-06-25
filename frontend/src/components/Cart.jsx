import "./Cart.css";

function Cart({ cart, setCart }) {
  const total = cart
    .reduce((sum, item) => sum + parseFloat(item.price), 0)
    .toFixed(2);

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <section className="Cart">
      <h2 className="CartTitle">YOUR CART</h2>

      {cart.length === 0 ? (
        <p className="CartEmpty">Your cart is empty.</p>
      ) : (
        <>
          <div className="CartItems">
            {cart.map((item, index) => (
              <div className="CartItem" key={index}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="CartItemImg"
                />
                <div className="CartItemInfo">
                  <h3 className="CartItemName">{item.name}</h3>
                  <p className="CartItemQty">Qty: 1</p>
                  <p className="CartItemPrice">${item.price}</p>
                  <button
                    className="RemoveFromCartBtn"
                    onClick={() => handleRemove(index)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL GOES HERE */}
          <div className="CartTotal">
            <p>Total: ${total}</p>
          </div>

          {/* CHECKOUT BUTTON */}
          <button
            className="CheckoutBtn"
            onClick={() => {
              cart.forEach((item) => {
                if (item.purchase_url) {
                  window.open(item.purchase_url, "_blank");
                }
              });
              setCart([]);
            }}
          >
            CHECKOUT ({cart.length} items)
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;
