

function openModal(src) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-img').src = src;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionBody = button.nextElementSibling;
        accordionBody.style.display = accordionBody.style.display === 'block' ? 'none' : 'block';
    });
});


document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    toastr.success('Form submitted successfully!');
});


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const contentList = document.getElementById('content-list');
        data.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `<h3>${product.name}</h3><p>Price: $${product.price}</p>`;
            contentList.appendChild(productItem);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


document.getElementById('content-list').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('delete-btn')) {
        const productItem = target.closest('.product-item');
        productItem.remove();
        toastr.success('Item deleted successfully!');
    }


    if (target.classList.contains('edit-btn')) {
        const productItem = target.closest('.product-item');
        const nameElement = productItem.querySelector('h3');
        const priceElement = productItem.querySelector('p');

   
        const newName = prompt('Edit Product Name:', nameElement.textContent);
        const newPrice = prompt('Edit Product Price:', priceElement.textContent.replace('Price: $', ''));

        if (newName && newPrice) {
            nameElement.textContent = newName;
            priceElement.textContent = `Price: $${newPrice}`;
            toastr.success('Item edited successfully!');
        }
    }
});


const apiKey = 'your_api_key_here'; 

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    })
    .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `
            <p>City: ${data.name}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
        `;
    })
    .catch(error => {
        document.getElementById('weather-info').innerHTML = '<p>Error loading weather data. Please try again later.</p>';
        console.error(error);
    });



document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#nav-bar a");
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
    
        link.classList.remove("active");

      
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#nav-bar a");
    const mainContent = document.querySelector("main");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            const page = link.getAttribute("data-page") || link.getAttribute("href").split(".")[0];
            
         
            fetch(`${page}.html`)
                .then(response => response.text())
                .then(data => {
            
                    const parser = new DOMParser();
                    const newContent = parser.parseFromString(data, "text/html");
                    mainContent.innerHTML = newContent.querySelector("main").innerHTML;

                   
                    navLinks.forEach(link => link.classList.remove("active"));
                    link.classList.add("active");
                })
                .catch(err => console.error("Failed to load page content:", err));
        });
    });
});
