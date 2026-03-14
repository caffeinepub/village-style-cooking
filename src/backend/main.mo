import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";

actor {
  type MenuItem = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
  };

  module MenuItem {
    public func compare(menuItem1 : MenuItem, menuItem2 : MenuItem) : Order.Order {
      Text.compare(menuItem1.name, menuItem2.name);
    };
  };

  var menuItemArray = [
    {
      id = 1;
      name = "Bamboo Chicken";
      description = "Chicken cooked in bamboo in traditional village style.";
      price = 350.0;
      category = "Non-Veg";
    },
    {
      id = 2;
      name = "Bamboo Prawns";
      description = "Prawns cooked in bamboo with authentic spices.";
      price = 450.0;
      category = "Seafood";
    },
    {
      id = 3;
      name = "Pot Chicken";
      description = "Tender chicken cooked in clay pots.";
      price = 400.0;
      category = "Non-Veg";
    },
    {
      id = 4;
      name = "Pot Thiryani";
      description = "Traditional biryani cooked in clay pots.";
      price = 300.0;
      category = "Veg";
    },
    {
      id = 5;
      name = "Bamboo Biryani";
      description = "Unique biryani cooked in bamboo for extra aroma.";
      price = 370.0;
      category = "Veg";
    },
  ];

  public query ({ caller }) func getMenuItems() : async [MenuItem] {
    menuItemArray.sort();
  };
};
