var stadiums;
document.addEventListener("DOMContentLoaded", function() {
  var stadiumSelector = document.getElementById("stadium");
  var vendorSelector = document.getElementById("vendor");
  var carousel = document.querySelector(".carousel");
  
  for (var i = 0; i < stadiums.length; i++) {
    var newElement = document.createElement("option");
    newElement.innerHTML = stadiums[i].name;
    newElement.setAttribute("value", i);
    stadiumSelector.appendChild(newElement);
  }
  var stadiumSelect = M.FormSelect.init(stadiumSelector, {});
  console.log(stadiumSelect);
  stadiumSelect.$el[0].onchange = function(e) {
    var stadiumIndex = e.target.value;
    if (e.target.id == "stadium") {
      // get rid of old vendors!
      while (vendorSelector.firstElementChild) {
        vendorSelector.removeChild(vendorSelector.firstChild);
      }
      // get rid of old food objects!
      while (carousel.firstElementChild) {
        carousel.removeChild(carousel.firstChild);
      }
      //load in the new vendors! (with event handlers)
      for (var j = 0; j < stadiums[stadiumIndex].vendors.length; j++) {
        var newElement = document.createElement("option");
        newElement.innerHTML = stadiums[stadiumIndex].vendors[j].name;
        newElement.setAttribute("value", j);
        vendorSelector.appendChild(newElement);
        
        var vendorSelect = M.FormSelect.init(vendorSelector, {});
        // Init for when a stadium is selected!
          initFoodItems(carousel, stadiumIndex);
        vendorSelect.$el[0].onchange = function(e) {
          var vendorIndex = e.target.value;
          // console.log(e.target.id);
          // get rid of old food objects!
          
          while (carousel.firstElementChild) {
            carousel.removeChild(carousel.firstChild);
          }
          
          
          
          // load in new food objects!
          for (
            var k = 0;
            k < stadiums[stadiumIndex].vendors[vendorIndex].foodItems.length;
            k++
          ) {
            var carouselItem = document.createElement("a");
            // newElement.innerHTML = stadiums[stadiumIndex].vendors[vendorIndex].name;
            carouselItem.setAttribute("value", k);
            carouselItem.setAttribute("class", "carousel-item");
            carouselItem.setAttribute("href", "#" + k + "!");

            var row = document.createElement("div");
            row.setAttribute("class", "row");
            var p1 = document.createElement("p");
            p1.setAttribute("class", "col s10 red-text text-darken-3");
            p1.innerHTML =
              stadiums[stadiumIndex].vendors[vendorIndex].foodItems[k].name;
            var p2 = document.createElement("p");
            p2.setAttribute("class", "col s2 red-text text-darken-3");
            p2.innerHTML =
              "$" +
              stadiums[stadiumIndex].vendors[vendorIndex].foodItems[k].price;
            row.appendChild(p1);
            row.appendChild(p2);

            var row2 = document.createElement("div");
            row2.setAttribute("class", "input-field row");
            var input = document.createElement("input");
            input.setAttribute("value", 0);
            // input.setAttribute('id', 'first_name2');
            input.setAttribute("type", "text");
            input.setAttribute("class", "validate col s8");
            var label = document.createElement("label");
            label.setAttribute("class", "active");
            label.setAttribute("for", "first_name2");
            label.innerHTML = "Number of items";
            var subB = document.createElement("div");
            subB.setAttribute(
              "class",
              "waves-effect waves-red btn-flat col s2 subButton"
            );
            subB.innerHTML = "-";
            subB.addEventListener("click", function(e) {
              var currentValue = parseInt(
                e.target.parentElement.children[0].value
              );
              if (currentValue > 0) {
                e.target.parentElement.children[0].value = currentValue - 1;
              }
            });
            var plusB = document.createElement("div");
            plusB.setAttribute(
              "class",
              "waves-effect waves-red btn-flat col s2 addButton"
            );
            plusB.innerHTML = "+";
            plusB.addEventListener("click", function(e) {
              var currentValue = parseInt(
                e.target.parentElement.children[0].value
              );
              e.target.parentElement.children[0].value = currentValue + 1;
            });

            row2.appendChild(input);
            row2.appendChild(label);
            row2.appendChild(subB);
            row2.appendChild(plusB);

            var img = document.createElement("img");
            img.setAttribute(
              "src",
              stadiums[stadiumIndex].vendors[vendorIndex].foodItems[k].imageFile
            );

            carouselItem.appendChild(row);
            carouselItem.appendChild(row2);
            carouselItem.appendChild(img);

            carousel.appendChild(carouselItem);
          }
          initCarousel(carousel);
        };
        // var para = document.createElement("P");
        // instances[i].$selectOptions.appendChild(newElement);
      }
    }
  };

  
  if (carousel.children.length > 0) {
    initCarousel(carousel);
  }

  var collapsible = document.querySelector(".collapsible");
  var collapsibleInstace = M.Collapsible.init(collapsible, {});

  // for(var i=0; i<)
  // var elems = document.querySelectorAll("select");
  // var instances = M.FormSelect.init(elems, {});
  //   for (var i = 0; i < instances.length; i++) {
  //     instances[i].$el[0].onchange = function(e) {
  //       console.log(e.target.value);
  //       console.log(e.target.id);
  //       if(e.target.id=="stadium") {
  //         // get rid of old vendors!
  //         while (vendorSelector.firstElementChild) {
  //             vendorSelector.removeChild(vendorSelector.firstChild);
  //         }
  //         // get rid of old food objects!
  //         while (carousel.firstElementChild) {
  //             carousel.removeChild(carousel.firstChild);
  //         }
  //         //load in the new vendors!
  //         for(var j=0; j<stadiums[e.target.value].vendors.length; j++){
  //           // console.log(stadiums[e.target.value].vendors[j]);
  //           var newElement = document.createElement("option");
  //           newElement.innerHTML = stadiums[e.target.value].vendors[j].name;
  //           newElement.setAttribute("value", j);
  //           // var para = document.createElement("P");
  //           instances[i].$selectOptions.appendChild(newElement);
  //         }
  //       } else if(e.target.id=="vendor") {
  //         // get rid of old food objects!
  //         while (carousel.firstElementChild) {
  //             carousel.removeChild(carousel.firstChild);
  //         }
  //         //load in new food objects!

  //       }
  //     };
  //   }
  var subButtons = document.getElementsByClassName("subButton");
  for (var i = 0; i < subButtons.length; i++) {
    subButtons[i].addEventListener("click", function(e) {
      var currentValue = parseInt(e.target.parentElement.children[0].value);
      if (currentValue > 0) {
        e.target.parentElement.children[0].value = currentValue - 1;
      }
    });
  }
  var addButtons = document.getElementsByClassName("addButton");
  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function(e) {
      var currentValue = parseInt(e.target.parentElement.children[0].value);
      e.target.parentElement.children[0].value = currentValue + 1;
    });
  }
});

