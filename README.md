# Interactive Data Api Dashboard

This project is an interactive dashboard demonstrating the use of the **`XMLHttpRequest`** (XHR) object in pure JavaScript to fetch and display data from an external API. It serves as a practical example of how to make asynchronous HTTP requests for dynamic web content without relying on modern alternatives like the `fetch` API or external libraries (beyond jQuery for DOM manipulation, as used in the provided code).

## How to Run Locally

The dashboard is designed to be fully self-contained and run in any modern web browser.

1.  **Save the files:** Ensure you have the `index.html`, `style.css`, and `app.js` files saved in the same local directory.
2.  **Open `index.html`:** Simply **double-click** the `index.html` file.
    * The browser will execute the embedded JavaScript (`app.js`), which uses `XMLHttpRequest` to fetch the product data and populate the table upon load.
    * No local server is required because the API calls are made over HTTP/S to an external resource (see **Known Limitations** for potential CORS notes).

## API Endpoints and Data Fields

The dashboard retrieves product data from the **Platzi Fake Store API**.

### Endpoint Called

* **URL:** `https://api.escuelajs.co/api/v1/products`
* **Method:** `GET`
* **Purpose:** Fetches a list of all products.

### Data Fields Used

The application parses the JSON response from the API and extracts the following fields for display and filtering:

| Data Field (JSON Key Path) | Used For |
| :--- | :--- |
| **`title`** | Display in the table, Search Filter |
| **`price`** | Display in the table, Price Range Filter |
| **`description`** | Display in the table, Search Filter |
| **`category.name`** | Display in the table, Category Select Filter |
| **`images[0]`** | Link for the product image |
| **`creationAt`** | Display in the table |
| **`updatedAt`** | Display in the table |

## Filters and Sorting

The dashboard provides client-side filtering capabilities to explore the fetched dataset.

### Filters Explained

The filters are applied instantly upon clicking the **'Apply Filters'** button or by selecting a category.

1.  **Search Title / Description:** A text input that filters products where the **`title`** or **`description`** field contains the entered search term (case-insensitive).
2.  **Category:** A dropdown list that filters products based on the **`category.name`**. The options are dynamically populated from the unique categories found in the fetched dataset.
3.  **Price Range:** Two number inputs (**Min Price** and **Max Price**) that filter products whose **`price`** falls inclusively between the specified minimum and maximum values.

### Sorting

* **Initial Display:** The data is displayed in the order it is received from the API.
* **Current Feature:** Sorting for price and title available.


## 📊 Computed Metrics

The dashboard currently focuses on data display and filtering and **does not compute any aggregate metrics**.

* *Future Enhancement:* Potential metrics could include "Total Product Count" or "Average Price."

---

## Known Limitations

When working with external APIs and client-side applications, certain limitations should be noted:

* **CORS (Cross-Origin Resource Sharing):** Although the Platzi Fake Store API generally supports CORS, in certain restrictive browser environments (or if switching to a different API), you might encounter issues. The use of `XMLHttpRequest` on a local `file://` protocol is often permissible, but be aware of this potential hurdle.
* **Rate Limits:** The Platzi Fake Store API does not enforce strict public rate limits, but excessive requests could lead to temporary blocks or slower response times. The dashboard only makes a **single `GET` request on load**.
* **Unstable Images:** The **`images`** links provided by the API occasionally contain broken URLs, placeholders, or links to non-image resources. This may result in broken "View Image" links in the table.