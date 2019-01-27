var form = document.forms.registrationUserForm;
var formElements = form.elements;


var errors = [];

for(let i = 0; i < formElements.length; i++){
    if(formElements[i].tagName == "BUTTON"){
        continue
    }
    formElements[i].addEventListener("change", validatorOnline)
    
}

form.addEventListener("submit", validator);



var rules = {
    email: function(element){
        let regExp = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;
        return regExp.test(element.value);
    },

    required: function(element){
        if(element.value == "" || element.value == " "){
            return false
        }
        return true
    },

    notTa: function(element){
        let regExp = /та/g;
        if(regExp.test(element.value)){
            return false
        }
        return true
    }
};

function validatorOnline(e){
    errors.length = 0;
    
    let listRules = e.target.dataset.rule;
    listRules = listRules.split(' ');
    for(let j = 0; j < listRules.length; j++){
        if(listRules[j] in rules){
            let test = rules[listRules[j]];
            let test1 = test(e.target);
            if(!test1){
                errors.push({
                    name: e.target.name,
                    error: listRules[j]
                })
            }
            
        }
    }
    if(errors.length == 0){
      
        let elementMessage = e.target.nextElementSibling;
        
        elementMessage.innerHTML = "Поле коректне";
        elementMessage.style.color = "#369929";
        e.target.classList.remove("error");
        e.target.classList.add("notError");
    }
    messageError(errors);
};

function showMessage(typeError){
    if(typeError == "required"){
        return "Поле повинно бути заповнене"
    }else if(typeError == "notTa"){
        return "Ви використали заборонене слово"
    }else if(typeError == "email"){
        return "Не правильний формат електронної пошти"
    }
}

function messageError(arreyError){
    
    for(let i = 0; i < arreyError.length; i++){
        let element = form[arreyError[i].name];
        let error = arreyError[i].error;
        element.classList.remove("notError");
        element.classList.add("error");
        element.nextElementSibling.style.color = "red";
        element.nextElementSibling.innerHTML = showMessage(error);
        
    }
}

function validator(e){
    
    var elementsForm = form.elements;
    var errors = [];
    var state = form.gender.value;
    
    
    for(let i = 0; i < elementsForm.length; i++){
        if(elementsForm[i].tagName != "BUTTON"){
            let listRules = elementsForm[i].dataset.rule;
            listRules = listRules.split(' ');
            for(let j = 0; j < listRules.length; j++){
                if(listRules[j] in rules){
                    if(!rules[listRules[j]](elementsForm[i])){
                        errors.push({
                        name: elementsForm[i].name,
                        error: listRules[j]
                        })
                    }
                }
            }
        }
        
    }
    if(errors.length > 0){
        messageError(errors);
        
        e.preventDefault();
        
    }
}



