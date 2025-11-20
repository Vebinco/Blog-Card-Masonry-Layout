document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    // Category Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            const isAlreadyActive = button.classList.contains('active');

            // Remove active state from all buttons first
            filterButtons.forEach(btn => btn.classList.remove('active'));

            if (isAlreadyActive) {
                // If clicked an active button, deactivate it and show all cards
                cards.forEach(card => {
                    card.style.transform = 'scale(1)';
                    card.style.opacity = '1';
                    card.classList.remove('hide');
                });
            } else {
                // If clicked a new button, activate it and filter
                button.classList.add('active');

                cards.forEach(card => {
                    const category = card.dataset.category;
                    const shouldShow = filter === category;

                    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                    card.style.transform = shouldShow ? 'scale(1)' : 'scale(0.9)';
                    card.style.opacity = shouldShow ? '1' : '0';

                    setTimeout(() => {
                        if (!shouldShow) {
                            card.classList.add('hide');
                        } else {
                            card.classList.remove('hide');
                        }
                    }, 300);
                });
            }
        });
    });

    // Fade-in on scroll animation
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});
