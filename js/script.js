let SendModal = new tingle.modal({
    footer: false,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Закрыть",
    cssClass: ['modal-1', 'modal-2'],
    onOpen: function () {
        console.log('modal open');
    },
    onClose: function () {
        console.log('modal closed');
    },
    beforeClose: function () {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
        return false; // nothing happens
    }
});

function ValidatePhone(Phone) {
    let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return regex.test(Phone);
}

function FormDataToJSON(FormElement) {
    let FirstName = FormElement[0].value
    let SecondName = FormElement[1].value
    let Phone = FormElement[2].value

    return {
        FirstName,
        SecondName,
        Phone
    }
}

SendModal.setContent(`
       <div class="modal">
            <div class="modal__details">
                <h1 class="modal__title">Заполнение заявки</h1>
            </div>
            <form class="modal__form"  id="SendForm" action="#">
                <div class="form__item">
                    <h2 class="form__title">Давай познакомимся</h2>
                    <div class="form__name">
                        <input type="text" class="form__input flex" placeholder="👱  Имя" required>
                        <input type="text" class="form__input flex" placeholder="Фамилия" required>
                    </div>
                    
                </div>
                <div class="form__item">
                    <h2 class="form__title">Телефон</h2>
                    <div class="form__name">
                        <input type="tel" class="form__input"  placeholder="📱  Телефон"  maxlength="20" required>
                        
                    </div>
                    <div class="form__errors" id="PhoneInputError">
                            
                        </div>
                    
                </div>
                <div class="form__btn-wrap">
                    <input type="submit" value="Отправить &rarr;" class="form__btn">
                    
                </div>
            </form>
            
      </div>
            `);

let SendForm = document.getElementById('SendForm');
let PhoneError = document.getElementById('PhoneInputError')

SendForm.onsubmit = async (e) => {
    e.preventDefault();
    let FormJSON = FormDataToJSON(SendForm)
    if (ValidatePhone(FormJSON.Phone)) {
        PhoneError.innerText = ``
        console.log('SENDED', FormJSON)
        fetch(`https://api.telegram.org/bot1984186607:AAGbMDG9g8fTQ82qveill-DcDtXai2dtlfc/sendMessage?chat_id=-1001588155373&text=   🆕 Новая заявка 🆕
        %0A  Имя - ${FormJSON.FirstName}
        %0A  Фамилия - ${FormJSON.SecondName}
        %0A  Телефон - ${FormJSON.Phone}
        `)

    } else {
        PhoneError.innerText = `Неверный формат телефона`
    }
    SendModal.close()
}





