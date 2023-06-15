const usernameElement = document.querySelector('.username');
const userPhotoElement = document.querySelector('.user-photo')
const userNicknameElement = document.querySelector('.user-nickname');
const descElement = document.querySelector('.desc')

fetch('https://api.github.com/users/wcbs2006')
    .then(response => response.json())
    .then(data =>{
        const username = data.name;
        usernameElement.textContent = username;
        let contentUsernameElement = document.querySelector('.content .username');
        contentUsernameElement.textContent = username;
        document.title = 'Perfil - '+ username;

        const photo = data.avatar_url;
        userPhotoElement.src = photo;

        const nickname = data.login;
        userNicknameElement.textContent = nickname;

        const bio = data.bio;
        descElement.textContent = bio;
        // descriptionElement = bio;

    })
    .catch(error => {
        console.error('Ocorreu um erro:',error);
    })

