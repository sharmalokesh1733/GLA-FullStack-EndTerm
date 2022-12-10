function findBook(filename, displayName) {
    let C_book = "";
    let url = "books/" + filename;
    document.getElementById("fileName").innerHTML = displayName;
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keyword").value = "";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            C_book = xhr.responseText;
            stats(C_book);
            C_book = C_book.replace(/(?:\r\n|\r|\n)/g, '<br>');
            document.getElementById("fileContent").innerHTML = C_book;
            var eleMENT = document.getElementById("fileContent");
            eleMENT.scrollTop = 0;
        }
    };
}

function stats(file_CO) {
    var leng = document.getElementById("docLength");
    var w_count = document.getElementById("wordCount");
    var c_count = document.getElementById("charCount");
    let con_TENT = file_CO.toLowerCase();
    let W_ARR = con_TENT.match(/\b\S+\b/g);
    let w_DICT = {};
    var W_uncommon = [];
    W_uncommon = filTER(W_ARR);
    for (let word in W_uncommon) {
        let wordValue = W_uncommon[word];
        if (w_DICT[wordValue] > 0) {
            w_DICT[wordValue] += 1;
        } else {
            w_DICT[wordValue] = 1;
        }
    }
    let word_LIST = SORTING(w_DICT);
    var T5_words = word_LIST.slice(0, 6);

    var L5_words = word_LIST.slice(-6, word_LIST.length);





    ULTemplate(T5_words, document.getElementById("mostUsed"));
    ULTemplate(L5_words, document.getElementById("leastUsed"));
    leng.innerText = "Document Length: " + con_TENT.length;
    w_count.innerText = "Word Count: " + W_ARR.length;
}

function ULTemplate(itm, element) {
    let row_templ = document.getElementById('template-ul-items');
    let temp_HTML = row_templ.innerHTML;
    let resultsHTML = "";
    for (i = 0; i < itm.length - 1; i++) {
        resultsHTML += temp_HTML.replace('{{val}}', itm[i][0] + " : " + itm[i][1] + " time(s)");
    }
    element.innerHTML = resultsHTML;
}

function SORTING(item) {
    let rtARRAY = Object.entries(item);
    rtARRAY.sort(function(first, second) {
        return second[1] - first[1];
    });
    return rtARRAY;
}

function filTER(wordArray) {
    var c_word = get_STOP_Words();
    var c_obj = {};
    var uc_arr = [];
    for (i = 0; i < c_word.length; i++) {
        c_obj[c_word[i].trim()] = true;
    }
    for (i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();
        if (!c_obj[word]) {
            uc_arr.push(word);
        }
    }
    return uc_arr;
}

function get_STOP_Words() {
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}

function maRKKK() {

    var key_WORD = document.getElementById("keyword").value;
    var DISP = document.getElementById("fileContent");
    var n_cont = "";

    let spans = document.querySelectorAll('mark');
    for (var i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML;
    }
    var re = new RegExp(key_WORD, "gi");
    var rpTEXT = "<mark id='markme'>$&</mark>";
    var bookContent = DISP.innerHTML;
    n_cont = bookContent.replace(re, rpTEXT);
    DISP.innerHTML = n_cont;
    var count = document.querySelectorAll('mark').length;
    document.getElementById("searchstat").innerHTML = "found " + count + " matches";
    if (count > 0) {
        var element = document.getElementById("markme");
        element.scrollIntoView();
    };
}