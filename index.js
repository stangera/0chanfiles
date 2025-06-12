const label = document.getElementById("main_title");
const movingLabel = document.getElementById("moving_label");
movingLabel.style.left = `0px`;
movingLabel.style.top = `0px`;

const moveStep = 10;
let x = 0;
let y = 0;
document.addEventListener("keydown", event => {

    event.preventDefault();

    if(event.key == "w" || event.key == "ц"){
        y -= moveStep;
        movingLabel.style.top = `${y}px`;
    } if(event.key == "a" || event.key == "ф"){
        x -= moveStep;
        movingLabel.style.left = `${x}px`;
    } if(event.key == "s" || event.key == "ы"){
        y += moveStep;
        movingLabel.style.top = `${y}px`;
    } if(event.key == "d" || event.key == "в"){
        x += moveStep;
        movingLabel.style.left = `${x}px`;
    }
    console.log(movingLabel.style.left)
    console.log(movingLabel.style.top)
    console.log(`x ${x}; y ${y}`)

})
