import "./button.css";

export const createButton = ({text, bgColor, id}) => {
    return `<button class="headerButton" id="${id}" style="background-color: ${bgColor}">${text}</button>`
}