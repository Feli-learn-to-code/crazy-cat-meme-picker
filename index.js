import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const memeModalOverlay = document.getElementById('meme-modal-overlay')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

memeModalOverlay.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(e){
    if( e.target.id === 'meme-modal-close-btn' ||
        !memeModal.contains(e.target)
    ){
        memeModal.style.display = 'none'
        memeModalOverlay.classList.add('hidden')
    }
}

function renderCat(){
    const cats = getRandomCats(2)

    memeModalInner.innerHTML =  cats.map ( cat =>
        `
        <img 
        class="cat-img" 
        src="./images/${cat.image}"
        alt="${cat.alt}"
        >
        `
    ).join('')
    memeModal.style.display = 'flex'
    memeModalOverlay.classList.remove('hidden')
}

function getRandomCats(max = 2){ 
    const catsArray = getMatchingCatsArray()

    if (catsArray.length <= max){
        return catsArray
    }

    return catsArray 
        .slice()
        .sort(() => 0.5 - Math.random())
        .slice(0, max)
}

function getMatchingCatsArray(){      
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(cat =>
            isGif ?
                cat.emotionTags.includes(selectedEmotion) && cat.isGif : 
                cat.emotionTags.includes(selectedEmotion)    
        )
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    emotions.forEach(emotion =>
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    )
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)



