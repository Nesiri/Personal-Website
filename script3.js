document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:nesruhussein57@gmail.com?subject=Message from ${firstName} ${lastName}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;

    window.location.href = mailtoLink;
  });

  
   const header = document.getElementById('welcome-header');

   function fadeInOut() {
     header.classList.add('visible');
     setTimeout(() => {
       header.classList.remove('visible');
     }, 4000); 
   }
 
   document.addEventListener('DOMContentLoaded', () => {
     fadeInOut();
     setInterval(fadeInOut, 8000); 
   });


 