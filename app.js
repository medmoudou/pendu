let assets = [
    "assets/img/0.png", "assets/img/1.png", "assets/img/2.png", "assets/img/3.png", "assets/img/4.png", "assets/img/5.png",
    "assets/img/6.png", "assets/img/7.png", "assets/img/8.png", "assets/img/9.png", "assets/img/10.png", "assets/img/11.png"
];

let words = [
    "Bonjour", "Marcher", "Dormir", "Manger", "Nez",
    "Dancer", "Rigoler", "Fenetre", "Porte", "Table"
]


class Game {

    constructor(elements) {
        this.element = elements
        this.dashes = ""
        this.invalidattemps = 0
        this.validattemps = 0
        this.found = false
        this.word = words[Math.floor(Math.random() * words.length)];
        this.wordLength = this.word.length
        this.makeView()
        this.makeListeners()
    }

    makeListeners() {
        let button = document.querySelector("#check")
        let playbtn = document.querySelector("#play")
        let text = document.querySelector("#text")
        button.addEventListener("click", e => {


            // ça pour fixer un problem :)
            let letters = document.querySelectorAll(".dashes div")
            for (let i = 0; i < letters.length; i++) {
                if (letters[i].firstChild.nodeValue == text.value.toUpperCase()) {
                    this.validattemps--
                }
            }

            this.found = false
            for (let i = 0; i < this.wordLength; i++) {
                if (this.word.charAt(i).toUpperCase() == text.value.toUpperCase()) {
                    let index = parseInt(i) + 1
                    document.querySelector(".dashes :nth-child(" + index + ")").innerHTML = text.value.toUpperCase()
                    this.found = true
                    this.validattemps++
                }
            }

            if (!this.found && text.value != "") {
                this.invalidattemps++
                let img = document.querySelector("img");
                img.src = assets[this.invalidattemps];
            }

            if (this.validattemps == this.wordLength) {
                this.win()
            } else if (this.invalidattemps > 8) {
                this.loss()
            }
            text.value = ""
            text.focus()
        })

        text.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                button.click();
            }
        })

        playbtn.addEventListener("click", () => {
            document.querySelector(".content").setAttribute("style", "display:block;")
            document.querySelector(".play").setAttribute("style", "display:none;")
            text.focus()
        })

    }

    makeView() {
        let play = document.createElement("section");
        play.classList.add('play');

        let content = document.createElement("section");
        content.classList.add('content');

        let p = document.createElement("p")
        p.classList.add("title")
        p.innerHTML = "Le Pendu"

        let playbtn = document.createElement("button");
        playbtn.classList.add('playbtn');
        playbtn.innerHTML = "Jouer"
        playbtn.id = "play"

        let img = document.createElement("img");
        img.classList.add('image');
        img.src = assets[0];

        let dashes = document.createElement("div");
        dashes.classList.add('dashes')
        for (let i = 0; i < this.wordLength; i++) {
            let div = document.createElement("div");
            div.append("-")
            div.id = i
            dashes.appendChild(div)
        }

        let input = document.createElement("input");
        input.type = "text"
        input.id = "text"
        input.autocomplete = "off"
        input.maxLength = 1

        let button = document.createElement("button");
        button.innerHTML = "Vérifier"
        button.id = "check"

        play.appendChild(p)
        play.appendChild(playbtn)
        content.appendChild(img)
        content.appendChild(dashes)
        content.appendChild(input)
        content.appendChild(button)

        this.element.appendChild(play)
        this.element.appendChild(content)

        content.setAttribute("style", "display:none;")
    }

    win() {

        document.querySelector(".game").setAttribute("style", "background-color: #5bce60 !important")
        let content = document.querySelector(".content")
        let text = document.querySelector("#text")
        let check = document.querySelector("#check")
        content.removeChild(text)
        content.removeChild(check)
        let p = document.createElement("p");
        p.classList.add('win');
        p.innerHTML = "Gagné :)"
        let btn = document.createElement("button")
        btn.innerHTML = "Rejouer"
        btn.classList.add("replay")
        content.appendChild(p)
        content.appendChild(btn)

        btn.addEventListener("click", () => {
            location.reload()
        })

    }

    loss() {

        document.querySelector(".game").setAttribute("style", "background-color: #ff5722 !important")
        let content = document.querySelector(".content")
        let text = document.querySelector("#text")
        let check = document.querySelector("#check")
        content.removeChild(text)
        content.removeChild(check)
        let p = document.createElement("p");
        p.classList.add('loss');
        p.innerHTML = "Perdu :("
        let btn = document.createElement("button")
        btn.innerHTML = "Rejouer"
        btn.classList.add("replay")
        content.appendChild(p)
        content.appendChild(btn)

        btn.addEventListener("click", () => {
            location.reload()
        })


        for (let i = 0; i < this.wordLength; i++) {
            let index = parseInt(i) + 1
            document.querySelector(".dashes :nth-child(" + index + ")").innerHTML = this.word.charAt(i).toUpperCase()
        }

        this.element.appendChild(content)


    }

    static init() {
        let game = document.querySelector(".game");
        new this(game);
    }

}

Game.init()
