    const searchForm = document.querySelector("#search-form");

    const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");

    const info = document.querySelector(".info");

    const infoStop = document.querySelector(".infoStop");

    const infoDelete = document.querySelector(".infoDelete");

    const infoSearch = document.querySelector(".infoSearch");

// The speech recognition interface lives on the browserâ€™s window object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

    if(SpeechRecognition) {
    
        //console.log("Your Browser supports speech Recognition");
  
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;

        recognition.lang = "es-MX";

        searchForm.insertAdjacentHTML("beforeend", '<button type="button"> <i class="fas fa-microphone"></i> </button>');

        searchFormInput.style.paddingRight = "50px";

        const micBtn = searchForm.querySelector("button");

        const micIcon = micBtn.firstElementChild;

        micBtn.addEventListener("click", micBtnClick);

        function micBtnClick() {

            if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition

                recognition.start(); // First time you have to allow access to mic!
            }

            else {

                recognition.stop();

            }
        }     

        recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}

        function startSpeechRecognition() {

            micIcon.classList.remove("fa-microphone");

            micIcon.classList.add("fa-microphone-slash");

            searchFormInput.focus();

            //console.log("Voice activated, SPEAK");

        }

        recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}

        function endSpeechRecognition() {

            micIcon.classList.remove("fa-microphone-slash");

            micIcon.classList.add("fa-microphone");

            searchFormInput.focus();

            //console.log("Speech recognition service disconnected");

        }

        recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking

        function resultOfSpeechRecognition(event) {

            const current = event.resultIndex;

            const transcript = event.results[current][0].transcript;
    
            if(transcript.toLowerCase().trim()==="detener") {

                recognition.stop();

            }

            else if (!searchFormInput.value) {

                searchFormInput.value = transcript;

            }

            else {

                if(transcript.toLowerCase().trim()==="buscar") {

                    searchForm.submit();
                }

                else if (transcript.toLowerCase().trim()==="borrar") {

                    searchFormInput.value = "";
                }

                else {

                    searchFormInput.value = transcript;

                }
            }

            // searchFormInput.value = transcript;
            // searchFormInput.focus();
            // setTimeout(() => {
            //   searchForm.submit();
            // }, 500);
        }
  
        info.textContent = " Da clic en el icono del micrófono y posteriormente se activará. Una vez activado dicta lo que deseas consultar, cuando se muestre en la barra de búsqueda tu consulta, dicta el comando “buscar”. "
        
        infoStop.textContent = "Comando (Detener): Detiene la grabación de la búsqueda. ";
        
        infoDelete.textContent = "Comando (Borrar): Borra la consulta de la barra de búsqueda.";
        
        infoSearch.textContent = "Comando (Buscar): Realiza la búsqueda de tu consulta. ";

    }

    else {

        // console.log(" Your Browser does not support speech Recognition ");

        info.textContent = " Your Browser does not support Speech Recognition ";
        
    }