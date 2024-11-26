import { dictionary } from "../scripts/dictionary.js"

// obtencion de los inputs
const inputText = document.getElementById("inputText")
const btn_add = document.getElementById("btn-add")
const btn_traduct = document.getElementById("btn-traduct")

// funcion de traducir
const traduce = (option) =>{
    // limpia la zona en donde se imprimira la palabra
    const main = document.getElementById("word")
    main.innerHTML = ""
    // arreglo de los arreglos del objeto categories del objeto dictionary
    const categories = [dictionary.categories.animals,dictionary.categories.fruits,
    dictionary.categories.colors,dictionary.categories.physical_descriptions,
    dictionary.categories.skills,dictionary.categories.verbs]
    // obtencion de la palabra a traducir, se busca en el arreglo de arreglos el arreglo que contenga la palabra
    categories.forEach( category => {
        category.forEach(word => {
            switch (option) {
                // busca por medio de la opcion cual es el idioma a traducir
                case 1:
                    // reduce a mayusculas la palabra ingresada y la palabra a buscar para que no afecten las mayusculas o minusculas
                    if(word.spanish.toLowerCase() == inputText.value.toLowerCase()){
                        printWord(word)
                     }
                break;
                case 2:
                    if(word.english.toLowerCase() == inputText.value.toLowerCase()){
                        printWord(word)
                     }
                break;
                default:
                    // imposible el llegar aca
                    console.log("how you get here?")
                break;
            }
        });  
    });
}

const sortWords = () => {
    const selectedOrder = document.querySelector('input[name="order"]:checked').value
    const selectedCategory = document.querySelector('input[name="category"]:checked').value
    const connector = dictionary.categories[selectedCategory]

    connector.sort(function(a,b){
                    if (selectedOrder == 'A-Z') {
                        return a.english < b.spanish ? -1:1
                    }else{
                        return a.english > b.spanish ? -1:1
                    }
        
                })
    printTables(connector)
}

// ejecuta las funciones de traducir y de imprimir las tablas enviandoles la opcion que el usuario escoja (idioma)
const selectLanguage = () => {
    // obtencion de la opcion del idioma
    const selectedOption = document.querySelector('input[name="language"]:checked').value
	if (selectedOption === 'english') {
		traduce(1)
	} else if (selectedOption === 'spanish') {
		traduce(2)
	}
}

// const orderTables = () =>{
//     const selectedOrder = document.querySelector('input[name="order"]:checked').value
//     console.log(selectedOrder)
//     if (selectedOrder === 'A-Z') {
//         sortedWordsA_Z()
//     } else if (selectedOrder === 'Z-A') {
//         sortedWordsZ_A()
//     }
// }

// imprecion de la palabra
const printWord = (word) =>{
    const container = document.createElement("div")
    container.classList.add("container-word")

    const englishWord = document.createElement("h2")
    englishWord.textContent = `English: ${word.english}`
    
    const spanishWord = document.createElement("h2")
    spanishWord.textContent = `Spanish: ${word.spanish}`

    const example = document.createElement("h3")
    example.textContent = `Example: ${word.example}`

    container.appendChild(englishWord)
    container.appendChild(spanishWord)
    container.appendChild(example)

    document.getElementById("word").appendChild(container)
}

// tabla a imprimir si la opcion es 1 (ingles)
const printTable_english = (word) => {
    const english_spanish = document.createElement("h2")
    english_spanish.textContent = `${word.english} ---> ${word.spanish} (Example: ${word.example})`

    document.getElementById("tables").appendChild(english_spanish)
}

// tabla a imprimir si la opcion es 2 (español)
const printTable_spanish = (word) => {
    const spanish_english = document.createElement("h2")
    spanish_english.textContent = `${word.spanish} ---> ${word.english} (Example: ${word.example})`

    document.getElementById("tables").appendChild(spanish_english)
}

// define por medio de la opcion enviada por el selectlanguage que tabla imprimir
const printTables = (connector) => {
    const selectedOption = document.querySelector('input[name="language"]:checked').value
    // limpia la sección de las tablas
    const main = document.getElementById("tables")
    main.innerHTML = ""
    switch (selectedOption) {
        case "spanish":
            connector.forEach(word => {
                printTable_spanish(word)
            });
            break;
        case "english":
            connector.forEach(word => {
                printTable_english(word)
            });
            break;
        default:
            break;
    }
}

const addTable = () => {
    const container = document.createElement("div")
    container.id = "container-add"

    const englishWord = document.createElement("input")
    englishWord.id = "input-englishWord"
    englishWord.type = "text"
    englishWord.placeholder = "insert the english word"
    englishWord.classList.add("inputs_texts")

    const spanishWord = document.createElement("input")
    spanishWord.id = "input-spanishWord"
    spanishWord.type = "text"
    spanishWord.placeholder = "insert the spanish word"
    spanishWord.classList.add("inputs_texts")

    const example = document.createElement("input")
    example.id = "input-example"
    example.type = "text"
    example.placeholder = "insert an example"
    example.classList.add("inputs_texts")

    const fieldSet = document.createElement("fieldset")
    const label = document.createElement("label")
    label.textContent = "Category"
    const select = document.createElement("select")
    const option1 = document.createElement("option")
    option1.value = "animals"
    option1.textContent = "Animals"
    const option2 = document.createElement("option")
    option2.value = "fruits"
    option2.textContent = "Fruits"
    const option3 = document.createElement("option")
    option3.value = "colors"
    option3.textContent = "Colors"
    const option4 = document.createElement("option")
    option4.value = "physical_descriptions"
    option4.textContent = "Physical Descriptions"
    const option5 = document.createElement("option")
    option5.value = "skills"
    option5.textContent = "Skills"
    const option6 = document.createElement("option")
    option6.value = "verbs"
    option6.textContent = "Verbs"
    const button = document.createElement("button")
    button.id = "btn-addWord"
    button.classList.add("btn-style")
    button.textContent = "Add"

    container.appendChild(englishWord)
    container.appendChild(spanishWord)
    container.appendChild(fieldSet)
    fieldSet.appendChild(label)
    fieldSet.appendChild(select)
    select.appendChild(option1)
    select.appendChild(option2)
    select.appendChild(option3)
    select.appendChild(option4)
    select.appendChild(option5)
    select.appendChild(option6)
    container.appendChild(example)
    container.appendChild(button)

    document.querySelector("main").appendChild(container)
    const btn_addWord = document.getElementById("btn-addWord")
    btn_addWord.addEventListener("click", DataWord)
}

const DataWord = () => {
    const englishWord = document.getElementById("input-englishWord").value
    const spanishWord = document.getElementById("input-spanishWord").value
    const category = document.querySelector("select").value
    const example = document.getElementById("input-example").value
    const newWord = {
        id: (dictionary.categories[category].length)+1,
        english: englishWord,
        spanish: spanishWord,
        example: example
        // { "id": 1, "english": "Dog", "spanish": "Perro", "example": "The dog is barking." },
    }
    dictionary.categories[category].push(newWord)
    console.log(newWord)
}


    
// eventos de la tabla y al presionar el boton para traducir
window.addEventListener("DOMContentLoaded", sortWords)
// eventos los cuales identifican los radios buttons y busca en ellos algun cambio para ejecutar la funcion printTables
document.querySelectorAll('input[name="language"]').forEach(radio => {
    radio.addEventListener('change', sortWords
)})
document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', sortWords
)})
document.querySelectorAll('input[name="order"]').forEach(radio => {
    radio.addEventListener('change', sortWords
)})
btn_add.addEventListener("click", addTable)
btn_traduct.addEventListener("click", selectLanguage)