document.addEventListener('DOMContentLoaded', function () {
    const restartBtn = document.getElementById('restartBtn');
    const counterSpan = document.getElementById('count');
    const items = ['item1', 'item2', 'item3', 'gameOverItem'];
    const flashlightRadius = 150;
    let collectedItems = parseInt(localStorage.getItem('collectedItems')) || 0;
  
    // Restart button funtion
    restartBtn.addEventListener('click', function () {
      clearItems();
      generateRandomItems();
      collectedItems = 0;
      updateCounter();
    });

    // This clears the previous items
    function clearItems() {
      items.forEach(item => {
        const itemElement = document.getElementById(item);
        if (itemElement) {
          itemElement.remove();
          localStorage.removeItem(item);
        }
      });
    }
  
    // randomized items
    function generateRandomItems() {
      items.forEach(item => {
        const newItem = document.createElement('img');
        newItem.classList.add('item');
        newItem.setAttribute('id', item);
        newItem.src = item === 'gameOverItem' ? 'IMG/Pringle.png' : 'IMG/CHIP.PNG';
        newItem.style.position = 'absolute';
  
        const x = Math.random() * (window.innerWidth - newItem.width);
        const y = Math.random() * (window.innerHeight - newItem.height);
  
        newItem.style.left = `${x}px`;
        newItem.style.top = `${y}px`;
  
        newItem.addEventListener('click', function () {
          if (item === 'gameOverItem') {
            gameOver();
          } else {
            collectItem(item);
          }
        });
  
        document.body.appendChild(newItem);
  
        if (localStorage.getItem(item)) {
          newItem.style.visibility = 'hidden';
        }
      });
    }

    function gameOver() {
      alert('Game Over!'); // You can replace this with your own game over logic
      // Reset the game if needed
      clearItems();
      generateRandomItems();
      collectedItems = 0;
      updateCounter();
    }
    
  
    // This is the collection system
    function collectItem(item) {
      const itemElement = document.getElementById(item);
      if (itemElement) {
        itemElement.style.visibility = 'hidden';
        localStorage.setItem(item, 'collected');
        collectedItems++;
        updateCounter();
      }
    }
  
    // Collection counter
    function updateCounter() {
      counterSpan.textContent = collectedItems;
      localStorage.setItem('collectedItems', collectedItems.toString());
    }
  
    // Flashlight effect
    const shadow = document.querySelector('.shadow');
    document.addEventListener('mousemove', function (e) {
      const x = e.clientX - (document.documentElement.clientWidth * 1.5);
      const y = e.clientY - (document.documentElement.clientHeight * 1.5);
      shadow.style.transform = `translate(${x}px, ${y}px)`;
  
      items.forEach(item => {
        const itemElement = document.getElementById(item);
        if (itemElement) {
          const rect = itemElement.getBoundingClientRect();
          const isMouseOver = isMouseOverElement(e, rect, flashlightRadius);
          itemElement.style.visibility = isMouseOver ? 'visible' : 'hidden';
  
          if (isMouseOver && localStorage.getItem(item)) {
            itemElement.style.visibility = 'hidden';
          }
        }
      });
    });
  
    // If the cursor is hovering over an object it shows
    function isMouseOverElement(event, rect, radius) {
      const { clientX, clientY } = event;
      const centerX = (rect.left + rect.right) / 2;
      const centerY = (rect.top + rect.bottom) / 2;
      const distance = Math.sqrt((clientX - centerX) ** 2 + (clientY - centerY) ** 2);
      return distance <= radius;
    }
  
    // Setup
    generateRandomItems();
    updateCounter();
  });
  