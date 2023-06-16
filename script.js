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


fetch('https://api.github.com/users/wcbs2006/followers')
    .then(response => response.json())
    .then(data => {
        const followersGrid = document.querySelector('.followers-grid');
        let numSeguidoresExibidos = 6;
        const viewMoreButton = document.querySelector('.view-more-followers');

        const renderizarSeguidores = (() => {
            followersGrid.innerHTML = '';
            data.slice(0, numSeguidoresExibidos).forEach(follower => {
                const followerPhotoUrl = follower.avatar_url;
                const followerName = follower.login;
    
                const followerHTML = `
                    <div class="follower" id="">
                        <img src="${followerPhotoUrl}" alt="" class="follower-photo" id="1">
                        <p class="follower-name">${followerName}</p>
                    </div>
                `;
    
                followersGrid.innerHTML += followerHTML;
            });
        });

        viewMoreButton.addEventListener('click', () => {
            numSeguidoresExibidos += 3;
            renderizarSeguidores();
        });

        renderizarSeguidores();
    })
    .catch(error => {
        console.error("Erro:", error);
    });