stadiums = {
  stadiums: [
    {
      name: "Amalie Arena",
      imageFile: "https://i.ibb.co/KWZVLGS/Amalie-Arena.jpg",
      vendors: [
        {
          name: "Firestick Grill",
          foodItems: [
            {
              name: "Mini Tacos",
              imageFile: "https://i.ibb.co/6wPgyNG/Mini-Tacos.jpg",
              price: 7.5,
              amount: 0
            },
            {
              name: "Roasted Turkey",
              imageFile: "https://i.ibb.co/PmRhkBL/Roasted-Turkey.jpg",
              price: 8.5,
              amount: 0
            },
            {
              name: "Sushi Display",
              imageFile: "https://i.ibb.co/p4G3JGS/Sushi-Display.jpg",
              price: 8.0,
              amount: 0
            }
          ],
          orders: [{}]
        },
        {
          name: "Ford's Garage",
          foodItems: [
            {
              name: "Edsel's Hot Pretzel Sticks",
              imageFile:
                "https://i.ibb.co/cTzKVBg/Edsel-s-Hot-Pretzel-Sticks.jpg",
              price: 6.0,
              amount: 0
            },
            {
              name: "Funnel Cake Fries",
              imageFile: "https://i.ibb.co/2gXqt3f/Funnel-Cake-Fries.jpg",
              price: 6.5,
              amount: 0
            },
            {
              name: "Vegetarian Impossiburger",
              imageFile:
                "https://i.ibb.co/Cs1K4Hq/Vegetarian-Impossiburger.jpg",
              price: 15.0,
              amount: 0
            }
          ],
          orders: [{}]
        },
        {
          name: "Four Green Fields",
          foodItems: [
            {
              name: "Chicken Tenders",
              imageFile: "https://i.ibb.co/5GrRkz6/Chicken-Tenders.jpg",
              price: 17.5,
              amount: 0
            },
            {
              name: "Fish and Chips",
              imageFile: "https://i.ibb.co/G2RHGvp/Fish-and-Chips.jpg",
              price: 17.0,
              amount: 0
            },
            {
              name: "French Fries",
              imageFile: "https://i.ibb.co/LQXLNMY/French-Fries.jpg",
              price: 8.0,
              amount: 0
            }
          ],
          orders: [{}]
        }
      ]
    },
    {
      name: "STAPLES Center",
      imageFile: "https://i.ibb.co/XLg2x4k/STAPLES-Center.jpg",
      vendors: [
        {
          name: "Blaze Pizza",
          foodItems: [
            {
              name: "Chicken Caesar Salad",
              imageFile: "https://i.ibb.co/C5tcT8C/Chicken-Ceasar-Salas.jpg",
              price: 12.5,
              amount: 0
            },
            {
              name: "Meat Lovers Pizza",
              imageFile: "https://i.ibb.co/gvGytbB/Meat-Lovers-Pizza.jpg",
              price: 16.0,
              amount: 0
            },
            {
              name: "White Top Pizza",
              imageFile: "https://i.ibb.co/vd8dxkj/White-Top-Pizza.jpg",
              price: 17.5,
              amount: 0
            }
          ],
          orders: [{}]
        },
        {
          name: "BS Tacquiera",
          foodItems: [
            {
              name: "Carne Asada Nachos",
              imageFile: "https://i.ibb.co/yY9zXbD/Carne-Asada-Nachos.jpg",
              price: 14.5,
              amount: 0
            },
            {
              name: "Loaded Nachos",
              imageFile: "https://i.ibb.co/JKnk14v/Loaded-Nachos.jpg",
              price: 17.0,
              amount: 0
            },
            {
              name: "Street Tacos",
              imageFile: "https://i.ibb.co/tzVMYcf/Street-Tacos.jpg",
              price: 15.0,
              amount: 0
            }
          ],
          orders: [{}]
        },
        {
          name: "Dave's Doghouse",
          foodItems: [
            {
              name: "Hot Chocolate",
              imageFile: "https://i.ibb.co/tqqT5d3/Hot-Chocolate.jpg",
              price: 4.5,
              amount: 0
            },
            {
              name: "Mac 'n Cheese Dog",
              imageFile: "https://i.ibb.co/dr9YMB7/Mac-N-Cheese-Dog.jpg",
              price: 9.5,
              amount: 0
            },
            {
              name: "Popcorn",
              imageFile: "https://i.ibb.co/4ZW0WdQ/Popcorn.jpg",
              price: 6.0,
              amount: 0
            }
          ],
          orders: [{}]
        }
      ]
    },
    {
      name: "TD Garden",
      imageFile: "https://i.ibb.co/khVvWL0/TD-Garden.jpg",
      vendors: [
        {
          name: "Boston Common",
          foodItems: [
            {
              name: "Grilled Cheese",
              imageFile: "https://i.ibb.co/3stXk6Y/Grilled-Cheese.jpg",
              price: 8.5,
              amount: 0
            },
            {
              name: "New England Clam Chowder",
              imageFile:
                "https://i.ibb.co/pz4BQ8n/New-England-Clam-Chowder.jpg",
              price: 6.0,
              amount: 0
            },
            {
              name: "Topped Fries",
              imageFile: "https://i.ibb.co/WcqdZnd/Topped-Fries.jpg",
              price: 5.0,
              amount: 0
            }
          ],
          orders: [{}]
        },
        {
          name: "Garden Grill",
          foodItems: [
            {
              name: "Chicken Cheesesteak",
              imageFile: "https://i.ibb.co/4SPcTB9/Chicken-Cheesesteak.jpg",
              price: 12.5,
              amount: 0
            },
            {
              name: "Inferno Fries",
              imageFile: "https://i.ibb.co/PxBF249/Inferno-Fries.jpg",
              price: 4.5,
              amount: 0
            },
            {
              name: "Steak and Cheese Hot Dog",
              imageFile: "https://i.ibb.co/M1Y7n1Z/Steak-and-Cheese-Hotdog.jpg",
              price: 9.0,
              amount: 0
            }
          ],
          orders: [{}]
        },
        {
          name: "The North End Butcher",
          foodItems: [
            {
              name: "Beef Hot Dog",
              imageFile: "https://i.ibb.co/YL2Nkqt/Beef-Hot-Dog.jpg",
              price: 8.0,
              amount: 0
            },
            {
              name: "Pork Hot Dog",
              imageFile: "https://i.ibb.co/GJdSzgD/Pork-Hot-Dog.jpg",
              price: 6.5,
              amount: 0
            },
            {
              name: "Sausage, Peppers, and Onions",
              imageFile:
                "https://i.ibb.co/XC0gXkx/Sausage-Peppers-and-Onions.jpg",
              price: 9.0,
              amount: 0
            }
          ],
          orders: [{}]
        }
      ]
    }
  ]
};

