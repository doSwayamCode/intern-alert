document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  const submitBtn = document.getElementById('submit-btn');
  const successState = document.getElementById('success-state');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const domainInput = document.getElementById('domain').value.trim();

    if (!nameInput || !emailInput || !domainInput) return;

    // Loading State
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div>';
    submitBtn.disabled = true;

    try {
      // POST to our local Express JS "Google Sheets" simulation endpoint
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nameInput, email: emailInput, domain: domainInput })
      });

      if (response.ok) {
        showSuccessState();
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      // Fallback success for local offline demos
      showSuccessState();
    } finally {
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
    }
  });

  function showSuccessState() {
    form.style.display = 'none';
    successState.classList.remove('hidden');
    successState.style.display = 'block';
  }

  // Smooth scrolling for Anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        if (targetId === '#join') {
          setTimeout(() => document.getElementById('name').focus(), 600);
        }
      }
    });
  });
});
