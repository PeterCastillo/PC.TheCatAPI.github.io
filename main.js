const imgContainer = document.querySelector('.container__img');
const imgFavourites= document.querySelector('.container__favourites');
const change = document.getElementById('cambiar')
const API = 'https://api.thecatapi.com/v1/images/search?limit=3'
const API_Favourites = 'https://api.thecatapi.com/v1/favourites?&api_key=live_Be9EjSCSjb0vLwRRU8KgbrgWAH9DLDHbtPjRTAXmgyLjkvGULDJ5dGICHCipbIlW'
const API_Favourites_Delete = (id) => {
    return `https://api.thecatapi.com/v1/favourites/${id}?&api_key=`}

const fragmento = document.createDocumentFragment();

/*API KEY = Para que el backend sepa de donde estan pidiendo la solicitutd de informacion*/
const fechData = async (urlApi) => {
    const reponse = await fetch(urlApi);
    const data = reponse.json();
    return data;
}

const gato = async() => {
    try {
        const gato = await fechData(API);
        imgContainer.innerHTML = '';
        gato.forEach(element => {
            let div = document.createElement('div');
            const gatito = `
                <img src="${element.url}" alt="">
                <button class="añadir" data-id="${element.id}">Agregar a favoritos</button>
            `
            div.innerHTML = gatito;
            fragmento.appendChild(div)
            imgContainer.appendChild(fragmento)
        });

    } catch(error) {
        console.log(`Ocurrio un ${error} lo sentimos`)
    }
}

window.addEventListener('load', () => {
    gato();
    pintarFavoritos();
})

change.addEventListener('click', () => {
    gato();
});

imgContainer.addEventListener('click', (e) => {
    addFavourites(e);
})

const addFavourites = (e) => {
    if(e.target.classList.contains('añadir')){
        saveFavourites(e.target.dataset.id )
    }
};

const saveFavourites = async(id) => {
    try {
        const gatoFavorito = await fetch(API_Favourites, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                image_id: id
            })
        });
        pintarFavoritos()
    } catch(error) {
        console.log(`Ocurrio un ${error} lo sentimos`)
    }
}

const pintarFavoritos = async() => {
    try {
        const Favourites = await fechData(API_Favourites);
        imgFavourites.innerHTML = '';
        Favourites.forEach(element => {
            let div = document.createElement('div');
            const gatitoFavourite = `
                <img src="${element.image.url}" alt="">
                <button class="delete" data-id="${element.id}">Eliminar de favoritos</button>
            `
            div.innerHTML = gatitoFavourite;
            fragmento.appendChild(div);
            imgFavourites.appendChild(fragmento);
        });
    } catch(error) {
        console.log(`Ocurrio un ${error} lo sentimos`)
    }
}

imgFavourites.addEventListener('click' , (e) => {
    settDelete(e);
});

const settDelete = (e) => {
    if(e.target.classList.contains('delete')){
        deleteFavourites(e.target.dataset.id)
    }
};

const deleteFavourites = async(id) => {
    try {
        const gatoFavorito = await fetch(API_Favourites_Delete(id), {
            method: 'DELETE',
            headers: {
                'X-API-KEY': 'live_Be9EjSCSjb0vLwRRU8KgbrgWAH9DLDHbtPjRTAXmgyLjkvGULDJ5dGICHCipbIlW'
                }
        });
        pintarFavoritos()
    } catch(error) {
        console.log(`Ocurrio un ${error} lo sentimos`)
    }
};

