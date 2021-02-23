function saveTextAsFile() {
    let textToSave = document.getElementById("inputTextToSave").value;
    let textToSaveAsBlob = new Blob([textToSave], {type: "text/plain"});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    let downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}
function loadFileAsText() {
    let fileToLoad = document.getElementById("fileToLoad").files[0];
    let fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        let textFromFileLoaded = fileLoadedEvent.target.result;
        let reversTexForm = textFromFileLoaded.split("\n").map(item => {
                let numberRow = +(item.match(/\d+/)[0]);
                let isFibonacciPlus = 5 * Math.pow(numberRow, 2) + 4;
                let isFibonacciMinus = 5 * Math.pow(numberRow, 2) - 4;
                if (Number.isInteger(Math.sqrt(isFibonacciPlus)) || Number.isInteger(Math.sqrt(isFibonacciMinus))) {
                    return item.split("").reverse().join("");
                }
                return item;
            }
        )
        let columnTexForm = reversTexForm.toString().replace( /,/g, "\n" );
        document.getElementById("inputTextToSave").value = columnTexForm;

    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}
