//profile info
const overview = document.querySelector(".overview");
const username = "re-RJ";
const reposList = document.querySelector(".repo-list");

const gitFetch = async function () {
    const gitProfile = await fetch(`https://api.github.com/users/${username}`);
    const data = await gitProfile.json();
    //console.log(data)
    displayInfo(data);
};
gitFetch()

const displayInfo = function (data) {
    const gitName = data.name;
    const gitBio = data.bio;
    const gitLocation = data.location;
    const gitPubRepos = data.public_repos;
    const avatar = data.avatar_url;

    const userInfo = document.createElement("div")
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${avatar} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${gitName}</p>
            <p><strong>Bio:</strong> ${gitBio}</p>
            <p><strong>Location:</strong> ${gitLocation}</p>
            <p><strong>Number of public repos:</strong> ${gitPubRepos}</p>
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
        li.classList.add ("unit");
        li.innerHTML = `
            <h3>${unit.name}</h3>
        `
        reposList.append(li);
    }
};