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
        direitosElement.textContent = `Todos os direitos reservados a ${username}.`;

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


    // Validação Input (dando erro)
    const form = document.querySelector('#contact-form')
    const emailInput = document.querySelector('#email')
    const passwordInput = document.querySelector('#password')
    const messageTextarea = document.querySelector("#message")
    const submitButton = document.querySelector('#submit-button')

    form.addEventListener('submit', event =>{
        event.preventDefault(); //Impede envio automático

        const inputs = [emailInput, passwordInput, messageTextarea]
        inputs.forEach(input => {
            input.classList.remove('error');
        })
        

        const labels = form.querySelectorAll('label');
        labels.forEach(label =>{
            label.classList.remove('error-label')
        })

        let hasError = false;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error')
                const label = form.querySelector(`label[for='${input.id}']`)
                label.classList.add('error-label')
                hasError = true;
            }
        })

        if (!hasError){
            alert('Formulário enviado com sucesso!')
            // Limpar conteúdo dos inputs
            inputs.forEach(input => {
                input.value = '';
            })
        }
    })

