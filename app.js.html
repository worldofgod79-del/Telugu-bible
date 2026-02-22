let bibleData = {};

// 1. JSON డేటా లోడ్ చేయడం
async function loadBibleData() {
    try {
        const response = await fetch('bible.json');
        bibleData = await response.json();
        
        // మనం ఏ పేజీలో ఉన్నామో చెక్ చేసి ఆ ఫంక్షన్ రన్ చేయడం
        if (document.getElementById('books-list')) {
            renderHomePage();
        } else if (document.getElementById('bible-content')) {
            renderReaderPage();
        }
    } catch (error) {
        console.error("డేటా లోడ్ అవ్వలేదు:", error);
    }
}

// 2. హోమ్ పేజీ లాజిక్ (పుస్తకాలు మరియు ప్రోగ్రెస్)
function renderHomePage() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    
    let totalChapters = 0;
    let readChapters = 0;
    const progressData = getProgressData();

    // ప్రతి పుస్తకం కోసం లూప్
    for (const book in bibleData) {
        const chapters = Object.keys(bibleData[book]);
        totalChapters += chapters.length;
        if (progressData[book]) {
            readChapters += progressData[book].length;
        }

        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-card';
        bookDiv.innerHTML = `<div>${book}</div> <div>`;
        
        // చాప్టర్ లింక్స్ క్రియేట్ చేయడం
        chapters.forEach(ch => {
            const isRead = isChapterRead(book, ch) ? '✅' : '';
            bookDiv.innerHTML += `<a href="reader.html?book=${book}&chapter=${ch}" class="chapter-link">${ch} ${isRead}</a>`;
        });
        
        bookDiv.innerHTML += `</div>`;
        booksList.appendChild(bookDiv);
    }

    // ఓవరాల్ ప్రోగ్రెస్ బార్ అప్‌డేట్ చేయడం
    const percentage = totalChapters === 0 ? 0 : Math.round((readChapters / totalChapters) * 100);
    const progressBar = document.getElementById('overall-progress');
    progressBar.style.width = percentage + '%';
    progressBar.innerText = percentage + '%';
}

// 3. రీడర్ పేజీ లాజిక్ (వచనాలు చూపించడం)
function renderReaderPage() {
    // URL నుండి Book మరియు Chapter పేర్లు తీసుకోవడం
    const urlParams = new URLSearchParams(window.location.search);
    const bookName = urlParams.get('book');
    const chapterNum = urlParams.get('chapter');

    document.getElementById('book-title').innerText = `${bookName} - అధ్యాయం ${chapterNum}`;
    
    const contentDiv = document.getElementById('bible-content');
    const verses = bibleData[bookName][chapterNum];
    
    // వచనాలను స్క్రీన్ మీద వేయడం
    let html = '';
    for (const verseNum in verses) {
        html += `<div class="verse"><span class="verse-num">${verseNum}.</span> ${verses[verseNum]}</div>`;
    }
    contentDiv.innerHTML = html;

    // బటన్ స్టేటస్ సెట్ చేయడం
    const btn = document.getElementById('mark-read-btn');
    if (isChapterRead(bookName, chapterNum)) {
        btn.innerText = "✓ చదివారు (Completed)";
        btn.classList.add('completed');
        btn.disabled = true;
    } else {
        btn.onclick = function() {
            markAsRead(bookName, chapterNum);
            btn.innerText = "✓ చదివారు (Completed)";
            btn.classList.add('completed');
            btn.disabled = true;
        };
    }
}

// యాప్ స్టార్ట్ చేయడం
loadBibleData();
