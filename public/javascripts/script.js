var score = 0;
var resolving = 0;


/*Chronometer*/
var chronometer;
function load() {
    var counter_s = 0;
    var counter_m = 40;
    s = document.getElementById('seconds');
    m = document.getElementById('minutes');
    chronometer =  window.setInterval(()=>{
        if(counter_s == 0){
            if(counter_m == 0){
                check(true);
                return;
            }
            counter_m--;
            if(counter_m <= 9)
                m.innerHTML = '0' + counter_m;
            else
                m.innerHTML = counter_m + '';
            counter_s = 59;
        }
        if(counter_s <= 9)
            s.innerHTML = '0' + counter_s;
        else
            s.innerHTML = counter_s + '';
        counter_s--;
    }, 1000);
}

function stop() {
    clearInterval(chronometer);
    check();
}


/* Check */
function check(time=false) {
    var corrects = Array.apply(null, Array(40)).map(Number.prototype.valueOf,0);
    var rptas = Array.apply(null, Array(40)).map(String.prototype.valueOf,'n');
    for(var i = 0; i<40; i++){
        if(document.querySelector('input[name="question' + i + '"]:checked')){
            resolving++;
            var q_name = document.querySelector('input[name="question' + i + '"]:checked').id;
            var q_alternative = q_name.substring(0, 1);
            var q_number = q_name.substring(1, 3);

            rptas[i] = q_alternative.toString();

            if(questionData[q_number].response == q_alternative){
                score++;
                corrects[i] = 1;
            }
        }
    }
    if(resolving != 40 && !time){
        if(confirm(
            'Existen preguntas las cuales no ha seleccionado, por favor revisar y resolver las preguntas.\n' +
            'Preguntas sin resolver: ' + (40 - resolving) + '\n' +
            'Preguntas resueltas: ' + resolving + '\n' +
            '¿Corregir de todas formas  ?',
        ) == false){
            resolving = 0;
            score = 0;
            return;
        }
    }

    var form = document.createElement("form");
    var element1 = document.createElement("input");
    var element2 = document.createElement("input");
    var element3 = document.createElement("input");
    var element4 = document.createElement("input");

    form.method = "POST";
    form.action = "/check";

    element1.value=score;
    element1.name="score";

    element2.value= JSON.stringify(JSON.parse("[" + corrects + "]"));
    element2.name="reviewed";

    element3.value= JSON.stringify(questionData);
    element3.name="questionData";

    element4.value = JSON.stringify(rptas.join("<#>"));
    element4.name= "responses";

    form.appendChild(element1);
    form.appendChild(element2);
    form.appendChild(element3);
    form.appendChild(element4);

    document.body.appendChild(form);

    form.submit();
}
document.querySelector('.btn-check').addEventListener("click", stop);
load();