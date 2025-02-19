const imgButton = document.getElementById('imgButton');
const infoButton = document.getElementById('infoButton');
const infoSection = document.getElementById('artistInfoList')

function fetchImg () {
fetch('https://www.artic.edu/iiif/2/25c31d8d-21a4-9ea1-1d73-6a2eca4dda7e/full/843,/0/default.jpg')
    .then(response => response.blob())
    .then(imageBlob => {

        const imgURL = URL.createObjectURL(imageBlob);
        const imgElement = document.createElement('img');
        imgElement.src = imgURL;

        document.getElementById('picContainer').appendChild(imgElement);
        imgElement.style.display ='none';

        function showImg () {
            imgElement.style.display = 'block';
            imgButton.style.display = 'none';
        }
        showImg()
    })
    .catch(error => console.error('Error fetching image:', error));
};

imgButton.addEventListener('click', fetchImg);

function fetchInfo () {
   fetch ('https://api.artic.edu/api/v1/artworks/28560?fields=artist_title,medium_display,style_title,short_description')
    .then(response => response.json())
    .then(data => {

        const artistName = document.createElement('li');
        artistName.textContent = `Artist: ${data.data.artist_title
        }`;
        infoSection.appendChild(artistName);

        const description = document.createElement('li');
        description.textContent = data.data.short_description;
        infoSection.appendChild(description);
        
        const style = document.createElement('li');
        style.textContent = `Time Period: ${data.data.style_title}`;
        infoSection.appendChild(style);

        const medium = document.createElement('li');
        medium.textContent = `Medium: ${data.data.medium_display}`;
        infoSection.appendChild(style);

        function hideButton () {
            infoButton.style.display = 'none';
        }
        hideButton()
    })
    .catch(error => console.error('Error fetching image:', error));
}

infoButton.addEventListener('click', fetchInfo);

const resetButton = document.getElementById('resetButton')

function resetPage() {
    window.location.reload();
}

resetButton.addEventListener('click', resetPage)


//fetch ('https://api.artic.edu/api/v1/artworks/28560?fields=artist_title,medium_display,style_title,short_description')
    //.then(response => response.json())
    //.then(data => console.groupCollapsed(data))
