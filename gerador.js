let senhaTamanho = 16
const inputEl = document.querySelector("#senha")
const checkMaiusculaEl = document.querySelector("#checkMaiuscula")
const checkNumerosEl = document.querySelector("#checkNumeros")
const checkcheckSimbolosEl = document.querySelector("#checkSimbolos")
const indicadorSeguramcaBarraEl = document.querySelector("#indicadorSeguramcaBarra")

function geradorSenha(){
    var caracteres = "abcdefghjklmnpqrstuvxywz"

    const caracteresMaiusculos = "ABCDEFGHJKLMNPQRSTUVXYWZ123456789"
    const caracteresNumeros = "123456789"
    const caracteresSimbolos ="#%:?!@&*()[]"

    checkMaiusculaEl.checked ? caracteres += caracteresMaiusculos : false 
    checkNumerosEl.checked ? caracteres += caracteresNumeros : false 
    checkcheckSimbolosEl.checked ? caracteres += caracteresSimbolos : false
    
    let senhaGerada = ""
    
    for (let i = 0; i < senhaTamanho; i++){
      const aleatorio = Math.floor(Math.random() * caracteres.length)  
      senhaGerada += caracteres.substring(aleatorio, aleatorio + 1)
    }

    inputEl.value = senhaGerada   
    calculaQualidade()
    calcularTamanhoFonte()
    
}

function calculaQualidade(){
    const porcentagem = (
            (Math.round(senhaTamanho / 20 * 100) * 0.25) +
            (checkMaiusculaEl.checked ? 15 : 0) +
            (checkNumerosEl.checked ? 25 : 0) +
            (checkcheckSimbolosEl.checked ? 35 : 0)
    )

    if (porcentagem > 69){
        indicadorSeguramcaBarraEl.classList.remove('critica')
        indicadorSeguramcaBarraEl.classList.remove('alerta')
        indicadorSeguramcaBarraEl.classList.add('segura')
    } else if (porcentagem > 50){
        indicadorSeguramcaBarraEl.classList.remove('critica')
        indicadorSeguramcaBarraEl.classList.add('alerta')
        indicadorSeguramcaBarraEl.classList.remove('segura')
    } else {
        indicadorSeguramcaBarraEl.classList.add('critica')
        indicadorSeguramcaBarraEl.classList.remove('alerta')
        indicadorSeguramcaBarraEl.classList.remove('segura')
    }

    porcentagem == 100 ? indicadorSeguramcaBarraEl.classList.add('completa') : indicadorSeguramcaBarraEl.classList.remove('completa')

    indicadorSeguramcaBarraEl.style.width = `${porcentagem}%`
}

function copiar(){
    navigator.clipboard.writeText(inputEl.value) //api para copiar elementos do navegador
}

function calcularTamanhoFonte(){
    if(senhaTamanho > 18){
        inputEl.classList.remove("fontSm")
        inputEl.classList.remove("fontXSm")
        inputEl.classList.add("fontXXSm")
    } else if(senhaTamanho > 14){
        inputEl.classList.remove("fontSm")
        inputEl.classList.add("fontXSm")
        inputEl.classList.remove("fontXXSm")

    } else if(senhaTamanho > 10){
        inputEl.classList.add("fontSm")
        inputEl.classList.remove("fontXSm")
        inputEl.classList.remove("fontXXSm")
    } else {
        inputEl.classList.remove("fontSm")
        inputEl.classList.remove("fontXSm")
        inputEl.classList.remove("fontXXSm")
    }
}

const senhaTamanhoEl = document.querySelector("#tamanhoSenha")
senhaTamanhoEl.addEventListener("input", function() {
senhaTamanho = senhaTamanhoEl.value
document.querySelector('#senhaTamanhoTexto').innerHTML=senhaTamanho
geradorSenha()
})

checkMaiusculaEl.addEventListener('click', geradorSenha)
checkNumerosEl.addEventListener('click', geradorSenha)
checkcheckSimbolosEl.addEventListener('click', geradorSenha)

document.querySelector("#copiar-1").addEventListener("click", copiar)
document.querySelector("#copiar-2").addEventListener("click", copiar)
document.querySelector("#renovar").addEventListener("click", geradorSenha)

geradorSenha()