// బైబిల్ లోని 66 పుస్తకాల పేర్ల జాబితా
const bookNames = [
    "ఆదికాండము", "నిర్గమకాండము", "లేవీయకాండము", "సంఖ్యాకాండము", "ద్వితీయోపదేశకాండము",
    "యెహోషువ", "న్యాయాధిపతులు", "రూతు", "1 సమూయేలు", "2 సమూయేలు",
    "1 రాజులు", "2 రాజులు", "1 దినవృత్తాంతములు", "2 దినవృత్తాంతములు", "ఎజ్రా",
    "నెహెమ్యా", "ఎస్తేరు", "యోబు", "కీర్తనలు", "సామెతలు",
    "ప్రసంగి", "పరమగీతము", "యెషయా", "యిర్మీయా", "విలాపవాక్యములు",
    "యెహెజ్కేలు", "దానియేలు", "హోషేయ", "యోవేలు", "ఆమోసు",
    "ఓబద్యా", "యోనా", "మీకా", "నహూము", "హబక్కూకు",
    "జెఫన్యా", "హగ్గయి", "జెకర్యా", "మలాకీ",
    "మత్తయి", "మార్కు", "లూకా", "యోహాను", "అపొస్తలుల కార్యములు",
    "రోమీయులకు", "1 కొరింథీయులకు", "2 కొరింథీయులకు", "గలతీయులకు", "ఎఫెసీయులకు", "ఫిలిప్పీయులకు",
    "కొలస్సయులకు", "1 థెస్సలొనీకయులకు", "2 థెస్సలొనీకయులకు", "1 తిమోతికి", "2 తిమోతికి", "తీతుకు",
    "ఫిలేమోనుకు", "హెబ్రీయులకు", "యాకోబు", "1 పేతురు", "2 పేతురు",
    "1 యోహాను", "2 యోహాను", "3 యోహాను", "యూదా", "ప్రకటన"
];

let bibleData = [];

// 1. JSON డేటా లోడ్ చేయడం
async function loadBibleData() {
    try {
        const response = await fetch('bible.json');
        bibleData = await response.json();
        
        if (document.getElementById('books-list')) {
            renderHomePage();
        } else if (document.getElementById('bible-content')) {
            renderReaderPage();
        }
    } catch (error) {
        console.error("డేటా లోడ్ అవ్వలేదు:", error);
    }
}

// 2. హోమ్ పేజీ లాజిక్ 
function renderHomePage() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';
    
    let totalChapters = 0;
    let readChapters = 0;
    const progressData = getProgressData();

    // మీ JSON డేటాలోని ప్రతి పుస్తకానికి లూప్
    bibleData.forEach((bookObj, bookIndex) => {
        const bookName = bookNames[bookIndex]; 
        const chapters = bookObj.Chapter;

        totalChapters += chapters.length;
        if (progressData[bookName]) {
            readChapters += progressData[bookName].length;
        }

        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-card';
        bookDiv.style.flexDirection = 'column';
        bookDiv.style.alignItems = 'flex-start';
        
        // పుస్తకం పేరు డిజైన్
        let chaptersHtml = `<div style="font-size: 18px; color: #1a252f; margin-bottom: 10px;">${bookName}</div>`;
        chaptersHtml += `<div style="display: flex; flex-wrap: wrap; gap: 5px;">`;
        
        // అధ్యాయాల లింక్స్ క్రియేట్ చేయడం
        chapters.forEach((chObj, chapterIndex) => {
            const displayChapterNum = chapterIndex + 1;
            const isRead = isChapterRead(bookName, displayChapterNum) ? '✅' : '';
            // reader.html కి వెళ్లేటప్పుడు నంబర్స్ పాస్ చేస్తున్నాం
            chaptersHtml += `<a href="reader.html?bookId=${bookIndex}&chapterId=${chapterIndex}" class="chapter-link">${displayChapterNum} ${isRead}</a>`;
        });
        
        chaptersHtml += `</div>`;
        bookDiv.innerHTML = chaptersHtml;
        booksList.appendChild(bookDiv);
    });

    // ఓవరాల్ ప్రోగ్రెస్ బార్ అప్‌డేట్ చేయడం
    const percentage = totalChapters === 0 ? 0 : Math.round((readChapters / totalChapters) * 100);
    const progressBar = document.getElementById('overall-progress');
    progressBar.style.width = percentage + '%';
    progressBar.innerText = percentage + '%';
}

// 3. రీడర్ పేజీ లాజిక్ (వచనాలు చూపించడం)
function renderReaderPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookIndex = parseInt(urlParams.get('bookId'));
    const chapterIndex = parseInt(urlParams.get('chapterId'));

    const bookName = bookNames[bookIndex];
    const displayChapterNum = chapterIndex + 1;

    document.getElementById('book-title').innerText = `${bookName} - అధ్యాయం ${displayChapterNum}`;
    
    const contentDiv = document.getElementById('bible-content');
    
    // మీ JSON స్ట్రక్చర్ ప్రకారం వచనాలు తీసుకురావడం
    const verses = bibleData[bookIndex].Chapter[chapterIndex].Verse;
    
    let html = '';
    verses.forEach((vObj, vIndex) => {
        const verseNum = vIndex + 1; 
        html += `<div class="verse"><span class="verse-num">${verseNum}.</span> ${vObj.Verse}</div>`;
    });
    contentDiv.innerHTML = html;

    // "చదవడం పూర్తయింది" బటన్ స్టేటస్
    const btn = document.getElementById('mark-read-btn');
    if (isChapterRead(bookName, displayChapterNum)) {
        btn.innerText = "✓ చదివారు (Completed)";
        btn.classList.add('completed');
        btn.disabled = true;
    } else {
        btn.onclick = function() {
            markAsRead(bookName, displayChapterNum);
            btn.innerText = "✓ చదివారు (Completed)";
            btn.classList.add('completed');
            btn.disabled = true;
        };
    }
}

// యాప్ స్టార్ట్ చేయడం
loadBibleData();
