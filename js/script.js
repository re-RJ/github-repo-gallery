//profile info
const overview = document.querySelector(".overview");
const username = "re-RJ";
const reposList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");



const gitFetch = async function () {
    const gitProfile = await fetch(`https://api.github.com/users/${username}`);
    const data = await gitProfile.json();
    //console.log(data)
    displayInfo(data);
};
gitFetch()

const displayInfo = function (data) {
    //const gitName = data.name;
    //const gitBio = data.bio;
    //const gitLocation = data.location;
    //const gitPubRepos = data.public_repos;
    //const avatar = data.avatar_url;

    const userInfo = document.createElement("div")
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> 
    `;
    overview.append(userInfo);
    gitRepos();
};

const gitRepos = async function () {
    const repoSort = await fetch(`https://api.github.com/users/${username}/repos?sort=updated_at&per_page=100`);
    const repoArray = await repoSort.json();
    //console.log(repoArray);    
    displayRepos(repoArray);
};
//gitRepos();

const displayRepos = function (repos) {
    for (const unit of repos) {
        const li = document.createElement("li");
        li.classList.add("unit");
        li.innerHTML = `
            <h2>${unit.name}</h2>
        `
        reposList.append(li);
    }
};

reposList.addEventListener("click", function (e) {
    if (e.target.matches("h2")) {
        const repoName = e.target.innerText
        getRepoInfo(repoName)
    }
});

const getRepoInfo = async function (repoName) {
    const info = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await info.json();
    //console.log(repoInfo)

    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json();
    //console.log(languageData)

    const languages = [];
    for (const language in languageData) {
        languages.push(language)
    }
    //console.log(languages)

    displayRepoInfo(repoInfo, languages)
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = `
        <h2>Name: ${repoInfo.name}</h2>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
};