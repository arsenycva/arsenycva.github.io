// script.js

const catalogData = Array(6).fill({
    title: "Far Far West",
    desc: "Far far west – приключенческая игра, которая отправит тебя на просторы мрачного мира вестерна, где ты исполнишь роль охотника за головами и отправишься н..."
});

document.addEventListener('DOMContentLoaded', () => {

    // === САЙДБАР: только картинки-ссылки ===
    const popList = document.getElementById('popularList');
    if (popList) {
        for (let i = 0; i < 4; i++) {
            const item = document.createElement('div');
            item.className = 'popular-item';
            // ПУТЬ ИЗМЕНЕН НА images/cover.jpg
            item.innerHTML = `<div class="popular-thumb"><img src="images/cover.jpg" alt="Far Far West"></div>`;
            item.onclick = function() { window.location.href = 'game.html'; };
            popList.appendChild(item);
        }
    }

    // === КАТАЛОГ ===
    function renderCatalog() {
        var grid = document.getElementById('catalogGrid');
        if (!grid) return;
        grid.innerHTML = '';
        catalogData.forEach(function(game) {
            var card = document.createElement('div');
            card.className = 'game-card';
            // ПУТЬ ИЗМЕНЕН НА images/cover.jpg
            card.innerHTML = '<div class="card-img"><img src="images/cover.jpg" alt="Far Far West"></div>' +
                '<div class="card-body"><div class="card-title">' + game.title + '</div>' +
                '<div class="card-desc">' + game.desc + '</div></div>';
            card.onclick = function() { window.location.href = 'game.html'; };
            grid.appendChild(card);
        });
    }
    renderCatalog();

    // === ПАГИНАЦИЯ ===
    var paginationContainer = document.getElementById('pagination');
    if (paginationContainer) {
        var pageButtons = paginationContainer.querySelectorAll('.page-num');
        pageButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                pageButtons.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
                renderCatalog();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    // === ПОИСК (заглушка) ===
    var searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') alert('Поиск пока работает как заглушка');
        });
    }

    // === МОДАЛЬНОЕ ОКНО ПОДДЕРЖКИ (Русская валидация) ===
    var openBtn = document.getElementById('openSupportBtn');
    var modal = document.getElementById('supportModal');
    var closeBtn = document.getElementById('closeModalBtn');
    var agreeCheck = document.getElementById('agreeCheck');
    var submitBtn = document.getElementById('submitBtn');
    var form = document.getElementById('supportForm');

    // Открыть
    if (openBtn && modal) {
        openBtn.addEventListener('click', function() { modal.classList.add('show'); });
    }

    // Закрыть по крестику
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() { modal.classList.remove('show'); clearErrors(); });
    }

    // Закрыть по клику на фон
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) { modal.classList.remove('show'); clearErrors(); }
        });
    }

    // Активация кнопки при галочке
    if (agreeCheck && submitBtn) {
        agreeCheck.addEventListener('change', function() {
            if (agreeCheck.checked) {
                submitBtn.classList.add('enabled');
                submitBtn.removeAttribute('disabled');
            } else {
                submitBtn.classList.remove('enabled');
                submitBtn.setAttribute('disabled', 'true');
            }
        });
    }

    // Функция очистки ошибок
    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.classList.remove('visible'));
    }

    // Функция показа ошибки
    function showError(id) {
        document.getElementById(id).classList.add('visible');
    }

    // Отправка формы с русской проверкой
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            clearErrors();
            
            let isValid = true;
            const name = document.getElementById('userName');
            const email = document.getElementById('userEmail');
            const question = document.getElementById('userQuestion');

            if (!name.value.trim()) { showError('nameError'); isValid = false; }
            if (!email.value.trim() || !email.value.includes('@')) { showError('emailError'); isValid = false; }
            if (!question.value.trim()) { showError('questionError'); isValid = false; }
            if (!agreeCheck.checked) { showError('agreeError'); isValid = false; }

            if (isValid) {
                alert('Ваш вопрос успешно отправлен! Мы свяжемся с вами.');
                form.reset();
                submitBtn.classList.remove('enabled');
                submitBtn.setAttribute('disabled', 'true');
                modal.classList.remove('show');
            }
        });
    }
});