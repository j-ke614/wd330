function listWeeklyItems() {
    console.log(links)
    for (let i=0; i < links.length; i++) {
        let type = links[i].type;
        let url = links[i].url;
        let label = links[i].label;

        let list = document.getElementById("weeklyList");
        let item = document.createElement('li');
        let hyperlink = document.createElement('a');
        let activity = document.getElementById("teamActivity");
        let challenge = document.getElementById("challenge");

            if (type == "notes") {
                list.appendChild(item);
                hyperlink.setAttribute('href', url);
                item.appendChild(hyperlink);
                hyperlink.textContent = label;
            } else if (type == "challenge") {
                challenge.appendChild(item);
                hyperlink.setAttribute('href', url);
                item.appendChild(hyperlink);
                hyperlink.textContent = label;
            } else {
                activity.appendChild(item);
                hyperlink.setAttribute('href', url);
                item.appendChild(hyperlink);
                hyperlink.textContent = label;
            }
            };    
}

// const links = [
//     {
//         label: "Week 1 - Getting Started",
//         url: "week1/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 2 - Basics, Arrays, Loops & Functions",
//         url: "week2/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 2 - Math Inputs",
//         url: "week2/team2_activity/index.html",
//         type: "activity"
//     },
//     {
//         label: "Week 3 - Objects, Methods, 'this', DOM & Events",
//         url: "week3/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 3 - Array Cardio",
//         url: "week3/team2_activity/index.html",
//         type: "activity"
//     },
//     {
//         label: "Week 4 - Forms, OOP, Modular JS",
//         url: "week4/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 4 - Tic Tac Toe",
//         url: "week4/team2_activity/index.html",
//         type: "activity"
//     },
//     {
//         label: "Week 5 - Testing & Debugging",
//         url: "week5/index.html",
//         type: "notes"
//     },
//     {
//         label: "Challenge 1",
//         url: "week6/challenge_1/index.html",
//         type: "challenge"
//     },
//     {
//         label: "Week 5 - Great Hikes",
//         url: "week5/team2_activity/index.html",
//         type: "activity"
//     },
//     {
//         label: "Week 7 - Further Functions & Ajax",
//         url: "week7/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 7 - Great Hikes Part 2",
//         url: "week7/team2_activity/index.html",
//         type: "activity"
//     },
//     {
//         label: "Week 8 - Transforms, Transitions, Canvas, SVG and Drag & Drop",
//         url: "week8/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 8 - Star Wars API",
//         url: "week8/team2_activity/swapi.html",
//         type: "activity"
//     },
//     {
//         label: "Week 9 - The Window Object & HTML5 APIs",
//         url: "week9/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 9 - DrumKit",
//         url: "week9/team2_activity/index.html",
//         type: "activity"
//     },
//     {
//         label: "Activity - Modern Front End Development",
//         url: "week9/activity/parcel/src/index.html",
//         type: "notes"
//     },
//     {
//         label: "Week 10",
//         url: "week10/index.html",
//         type: "notes"
//     }
// ]

// function loadIndex() {
//     const ol = document.querySelector("#linksList");

//     links.forEach( link => {
//         const li = document.createElement("li")
//         const href = document.createElement("a");
//         href.setAttribute("href", link.url);
//         href.innerText = link.label;

//         li.appendChild(href);
//         ol.appendChild(li);
//     })
// }