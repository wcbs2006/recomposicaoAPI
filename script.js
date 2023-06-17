const usernameElement = document.querySelector('.username');
const userPhotoElement = document.querySelector('.user-photo')
const userNicknameElement = document.querySelector('.user-nickname');
const descElement = document.querySelector('.desc')

fetch('https://api.github.com/users/wcbs2006')
    .then(response => response.json())
    .then(data =>{
        const username = data.name;
        document.title = 'Perfil - '+ username;
        usernameElement.textContent = username;
        let contentUsernameElement = document.querySelector('.content .username');
        let direitosElement = document.querySelector('.direitos');
        contentUsernameElement.textContent = username;
        direitosElement.textContent = `Todos os direitos reservados a ${username}`;

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


    // Validação Input
    const form = document.querySelector('.form')

    form.addEventListener('submit', event =>{
        event.preventDefault(); //Impede envio automático

        const emailInput = document.querySelector('.email')
        const passwordInput = document.querySelector('.password')
        const messageTextarea = document.querySelector(".message")
        const inputs = [emailInput, passwordInput, messageTextarea]
        inputs.forEach(input => {
            if(input.value === ''){
                input.classList.add('error'); // Adiciona a classe 'error' para campos vazios
            }else{
                input.classList.remove('error'); // Remove a classe 'error' quando os campos estiverem preenchidos
            }
        })
    })

