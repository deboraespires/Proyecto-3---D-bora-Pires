import "./button.css";

export const createButton = ({text, bgColor}) => {
    return `<button class="headerButton" style="background-color: ${bgColor}">${text}</button>`
}