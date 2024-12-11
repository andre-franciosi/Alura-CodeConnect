const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, name: arquivo.name})
        }
        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.name;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById("input-tags")
const listaTags = document.getElementById("lista-tags")

listaTags.addEventListener("click", (evento) => {
    if(evento.target.classList.contains("remove-tag")){
        const removableTag = evento.target.parentElement
        listaTags.removeChild(removableTag)
    }
})


const tags = ["FRONT-END", "PROGRAMAÇÃO", "DATA SCIENCE", "FULL STACK", "HTML", "CSS", "JAVASCRIPT"]

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tags.includes(tagTexto.toUpperCase()))
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if(evento.key == "Enter"){
        evento.preventDefault()
        const tagTexto = inputTags.value.trim()
        if (tagTexto !== ""){
            try{
                const tagExists = await verificaTagsDisponiveis(tagTexto)
                if(tagExists){
                    const newTag = document.createElement("li")
                    newTag.innerHTML = `<p>${tagTexto.toUpperCase()}</p> <img src="./img/close-black.svg" class="remove-tag"/>`
                    listaTags.appendChild(newTag)
                    inputTags.value = ""
                }
                else{
                    alert("Tag não encontrada")
                }
            }
            catch (error){
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console.")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar")

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            const deuCerto = Math.random() > 0.5

            if(deuCerto){
                resolve("Projeto publicado com sucesso")
            } else {
                reject("Erro ao publicar o projeto")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (event) =>{
    event.preventDefault()

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto)
        console.log(resultado)
        alert("Deu tudo certo")
    }
    catch (error){
        console.log("Deu errado: ", error)
        alert("Deu tudo errado")
    }
})

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";

    listaTags.innerHTML = "";
})