// Swipe Functionality
class SwipeHandler {
    constructor() {
        this.swipeContainer = document.querySelector('.swipe-container');
        this.slides = document.querySelectorAll('.profile-card');
        this.indicators = document.querySelectorAll('.indicator');
        this.currentSlide = 0;
        this.startX = 0;
        this.startY = 0;
        this.isDragging = false;
        this.dragThreshold = 50;

        this.init();
    }

    init() {
        // Mouse Events
        this.swipeContainer.addEventListener('mousedown', (e) => this.handleStart(e));
        this.swipeContainer.addEventListener('mousemove', (e) => this.handleMove(e));
        this.swipeContainer.addEventListener('mouseup', (e) => this.handleEnd(e));
        this.swipeContainer.addEventListener('mouseleave', (e) => this.handleEnd(e));

        // Touch Events
        this.swipeContainer.addEventListener('touchstart', (e) => this.handleStart(e));
        this.swipeContainer.addEventListener('touchmove', (e) => this.handleMove(e));
        this.swipeContainer.addEventListener('touchend', (e) => this.handleEnd(e));

        // Indicator Clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Update time
        this.updateTime();
        setInterval(() => this.updateTime(), 60000);
    }

    handleStart(e) {
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        this.startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        this.swipeContainer.style.transition = 'none';
    }

    handleMove(e) {
        if (!this.isDragging) return;

        const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        const diffX = currentX - this.startX;
        const diffY = currentY - this.startY;

        // Calculate percentage offset for visual feedback
        const offset = diffX;
        this.swipeContainer.style.transform = `translateX(calc(-${this.currentSlide * 100}% + ${offset}px))`;
    }

    handleEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
        const endY = e.type.includes('mouse') ? e.clientY : e.changedTouches[0].clientY;
        
        const diffX = endX - this.startX;
        const diffY = endY - this.startY;

        // Determine swipe direction
        const absDiffX = Math.abs(diffX);
        const absDiffY = Math.abs(diffY);

        // Horizontal swipe (left/right)
        if (absDiffX > absDiffY && absDiffX > this.dragThreshold) {
            if (diffX > 0) {
                // Swiped right
                this.previousSlide();
            } else {
                // Swiped left
                this.nextSlide();
            }
        }
        // Vertical swipe (up/down) - also triggers slide change
        else if (absDiffY > absDiffX && absDiffY > this.dragThreshold) {
            if (diffY > 0) {
                // Swiped down - previous slide
                this.previousSlide();
            } else {
                // Swiped up - next slide
                this.nextSlide();
            }
        }

        // Reset transform with transition
        this.swipeContainer.style.transition = 'transform 0.3s ease';
        this.updateSlidePosition();
    }

    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
            this.updateSlidePosition();
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateSlidePosition();
        }
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.currentSlide = index;
            this.updateSlidePosition();
        }
    }

    updateSlidePosition() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.style.transform = `translateX(${(index - this.currentSlide) * 100}%)`;
            if (index === this.currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === this.currentSlide) {
                indicator.classList.add('active');
            }
        });

        // Log current slide
        console.log(`Slide ${this.currentSlide + 1} of ${this.slides.length}`);
    }

    updateTime() {
        const timeElement = document.querySelector('.time');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// Initialize swipe handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SwipeHandler();
    console.log('✨ Aiden Kennedy Student ID - Interactive Verification System');
    console.log('💡 Swipe left/right/up/down to navigate between slides');
});
