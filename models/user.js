const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
const ObjectId = mongodb.ObjectId;

class User {
  //here we make 1 cart for every user
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    // const cartProductIndex = this.cart.items.findIndex((cp) => {
    //   return cp.productId.toString() === product._id.toString();
    // });
    // let newQuantity = 1; //default 1
    // const updatedCartItems = [...this.cart.items]; //store the existing cart items

    // //product is already present
    // if (cartProductIndex >= 0) {
    //   newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //   updatedCartItems[cartProductIndex].quantity = newQuantity;
    // } else {
    //   //for new product
    //   updatedCartItems.push({
    //     productId: new ObjectId(product._id),
    //     quantity: newQuantity,
    //   });
    // }

    // const updatedCart = {
    //   items: updatedCartItems,
    // };
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
