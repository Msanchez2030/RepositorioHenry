class Activity {
    constructor(id, title, description, imgUrl) {
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
        this.id = id;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.id = 0;
    }
    getAllActivities() {
        return this.activities;
    }
    createActivities(title, description, imgUrl) {
        const id = this.id++;
        const activity = new Activity(id, title, description, imgUrl);
        this.activities.push(activity);
    }
    createActivity(activity) {
        const { title, description, imgUrl } = activity;

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;

        const imageElement = document.createElement("img");
        imageElement.src = imgUrl;

        const activityCard = document.createElement("div");
        activityCard.classList.add("Contenedores");
        activityCard.dataset.activityId = activity.id; // Agregar dataset con el ID de la actividad
        activityCard.appendChild(titleElement);
        activityCard.appendChild(descriptionElement);
        activityCard.appendChild(imageElement);

        return activityCard;
    }
    renderActivities() {
        const container = document.querySelector('.ContenedorPrin');
        container.innerHTML = '';

        const allActivities = this.getAllActivities();
        if (!allActivities) return;
        const activityElements = allActivities.map(activity => this.createActivity(activity));

        activityElements.forEach(element => {
            container.appendChild(element);
        });
    }
    addActivity() {
        const titleInput = document.getElementById("title");
        const descriptionInput = document.getElementById("description");
        const imgUrlInput = document.getElementById("imgUrl");

        const title = titleInput.value;
        const description = descriptionInput.value;
        const imgUrl = imgUrlInput.value;

        if (!title || !description || !imgUrl) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        this.createActivities(title, description, imgUrl);
        this.renderActivities();
        
        titleInput.value = "";
        descriptionInput.value = "";
        imgUrlInput.value = "";
    }
    deleteActivity(activityId) {
        this.activities = this.activities.filter(activity => activity.id !== activityId);
    }
}

const repository = new Repository();

const addButton = document.getElementById("agregar");
addButton.addEventListener("click", () => {
    repository.addActivity();
});

const container = document.querySelector('.ContenedorPrin');
container.addEventListener('click', event => {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('Contenedores')) {
        const activityIdToDelete = parseInt(clickedElement.dataset.activityId);

        repository.deleteActivity(activityIdToDelete);

        repository.renderActivities();
    }
});
