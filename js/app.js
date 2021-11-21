/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

// build the navbar

let sections = Array.from(document.getElementsByTagName("section"));

    // get the navbar Element
let nav_bar = document.getElementById("navbar__list");

    // loop over the sections and append the li to the navbar
const fragment = document.createDocumentFragment()
for (let section of sections)
{
    let nav_item = document.createElement('li');
    let anchor = document.createElement('a');
    anchor.textContent = section.getAttribute("data-nav");
    anchor.setAttribute('href', '#');


    nav_item.appendChild(anchor)
    fragment.appendChild(nav_item);
}
    // append the fragment to the navbar element
nav_bar.appendChild(fragment)

// finish building the navbar




// click to scroll

let links = [...nav_bar.getElementsByTagName("a")];

function scrollToSection (ev)
{
    ev.preventDefault()
    let link = ev.target;
    let linkContent = link.textContent;
    
    let sections_links_attr = function(sections)
    {
        sections.forEach(section => {
            let data_atr = section.getAttribute('data-nav')
            if(data_atr === linkContent)
            {
                section.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
                section.setAttribute('class', 'your-active-class')
                link.setAttribute('class', 'active_link');

                // remove the "active_link" class from the <a>s exept the one that clicked
                    for(let i = 0; i < links.length; i++)
                    {
                        if(links[i] === link)
                        {
                            continue;
                        }
                        else{
                            links[i].removeAttribute('class')
                        }
                    }

                // remove the "your-active-section"  class from the sections exept the one that is in view

                    for(let i = 0; i < sections.length; i++)
                    {
                        if(sections[i].getAttribute('data-nav') === linkContent)
                        {
                            continue;
                        }
                        else{
                            sections[i].removeAttribute('class')
                        }
                    }
            }
        })
    }
    sections_links_attr(sections);

}
links.forEach(link => {

    link.addEventListener("click", scrollToSection)
})

// finish click to scroll function



// is the section in view port function

let isInViewPort = function(ev)
{
    let currentSection = ev.target;

    sections.forEach(
        section => {
            // get the section coordinates
            const coor = section.getBoundingClientRect()
            // check if the element is in the view
            if(coor.top <= (window.innerHeight * 0.5) && coor.top >= 0)
            {
                // add the class your-active-class to the section that is in the view
                section.classList.add('your-active-class')
                // add the active-link to the link coresponding to the section in view
                links.forEach(
                    link => {
                        if(section.getAttribute('data-nav') === link.textContent)
                        {
                            link.classList.add('active_link')
                        }
                        else{
                            link.classList.remove('active_link')

                        }
                    }
                )

            }
            else{
                section.classList.remove('your-active-class')
            }
        }
    )
}
// add event listener to the document to listen to the scrool event
document.addEventListener('scroll', isInViewPort)

// finish the section in view port function


// click menu in phone screen
let icon = document.getElementById("click_icon")
let ul = document.getElementById("navbar__list");

icon.addEventListener("click", ()=> {
    ul.classList.toggle('visible')
})
