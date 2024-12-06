//Reset Button
const randomSetupButton = document.querySelector('#randomSetupButton');
randomSetupButton.onclick = () => {
    lifeWorld.randomSetup(); 
    initialArtist.updateGrid();
}