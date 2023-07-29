document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch product data from your JSON file or API
    async function fetchProductData() {
      try {
        const response = await fetch("data.json");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching product data:", error);
        return [];
      }
    }
  
    // Function to populate the categories menu
    function populateCategoriesMenu(data) {
      const categoriesMenu = document.getElementById("categories-menu");
  
      // Get unique categories from the data
      const categories = [...new Set(data.map(product => product.category))];
  
      // Create menu items for each category
      categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category;
        li.addEventListener("click", () => filterProductsByCategory(category, data));
        categoriesMenu.appendChild(li);
      });
    }
  
    // Function to filter products by category
    function filterProductsByCategory(category, data) {
      const filteredProducts = data.filter(product => product.category === category);
      displayProducts(filteredProducts);
    }
  
    // Function to display products
    function displayProducts(products) {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";
  
      products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
  
        const productImage = document.createElement("img");
        productImage.src = product.imageURL;
        productImage.alt = product.title;
        productImage.classList.add("product-image");
  
        const productTitle = document.createElement("h2");
        productTitle.textContent = product.title;
  
        const amazonLink = document.createElement("a");
        amazonLink.href = product.amazonLink;
        amazonLink.textContent = "Buy on Amazon";
        amazonLink.classList.add("buy-button");
  
        productCard.appendChild(productImage);
        productCard.appendChild(productTitle);
        productCard.appendChild(amazonLink);
        productList.appendChild(productCard);
      });
    }
  
    // Initial setup - fetch data and populate the menu and product list
    fetchProductData()
      .then(data => {
        populateCategoriesMenu(data);
        displayProducts(data);
      });
  });
  