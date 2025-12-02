// Основной модуль приложения
const App = {
    // Инициализация приложения
    init: function() {
        this.setupMobileMenu();
        this.setupHeaderScroll();
        this.setupOverlayClose();
        this.setupFadeInAnimations();
        
        // Инициализация страницы библиотеки
        if (document.getElementById('worksContainer')) {
            this.setupLibraryPage();
        }
        
        // Инициализация страницы контактов
        if (document.getElementById('contactForm')) {
            this.setupContactForm();
        }
    },
    
    // Настройка мобильного меню
    setupMobileMenu: function() {
        const burgerMenu = document.getElementById('burgerMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const closeMenu = document.getElementById('closeMenu');
        const overlay = document.querySelector('.overlay');
        
        if (burgerMenu && mobileMenu) {
            burgerMenu.addEventListener('click', function() {
                mobileMenu.classList.add('open');
                overlay.classList.add('active');
                burgerMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            closeMenu.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                overlay.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Закрытие меню при клике на ссылки внутри него
            const mobileMenuLinks = document.querySelectorAll('.mobile-nav-list a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenu.classList.remove('open');
                    overlay.classList.remove('active');
                    burgerMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    },
    
    // Закрытие меню по клику на оверлей
    setupOverlayClose: function() {
        const overlay = document.querySelector('.overlay');
        const mobileMenu = document.getElementById('mobileMenu');
        const burgerMenu = document.getElementById('burgerMenu');
        
        if (overlay) {
            overlay.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                overlay.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    },
    
    // Настройка шапки при скролле
    setupHeaderScroll: function() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },
    
    // Настройка анимаций появления элементов
    setupFadeInAnimations: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами с классом fade-in
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            observer.observe(el);
        });
    },
    
    // Настройка страницы библиотеки
    setupLibraryPage: function() {
        // Генерация данных для работ
        this.generateWorksData();
        
        // Инициализация фильтров
        this.setupFilters();
        
        // Инициализация пагинации
        this.setupPagination();
    },
    
    // Генерация данных работ
    generateWorksData: function() {
        const worksContainer = document.getElementById('worksContainer');
        const worksData = [];
        
        // Типы работ
        const workTypes = [
            { type: 'diploma', name: 'Дипломная работа' },
            { type: 'course', name: 'Курсовая работа' }
        ];
        
        // Темы работ
        const workTopics = [
            'Анализ финансового состояния предприятия',
            'Оценка кредитоспособности предприятия',
            'Управление оборотным капиталом предприятия',
            'Анализ рентабельности деятельности предприятия',
            'Оптимизация структуры капитала предприятия',
            'Оценка инвестиционной привлекательности предприятия',
            'Анализ ликвидности и платежеспособности',
            'Формирование финансовой стратегии предприятия',
            'Бюджетирование как инструмент финансового планирования',
            'Анализ денежных потоков предприятия',
            'Управление дебиторской и кредиторской задолженностью',
            'Оценка финансовых рисков предприятия',
            'Анализ себестоимости продукции предприятия',
            'Финансовое прогнозирование на предприятии',
            'Оценка эффективности использования ресурсов предприятия'
        ];
        
        // Годы
        const years = [2023, 2022, 2021, 2020, 2019];
        
        // Генерация 312 работ
        for (let i = 1; i <= 312; i++) {
            const workType = workTypes[Math.floor(Math.random() * workTypes.length)];
            const topic = workTopics[Math.floor(Math.random() * workTopics.length)];
            const year = years[Math.floor(Math.random() * years.length)];
            const pages = workType.type === 'diploma' 
                ? Math.floor(Math.random() * 30) + 70 
                : Math.floor(Math.random() * 20) + 30;
            
            worksData.push({
                id: i,
                title: `${workType.name}: "${topic}"`,
                type: workType.type,
                typeName: workType.name,
                topic: topic,
                year: year,
                pages: pages,
                description: `Подробный анализ финансово-экономического состояния предприятия на примере конкретной организации. Работа содержит теоретическую часть, практический анализ и рекомендации по улучшению финансовых показателей.`
            });
        }
        
        // Сохраняем данные в глобальной переменной
        window.worksData = worksData;
        
        // Отображаем первые 12 работ
        this.displayWorks(worksData.slice(0, 12), worksContainer);
    },
    
    // Отображение работ в контейнере
    displayWorks: function(works, container) {
        container.innerHTML = '';
        
        works.forEach(work => {
            const workCard = this.createWorkCard(work);
            container.appendChild(workCard);
        });
    },
    
    // Создание карточки работы
    createWorkCard: function(work) {
        const card = document.createElement('div');
        card.className = 'work-card fade-in';
        
        card.innerHTML = `
            <div class="work-card-header">
                <span class="work-type">${work.typeName}</span>
                <h3>${work.title}</h3>
            </div>
            <div class="work-card-body">
                <p class="work-topic">${work.topic}</p>
                <p>${work.description}</p>
                <div class="work-details">
                    <span><i class="far fa-calendar"></i> ${work.year} год</span>
                    <span><i class="far fa-file"></i> ${work.pages} стр.</span>
                </div>
            </div>
            <div class="work-card-footer">
                <button class="btn btn-primary work-details-btn" data-id="${work.id}">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
            </div>
        `;
        
        return card;
    },
    
    // Настройка фильтров
    setupFilters: function() {
        const searchInput = document.getElementById('searchInput');
        const filterType = document.getElementById('filterType');
        const filterYear = document.getElementById('filterYear');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterWorks());
        }
        
        if (filterType) {
            filterType.addEventListener('change', () => this.filterWorks());
        }
        
        if (filterYear) {
            filterYear.addEventListener('change', () => this.filterWorks());
        }
    },
    
    // Фильтрация работ
    filterWorks: function() {
        const searchInput = document.getElementById('searchInput');
        const filterType = document.getElementById('filterType');
        const filterYear = document.getElementById('filterYear');
        const worksContainer = document.getElementById('worksContainer');
        
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = filterType.value;
        const selectedYear = filterYear.value;
        
        let filteredWorks = window.worksData;
        
        // Фильтрация по поисковому запросу
        if (searchTerm) {
            filteredWorks = filteredWorks.filter(work => 
                work.title.toLowerCase().includes(searchTerm) || 
                work.topic.toLowerCase().includes(searchTerm)
            );
        }
        
        // Фильтрация по типу работы
        if (selectedType !== 'all') {
            filteredWorks = filteredWorks.filter(work => work.type === selectedType);
        }
        
        // Фильтрация по году
        if (selectedYear !== 'all') {
            filteredWorks = filteredWorks.filter(work => work.year == selectedYear);
        }
        
        // Отображаем отфильтрованные работы
        this.displayWorks(filteredWorks.slice(0, 12), worksContainer);
        
        // Обновляем пагинацию
        this.updatePagination(filteredWorks.length);
    },
    
    // Настройка пагинации
    setupPagination: function() {
        this.updatePagination(window.worksData.length);
    },
    
    // Обновление пагинации
    updatePagination: function(totalWorks) {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(totalWorks / 12);
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }
        
        let paginationHTML = '';
        
        // Кнопка "Назад"
        paginationHTML += `<button class="pagination-btn prev-btn"><i class="fas fa-chevron-left"></i></button>`;
        
        // Первые страницы
        for (let i = 1; i <= Math.min(5, totalPages); i++) {
            paginationHTML += `<button class="pagination-btn ${i === 1 ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        // Многоточие если страниц много
        if (totalPages > 5) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
            paginationHTML += `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // Кнопка "Вперед"
        paginationHTML += `<button class="pagination-btn next-btn"><i class="fas fa-chevron-right"></i></button>`;
        
        pagination.innerHTML = paginationHTML;
        
        // Добавляем обработчики событий
        this.setupPaginationEvents();
    },
    
    // Настройка событий пагинации
    setupPaginationEvents: function() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('prev-btn')) {
                    // Переход на предыдущую страницу
                    const activeBtn = document.querySelector('.pagination-btn.active');
                    const currentPage = parseInt(activeBtn.dataset.page);
                    if (currentPage > 1) {
                        App.changePage(currentPage - 1);
                    }
                } else if (this.classList.contains('next-btn')) {
                    // Переход на следующую страницу
                    const activeBtn = document.querySelector('.pagination-btn.active');
                    const currentPage = parseInt(activeBtn.dataset.page);
                    const totalWorks = window.worksData.length;
                    const totalPages = Math.ceil(totalWorks / 12);
                    
                    if (currentPage < totalPages) {
                        App.changePage(currentPage + 1);
                    }
                } else if (this.dataset.page) {
                    // Переход на конкретную страницу
                    const page = parseInt(this.dataset.page);
                    App.changePage(page);
                }
            });
        });
    },
    
    // Изменение страницы
    changePage: function(page) {
        const worksContainer = document.getElementById('worksContainer');
        const startIndex = (page - 1) * 12;
        const endIndex = startIndex + 12;
        
        // Отображаем работы для страницы
        this.displayWorks(window.worksData.slice(startIndex, endIndex), worksContainer);
        
        // Обновляем активную кнопку пагинации
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        paginationBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.page && parseInt(btn.dataset.page) === page) {
                btn.classList.add('active');
            }
        });
        
        // Прокручиваем к началу списка работ
        window.scrollTo({
            top: worksContainer.offsetTop - 100,
            behavior: 'smooth'
        });
    },
    
    // Настройка формы обратной связи
    setupContactForm: function() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем данные формы
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
                
                // В реальном приложении здесь был бы код отправки данных на сервер
                // Для демонстрации просто показываем сообщение об успехе
                
                // Скрываем предыдущее сообщение
                formMessage.style.display = 'none';
                formMessage.className = 'form-message';
                
                // Показываем сообщение об успехе
                formMessage.textContent = `Спасибо, ${name}! Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время по адресу ${email}.`;
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Сбрасываем форму
                contactForm.reset();
                
                // Прокручиваем к сообщению
                formMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Скрываем сообщение через 10 секунд
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 10000);
            });
        }
    }
};

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});