document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const cube = document.querySelector('.cube');
    const ball = document.querySelector('.ball');
    
    menu.addEventListener('mouseenter', function () {
        cube.style.display = 'flex';
    });

    menu.addEventListener('mouseleave', function () {
        cube.style.display = 'none';
    });

    menu.addEventListener('mouseleave', function () {
        cube.style.display = 'none';
        // Change the text inside the ball when menu is closed
        ball.innerText = '';
    });

    const messageForm = document.getElementById('leave_message');
    const messagesList = document.getElementById('messages');

    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const usersName = event.target.usersName.value;
        const usersEmail = event.target.usersEmail.value;
        const usersMessage = event.target.usersMessage.value;

        console.log(usersName, usersEmail, usersMessage);

        messageForm.reset();

        const newMessage = document.createElement('li');
        newMessage.innerHTML = `
            <a href="mailto:${usersEmail}">${usersName}</a>
            <span>${usersMessage}</span>
        `;

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.type = 'button';

        removeButton.addEventListener('click', function () {
            const entry = removeButton.parentNode;
            entry.remove();
        });

        newMessage.appendChild(removeButton);
        messagesList.appendChild(newMessage);
    });

// GitHub API
const githubApiUrl = "https://api.github.com/users/L1zunn/repos";


fetch(githubApiUrl)
    .then(response => response.json())
    .then(repositories => {
        
        updateProjectsList(repositories);
    })
    .catch(error => console.error('Error fetching data:', error));


function updateProjectsList(repositories) {
    const projectSection = document.querySelector("#projects");
    const projectsList = projectSection.querySelector("ul");

    
    projectsList.innerHTML = "";

    
    repositories.forEach(repo => {
       
        const project = document.createElement("li");

        
        project.innerText = repo.name;

        
        projectsList.appendChild(project);
    });
}
});