stadiums = stadiums.stadiums;
function initCarousel(carousel) {
  var carouselInstance = M.Carousel.init(carousel, {});
  window.setInterval(function() {
    carouselInstance.next();
  }, 1000000);
  document.querySelector(".leftButton").addEventListener("click", function() {
    carouselInstance.prev();
  });
  document.querySelector(".rightButton").addEventListener("click", function() {
    carouselInstance.next();
  });
}

function initFoodItems(carousel, stadiumIndex) {
  console.log('link');
  for (
    var k = 0;
    k < stadiums[stadiumIndex].vendors[0].foodItems.length;
    k++
  ) {
    var carouselItem = document.createElement("a");
    // newElement.innerHTML = stadiums[stadiumIndex].vendors[vendorIndex].name;
    carouselItem.setAttribute("value", k);
    carouselItem.setAttribute("class", "carousel-item");
    carouselItem.setAttribute("href", "#" + k + "!");

    var row = document.createElement("div");
    row.setAttribute("class", "row");
    var p1 = document.createElement("p");
    p1.setAttribute("class", "col s10 red-text text-darken-3");
    p1.innerHTML =
      stadiums[stadiumIndex].vendors[0].foodItems[k].name;
    var p2 = document.createElement("p");
    p2.setAttribute("class", "col s2 red-text text-darken-3");
    p2.innerHTML =
      "$" + stadiums[stadiumIndex].vendors[0].foodItems[k].price;
    row.appendChild(p1);
    row.appendChild(p2);

    var row2 = document.createElement("div");
    row2.setAttribute("class", "input-field row");
    var input = document.createElement("input");
    input.setAttribute("value", 0);
    // input.setAttribute('id', 'first_name2');
    input.setAttribute("type", "text");
    input.setAttribute("class", "validate col s8");
    var label = document.createElement("label");
    label.setAttribute("class", "active");
    label.setAttribute("for", "first_name2");
    label.innerHTML = "Number of items";
    var subB = document.createElement("div");
    subB.setAttribute(
      "class",
      "waves-effect waves-red btn-flat col s2 subButton"
    );
    subB.innerHTML = "-";
    subB.addEventListener("click", function(e) {
      var currentValue = parseInt(e.target.parentElement.children[0].value);
      if (currentValue > 0) {
        e.target.parentElement.children[0].value = currentValue - 1;
      }
    });
    var plusB = document.createElement("div");
    plusB.setAttribute(
      "class",
      "waves-effect waves-red btn-flat col s2 addButton"
    );
    plusB.innerHTML = "+";
    plusB.addEventListener("click", function(e) {
      var currentValue = parseInt(e.target.parentElement.children[0].value);
      e.target.parentElement.children[0].value = currentValue + 1;
    });

    row2.appendChild(input);
    row2.appendChild(label);
    row2.appendChild(subB);
    row2.appendChild(plusB);

    var img = document.createElement("img");
    img.setAttribute(
      "src",
      stadiums[stadiumIndex].vendors[0].foodItems[k].imageFile
    );

    carouselItem.appendChild(row);
    carouselItem.appendChild(row2);
    carouselItem.appendChild(img);

    carousel.appendChild(carouselItem);
  }
  initCarousel(carousel);
  
}

function initStadium(stadiumSelector) {
  
}