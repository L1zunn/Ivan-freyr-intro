document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const cube = document.querySelector('.cube');

    
    menu.addEventListener('mouseenter', function () {
        cube.style.display = 'flex';
    });

    menu.addEventListener('mouseleave', function () {
        cube.style.display = 'none';
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

    const githubApiUrl = "https://api.github.com/users/L1zunn/repos";

    // Create a new XMLHttpRequest object
    const githubRequest = new XMLHttpRequest();

    // Open the request with the specified method and URL
    githubRequest.open("GET", githubApiUrl);

    // Set up an event listener to handle the response
    githubRequest.onreadystatechange = function () {
        if (githubRequest.readyState === 4 && githubRequest.status === 200) {
            // Parse the JSON response
            const repositories = JSON.parse(githubRequest.responseText);

            // Process the repositories and update the HTML dynamically
            updateProjectsList(repositories);
        }
    };

    // Add a "load" event listener for successful request completion
    githubRequest.addEventListener('load', function (event) {
        // Parse the JSON response and store it in the 'repositories' variable
        const repositories = JSON.parse(this.responseText);

        // Log the value of 'repositories' in the console
        console.log(repositories);
    });

    // Send the request
    githubRequest.send();

    // Function to update the Projects list in the HTML
    function updateProjectsList(repositories) {
        const projectSection = document.querySelector("#projects");
        const projectsList = projectSection.querySelector("ul");

        // Clear existing list items
        projectsList.innerHTML = "";

        // Iterate through each repository and add it to the list
        for (let i = 0; i < repositories.length; i++) {
            // Create a new list item element
            const project = document.createElement("li");

            // Set the inner text of the project variable to the current repository's name property
            project.innerText = repositories[i].name;

            // Append the project element to the projectsList element
            projectsList.appendChild(project);
        }
    }
});